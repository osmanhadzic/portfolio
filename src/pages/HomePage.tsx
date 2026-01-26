import { lazy, Suspense } from "react";
import LazyOnVisible from "@/components/LazyOnVisible";
import GithubLink from "@/components/sections/GithubLink";
import BlogLink from "@/components/sections/BlogLink";
import Header from "@/components/sections/Header";
import AboutMe from "@/components/sections/AboutMe";

const Resume = lazy(() => import("@/components/sections/Resume"));
const Experience = lazy(() => import("@/components/sections/Experience"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const Footer = lazy(() => import("@/components/sections/Footer"));

export default function HomePage() {
  return (
    <main>
      <GithubLink />
      <BlogLink />
      <Header />
      <AboutMe />
      <LazyOnVisible placeholder={<div style={{ minHeight: 40 }} />}>
        <Suspense fallback={null}>
          <Resume />
        </Suspense>
      </LazyOnVisible>
      <LazyOnVisible placeholder={<div style={{ minHeight: 40 }} />}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </LazyOnVisible>
      <LazyOnVisible placeholder={<div style={{ minHeight: 40 }} />}>
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </LazyOnVisible>
      <LazyOnVisible placeholder={<div style={{ minHeight: 40 }} />}>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </LazyOnVisible>
    </main>
  );
}
