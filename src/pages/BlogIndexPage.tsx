import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAllPosts, type BlogPost } from "@/blog/loadPosts";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    void (async () => {
      const loadedPosts = await loadAllPosts();
      setPosts(loadedPosts);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
              <p className="mt-2 text-sm text-gray-600">
                Thoughts, stories and ideas
              </p>
            </div>
            <Link
              to="/"
              className="group flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No posts yet
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Check back soon for new content!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="group relative"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100"
                >
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Date Badge */}
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {post.date}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                      {post.title}
                    </h2>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors group-hover:text-blue-600">
                      <span>Read article</span>
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
