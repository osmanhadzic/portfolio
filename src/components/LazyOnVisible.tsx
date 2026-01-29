import { type ReactNode, useEffect, useRef, useState } from "react";

type LazyOnVisibleProps = {
  children: ReactNode;
  /** Render immediately when IntersectionObserver is unavailable. */
  fallbackToRender?: boolean;
  /** Root margin to start loading slightly before entering viewport. */
  rootMargin?: string;
  /** Placeholder rendered until visible. */
  placeholder?: ReactNode;
};

export default function LazyOnVisible({
  children,
  fallbackToRender = true,
  rootMargin = "200px 0px",
  placeholder = null,
}: LazyOnVisibleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      if (fallbackToRender) setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fallbackToRender, rootMargin]);

  return <div ref={containerRef}>{isVisible ? children : placeholder}</div>;
}
