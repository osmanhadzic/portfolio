import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAllPosts, type BlogPost } from "@/blog/loadPosts";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    void (async () => {
      const loadedPosts = await loadAllPosts();
      setPosts(loadedPosts);
    })();
  }, []);

  return (
    <section className="bg-gray-800 dark:bg-gray-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h2 className="text-gray-100 dark:text-gray-200 mb-10 text-center text-xl font-medium uppercase tracking-widest">
          Blog
        </h2>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug}>
              <div className="border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-sm border shadow-card">
                <Link
                  to={`/blog/${post.slug}`}
                  className="dark:hover:bg-gray-750 block p-6 transition-colors hover:bg-gray-light"
                >
                  <h3 className="dark:text-gray-100 mb-2 text-2xl font-semibold text-gray-dark">
                    {post.title}
                  </h3>
                  <p className="font-mono text-gray-600 dark:text-gray-400 text-sm">
                    {post.date}
                  </p>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 rounded-sm border p-10 text-center shadow-card">
            <p className="dark:text-gray-300 text-gray-dark">
              No posts yet. Check back soon!
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-750 inline-block rounded-sm border px-6 py-3 font-medium text-gray-dark transition-colors hover:bg-gray-light"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
