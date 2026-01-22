import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { loadPostBySlug, type BlogPost } from "@/blog/loadPosts";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    void (async () => {
      if (!slug) {
        setNotFound(true);
        return;
      }

      const loadedPost = await loadPostBySlug(slug);
      if (!loadedPost) {
        setNotFound(true);
        return;
      }

      setNotFound(false);
      setPost(loadedPost);
    })();
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-yellow dark:bg-[#494949] py-10">
        <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl">
            <div className="rounded-sm border border-gray-dark dark:border-white bg-white dark:bg-gray-dark p-6 shadow-card">
              <h1 className="mb-3 text-2xl font-bold text-gray-dark dark:text-white">
                Post not found
              </h1>
              <Link
                to="/blog"
                className="inline-flex rounded-sm border border-gray-dark dark:border-white px-4 py-2 text-sm font-medium text-gray-dark dark:text-white hover:shadow-card-hover transition-shadow shadow-card"
              >
                Back to blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-yellow dark:bg-[#494949] py-10">
        <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl">
            <div className="rounded-sm border border-gray-dark dark:border-white bg-white dark:bg-gray-dark p-6 shadow-card">
              <p className="text-gray-dark dark:text-white">Loading…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow dark:bg-[#494949] py-10">
      <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <Link
              to="/blog"
              className="inline-flex rounded-sm border border-gray-dark dark:border-white px-4 py-2 text-sm font-medium text-gray-dark dark:text-white hover:shadow-card-hover transition-shadow shadow-card"
            >
              Back to blog
            </Link>
            <Link
              to="/"
              className="inline-flex rounded-sm border border-gray-dark dark:border-white px-4 py-2 text-sm font-medium text-gray-dark dark:text-white hover:shadow-card-hover transition-shadow shadow-card"
            >
              Home
            </Link>
          </div>

          <article className="rounded-sm border border-gray-dark dark:border-white bg-white dark:bg-gray-dark p-6 shadow-card">
            <h1 className="mb-2 text-3xl font-bold text-gray-dark dark:text-white">
              {post.title}
            </h1>
              <p className="mb-6 text-sm font-mono text-gray dark:text-gray-light">
              {post.date}
            </p>

            <div className="space-y-4 text-gray-dark dark:text-white">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="mt-6 text-2xl font-bold text-gray-dark dark:text-white" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="mt-6 text-xl font-semibold text-gray-dark dark:text-white" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="mt-5 text-lg font-semibold text-gray-dark dark:text-white" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="leading-7 text-gray-dark dark:text-white" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a className="underline text-gray-dark dark:text-white hover:text-gray dark:hover:text-gray-light" target="_blank" rel="noreferrer" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-6 text-gray-dark dark:text-white" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal pl-6 text-gray-dark dark:text-white" {...props} />
                  ),
                  li: ({ ...props }) => <li className="my-1" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-gray-dark dark:border-white pl-4 italic text-gray dark:text-gray-light bg-gray-light dark:bg-[#494949] py-2"
                      {...props}
                    />
                  ),
                  code: ({ ...props }) => (
                    <code
                      className="rounded bg-gray-light dark:bg-[#494949] px-1 py-0.5 text-sm font-mono text-gray-dark dark:text-white"
                      {...props}
                    />
                  ),
                  pre: ({ ...props }) => (
                    <pre
                      className="overflow-x-auto rounded bg-gray-light dark:bg-[#494949] p-4 text-sm font-mono text-gray-dark dark:text-white"
                      {...props}
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
