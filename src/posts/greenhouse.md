---
title: "Fuzzy Logic in the Greenhouse: Teaching IoT Rules to Think in Shades of Gray"
date: "2026-10-14"
---

# Fuzzy Logic in the Greenhouse 🌱

A greenhouse doesn't care about your `if` statements.

Most IoT automation looks like this:

```text
if temperature > 30 then open_vent
```

It works, until it doesn't. At 29.9 °C nothing happens. At 30.1 °C the vent snaps fully open. A sensor that wobbles around 30 °C makes your actuator flap like a nervous bird. And "hot" is not really a number anyway. Any grower will tell you that 28 °C is *a bit warm*, 32 °C is *hot*, and 36 °C is *get out there right now*.

That is exactly the kind of thinking **fuzzy logic** was invented for. In **AgroNode**, my ESP32-based greenhouse platform, I built a small fuzzy engine in Go to drive triggers. This post explains the idea and shows how little code it takes.

## The idea in one minute

Classic logic says a statement is either true or false. Fuzzy logic says it can be **partly true**, with a degree between `0` and `1`.

Instead of asking "is it hot?", we ask "**how hot is it?**":

| Temperature | Cold | Comfortable | Hot |
|-------------|------|-------------|-----|
| 14 °C | 0.6 | 0.0 | 0.0 |
| 22 °C | 0.0 | 1.0 | 0.0 |
| 29 °C | 0.0 | 0.3 | 0.4 |
| 35 °C | 0.0 | 0.0 | 1.0 |

At 29 °C the air is a little comfortable *and* a little hot at the same time. That is not a bug, that is how humans describe weather.

The three building blocks are:

1. **Membership functions** turn a raw reading into a degree (`0..1`) for a label like `hot`.
2. **Rules** combine those degrees: *"IF temperature is hot AND humidity is high THEN ventilate."*
3. **Actions** are scaled by how strongly the rule fires.

## Membership functions

A membership function is just a shape. The engine supports triangles, trapezoids, shoulders, gaussians, bells and sigmoids. The two workhorses are:

- **Triangle** `[a, b, c]` rises from `a` to a peak at `b`, then falls to `c`.
- **Trapezoid** `[a, b, c, d]` has a flat top between `b` and `c`.

For temperature, a trapezoid for `comfortable` and a right shoulder for `hot` is plenty. In AgroNode a trigger is plain JSON:

```json
{
  "name": "Greenhouse ventilation",
  "membershipFunctions": [
    { "name": "comfortable", "sensor": "dht11-temp", "type": "trapezoid", "parameters": [16, 20, 25, 29] },
    { "name": "hot",         "sensor": "dht11-temp", "type": "triangle",  "parameters": [26, 35, 45] },
    { "name": "humid",       "sensor": "dht11-humidity", "type": "triangle", "parameters": [60, 85, 100] }
  ],
  "rules": [
    {
      "name": "Vent when hot and humid",
      "operator": "AND",
      "conditions": [
        { "sensor": "dht11-temp", "membership": "hot" },
        { "sensor": "dht11-humidity", "membership": "humid" }
      ],
      "action": { "type": "set_vent", "value": 100 }
    }
  ]
}
```

No code deploy needed to change how the greenhouse behaves. You edit the shapes.

## Combining rules: min and max

Fuzzy operators are refreshingly simple:

- **AND** is the **minimum** of the degrees.
- **OR** is the **maximum** of the degrees.

If the air is `0.7` hot and `0.4` humid, the rule "hot AND humid" fires with strength `min(0.7, 0.4) = 0.4`.

The action value is then scaled by that strength. A vent action of `100` becomes `40`: the vent opens 40%. Not an on/off switch, but a dimmer. As the temperature climbs, the vent opens gradually, and the jitter around a single threshold disappears.

## The whole engine fits on a page

This is the heart of the evaluation in Go (simplified from AgroNode's `internal/fuzzy` package):

```go
func EvaluateTrigger(trigger FuzzyTrigger, inputs map[string]float64) (EvaluationResult, error) {
    // 1. Fuzzify: raw sensor value -> degree for every membership function
    // 2. For each rule, combine condition degrees:
    //      AND -> min, OR -> max
    // 3. Scale the action value by the rule strength
    value := rule.Action.Value * strength
}
```

A few details that mattered in practice:

- **Missing sensor means degree 0.** If a sensor goes silent, its memberships drop to zero instead of crashing the rule. The rule simply doesn't fire.
- **Degrees are clamped to `[0, 1]`** and `NaN` is treated as `0`, so a bad reading can't produce a nonsense action.
- **Validation up front.** Triggers are validated when saved, so a malformed membership function never reaches the evaluator at 3 AM.
- **Explainable results.** The evaluator returns the memberships and every rule's strength, not just the final value. When a vent opens, I can see *why*.

## From sensor to action

In AgroNode the fuzzy engine sits at the end of the telemetry pipeline:

```text
ESP32 -> MQTT (VerneMQ) -> Go backend -> TimescaleDB
                                 |
                                 +-> WebSocket -> live charts
                                 +-> fuzzy triggers -> actions (webhooks, actuators)
```

Every reading is stored in a per-sensor TimescaleDB hypertable, broadcast to the dashboard in real time, and evaluated against the device's triggers. The fuzzy result then drives an action, for example a webhook or a relay on the greenhouse.

## Why not just use thresholds?

You can, and for many things you should. But fuzzy logic pays off when:

- **Behavior should be smooth**, such as ventilation, shading or irrigation intensity.
- **Several signals interact**, like temperature and humidity and soil moisture together.
- **Non-programmers tune the rules.** "Hot" and "humid" are words a farmer already uses.
- **Sensors are noisy.** Gradual responses absorb jitter that would make hard thresholds flap.

It is also cheap. There is no training data, no model, and no GPU. A few comparisons and a `min`, running in microseconds.

## What I'd add next

- Defuzzification to combine several rules driving the *same* output into one value.
- A visual editor to drag membership shapes on top of live sensor charts.
- Hysteresis and rate limits on actuator commands.

## Closing thoughts

Fuzzy logic is a 1960s idea that still fits embedded and IoT problems nicely: small, explainable, and close to how people describe the physical world. If your automation is full of brittle `if (x > threshold)` checks, try letting your rules think in shades of gray.

Always curious. Always learning. Always shipping. 🚢

*Building AgroNode in the open, one greenhouse at a time. Questions or ideas? Find me on GitHub.*
