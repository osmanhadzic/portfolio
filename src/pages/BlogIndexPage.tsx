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
    <div className="min-h-screen bg-gray-800 dark:bg-gray-900 py-10">
      <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-100 dark:text-gray-200">
            Blog
          </h1>

          <Link
            to="/"
            className="rounded border border-gray-600 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-dark dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Home
          </Link>
        </div>

        <div className="rounded-sm border border-gray-600 bg-gray-200 p-4 shadow-card dark:border-gray-700 dark:bg-gray-800">
          {posts.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-700 dark:text-gray-300">
              No posts yet.
            </p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <article key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block rounded-sm border border-gray-600 bg-white/60 p-5 hover:bg-white dark:border-gray-700 dark:bg-gray-900/40 dark:hover:bg-gray-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-lg font-semibold text-gray-dark dark:text-gray-100">
                        {post.title}
                      </h2>
                      <span className="shrink-0 text-xs font-mono text-gray-600 dark:text-gray-300">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
