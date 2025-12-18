import "./i18n/config";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import BlogIndexPage from "@/pages/BlogIndexPage";
import BlogPostPage from "@/pages/BlogPostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
