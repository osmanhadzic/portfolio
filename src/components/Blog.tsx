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
    <section className="bg-gray-800 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-gray-100 dark:text-gray-200 text-center text-xl font-medium uppercase tracking-widest mb-10">
          Blog
        </h2>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug}>
              <div className="rounded-sm border border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 shadow-card overflow-hidden">
                <Link to={`/blog/${post.slug}`} className="block p-6 hover:bg-gray-light dark:hover:bg-gray-750 transition-colors">
                  <h3 className="text-2xl font-semibold text-gray-dark dark:text-gray-100 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {post.date}
                  </p>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="rounded-sm border border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 shadow-card p-10 text-center">
            <p className="text-gray-dark dark:text-gray-300">No posts yet. Check back soon!</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block rounded-sm border border-gray-600 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 px-6 py-3 text-gray-dark dark:text-gray-100 hover:bg-gray-light dark:hover:bg-gray-750 font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
