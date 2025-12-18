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
      <div className="min-h-screen bg-gray-800 dark:bg-gray-900 py-10">
        <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl">
            <div className="rounded-sm border border-gray-600 bg-gray-200 p-6 shadow-card dark:border-gray-700 dark:bg-gray-800">
              <h1 className="mb-3 text-2xl font-bold text-gray-dark dark:text-gray-100">
                Post not found
              </h1>
              <Link
                to="/blog"
                className="inline-flex rounded border border-gray-600 px-4 py-2 text-sm font-medium text-gray-dark hover:bg-gray-light dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
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
      <div className="min-h-screen bg-gray-800 dark:bg-gray-900 py-10">
        <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl">
            <div className="rounded-sm border border-gray-600 bg-gray-200 p-6 shadow-card dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-dark dark:text-gray-100">Loading…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 dark:bg-gray-900 py-10">
      <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="mb-6 flex flex-wrap gap-3">
            <Link
              to="/blog"
              className="inline-flex rounded border border-gray-600 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-dark dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Back to blog
            </Link>
            <Link
              to="/"
              className="inline-flex rounded border border-gray-600 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-dark dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Home
            </Link>
          </div>

          <article className="rounded-sm border border-gray-600 bg-gray-200 p-6 shadow-card dark:border-gray-700 dark:bg-gray-800">
            <h1 className="mb-2 text-3xl font-bold text-gray-dark dark:text-gray-100">
              {post.title}
            </h1>
              <p className="mb-6 text-sm font-mono text-gray-600 dark:text-gray-300">
              {post.date}
            </p>

            <div className="space-y-4 text-gray-dark dark:text-gray-100">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => (
                    <h1 className="mt-6 text-2xl font-bold" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="mt-6 text-xl font-semibold" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="mt-5 text-lg font-semibold" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="leading-7 text-gray-dark dark:text-gray-100" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a className="underline" target="_blank" rel="noreferrer" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc pl-6" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="list-decimal pl-6" {...props} />
                  ),
                  li: ({ ...props }) => <li className="my-1" {...props} />,
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-gray-600 pl-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300"
                      {...props}
                    />
                  ),
                  code: ({ ...props }) => (
                    <code
                      className="rounded bg-gray-light px-1 py-0.5 text-sm font-mono dark:bg-gray-900"
                      {...props}
                    />
                  ),
                  pre: ({ ...props }) => (
                    <pre
                      className="overflow-x-auto rounded bg-gray-light p-4 text-sm font-mono dark:bg-gray-900"
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
