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
    <section className="min-h-screen bg-yellow px-4 py-10 dark:bg-[#494949] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="mb-6 text-center text-xl font-medium uppercase tracking-widest text-gray-dark dark:text-white">
            Blog
          </h2>

          <div className="mb-8 text-center">
            <Link
              to="/"
              className="inline-block rounded-sm border border-gray-dark bg-white px-6 py-2 text-sm font-medium text-gray-dark shadow-card transition-shadow hover:shadow-card-hover dark:border-white dark:bg-gray-dark dark:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug}>
              <div className="overflow-hidden rounded-sm border border-gray-dark bg-white shadow-card dark:border-white dark:bg-gray-dark">
                <Link
                  to={`/blog/${post.slug}`}
                  className="block p-6 transition-shadow hover:shadow-card-hover"
                >
                  <h3 className="mb-2 text-2xl font-semibold text-gray-dark dark:text-white">
                    {post.title}
                  </h3>
                  <p className="font-mono text-sm text-gray dark:text-gray-light">
                    {post.date}
                  </p>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="rounded-sm border border-gray-dark bg-white p-10 text-center shadow-card dark:border-white dark:bg-gray-dark">
            <p className="text-gray-dark dark:text-white">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
