import { addIcon } from "@iconify/react/dist/offline";

// Header + BlogLink icons (above-the-fold)
import newspaper from "@iconify/icons-la/newspaper";
import laptopCode from "@iconify/icons-la/laptop-code";

// Theme switch icons
import owl from "@iconify/icons-twemoji/owl";
import sunWithFace from "@iconify/icons-noto-v1/sun-with-face";

// Language flags
import flagForFlagUnitedKingdom from "@iconify/icons-twemoji/flag-for-flag-united-kingdom";
import flagForFlagBosniaAndHerzegovina from "@iconify/icons-twemoji/flag-for-flag-bosnia-and-herzegovina";

// AboutMe tech stack icons (AboutMe renders early)
import csharpDevicon from "@iconify/icons-devicon/csharp";
import reactDevicon from "@iconify/icons-devicon/react";
import postgresqlDevicon from "@iconify/icons-devicon/postgresql";

addIcon("la:newspaper", newspaper);
addIcon("la:laptop-code", laptopCode);

addIcon("twemoji:owl", owl);
addIcon("noto-v1:sun-with-face", sunWithFace);

addIcon("twemoji:flag-for-flag-united-kingdom", flagForFlagUnitedKingdom);
addIcon(
  "twemoji:flag-for-flag-bosnia-and-herzegovina",
  flagForFlagBosniaAndHerzegovina,
);

addIcon("devicon:csharp", csharpDevicon);
addIcon("devicon:react", reactDevicon);
addIcon("devicon:postgresql", postgresqlDevicon);
