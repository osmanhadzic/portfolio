import "./i18n/config";
import GithubLink from "./components/sections/GithubLink";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import AboutMe from "./components/sections/AboutMe";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";

function App() {
  return (
    <main>
      <GithubLink />
      <Header />
      <AboutMe />
      <Experience />
      <Skills />
      <Footer />
    </main>
  );
}

export default App;
