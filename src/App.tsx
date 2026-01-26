import "./i18n/config";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";

const BlogIndexPage = lazy(() => import("@/pages/BlogIndexPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/blog"
        element={
          <Suspense fallback={null}>
            <BlogIndexPage />
          </Suspense>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <Suspense fallback={null}>
            <BlogPostPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
