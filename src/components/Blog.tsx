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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Blog</h2>

      <div className="mb-6">
        <Link to="/blog" className="underline">
          View all posts
        </Link>
      </div>

      {posts.map((post) => (
        <article key={post.slug} className="mb-10 border-b pb-6">
          <h3 className="text-2xl font-semibold">
            <Link to={`/blog/${post.slug}`} className="underline">
              {post.title}
            </Link>
          </h3>
          <p className="text-gray-500 text-sm font-mono mb-3">{post.date}</p>
        </article>
      ))}
    </div>
  );
}
