import { addIcon } from "@iconify/react";

// la
import newspaper from "@iconify/icons-la/newspaper";
import laptopCode from "@iconify/icons-la/laptop-code";

// mdi
import github from "@iconify/icons-mdi/github";
import linkedin from "@iconify/icons-mdi/linkedin";
import angular from "@iconify/icons-mdi/angular";
import vuejs from "@iconify/icons-mdi/vuejs";
import download from "@iconify/icons-mdi/download";

// devicon
import csharpDevicon from "@iconify/icons-devicon/csharp";
import reactDevicon from "@iconify/icons-devicon/react";
import postgresqlDevicon from "@iconify/icons-devicon/postgresql";

// devicon-plain
import csharpPlain from "@iconify/icons-devicon-plain/csharp";

// fontisto
import mysql from "@iconify/icons-fontisto/mysql";

// ri
import html5Fill from "@iconify/icons-ri/html5-fill";
import bootstrapFill from "@iconify/icons-ri/bootstrap-fill";

// teenyicons
import typescriptOutline from "@iconify/icons-teenyicons/typescript-outline";
import css3Solid from "@iconify/icons-teenyicons/css3-solid";
import typescriptSolid from "@iconify/icons-teenyicons/typescript-solid";
import javascriptSolid from "@iconify/icons-teenyicons/javascript-solid";

// twemoji
import owl from "@iconify/icons-twemoji/owl";
import flagForFlagUnitedKingdom from "@iconify/icons-twemoji/flag-for-flag-united-kingdom";
import flagForFlagBosniaAndHerzegovina from "@iconify/icons-twemoji/flag-for-flag-bosnia-and-herzegovina";

// noto-v1
import sunWithFace from "@iconify/icons-noto-v1/sun-with-face";

// eos-icons
import hourglass from "@iconify/icons-eos-icons/hourglass";

// Register only icons we actually use so we do not hit api.iconify.design.
addIcon("la:newspaper", newspaper);
addIcon("la:laptop-code", laptopCode);

addIcon("mdi:github", github);
addIcon("mdi:linkedin", linkedin);
addIcon("mdi:angular", angular);
addIcon("mdi:vuejs", vuejs);
addIcon("mdi:download", download);

addIcon("devicon:csharp", csharpDevicon);
addIcon("devicon:react", reactDevicon);
addIcon("devicon:postgresql", postgresqlDevicon);

addIcon("devicon-plain:csharp", csharpPlain);

addIcon("fontisto:mysql", mysql);

addIcon("ri:html5-fill", html5Fill);
addIcon("ri:bootstrap-fill", bootstrapFill);

addIcon("teenyicons:typescript-outline", typescriptOutline);
addIcon("teenyicons:css3-solid", css3Solid);
addIcon("teenyicons:typescript-solid", typescriptSolid);
addIcon("teenyicons:javascript-solid", javascriptSolid);

addIcon("twemoji:owl", owl);
addIcon("twemoji:flag-for-flag-united-kingdom", flagForFlagUnitedKingdom);
addIcon(
  "twemoji:flag-for-flag-bosnia-and-herzegovina",
  flagForFlagBosniaAndHerzegovina,
);

addIcon("noto-v1:sun-with-face", sunWithFace);

addIcon("eos-icons:hourglass", hourglass);
