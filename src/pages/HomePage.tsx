import GithubLink from "@/components/sections/GithubLink";
import BlogLink from "@/components/sections/BlogLink";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import AboutMe from "@/components/sections/AboutMe";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Resume from "@/components/sections/Resume";

export default function HomePage() {
  return (
    <main>
      <GithubLink />
      <BlogLink />
      <Header />
      <AboutMe />
      <Resume />
      <Experience />
      <Skills />
      <Footer />
    </main>
  );
}
