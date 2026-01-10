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
    <section className="bg-yellow dark:bg-[#494949] py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-gray-dark dark:text-white text-center text-xl font-medium uppercase tracking-widest mb-6">
            Blog
          </h2>
          
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-block rounded-sm border border-gray-dark dark:border-white bg-white dark:bg-gray-dark px-6 py-2 text-sm font-medium text-gray-dark dark:text-white hover:shadow-card-hover transition-shadow shadow-card"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug}>
              <div className="rounded-sm border border-gray-dark dark:border-white bg-white dark:bg-gray-dark shadow-card overflow-hidden">
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="block p-6 hover:shadow-card-hover transition-shadow"
                >
                  <h3 className="text-2xl font-semibold text-gray-dark dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm font-mono text-gray dark:text-gray-light">
                    {post.date}
                  </p>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="rounded-sm border border-gray-dark dark:border-white bg-white dark:bg-gray-dark shadow-card p-10 text-center">
            <p className="text-gray-dark dark:text-white">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
