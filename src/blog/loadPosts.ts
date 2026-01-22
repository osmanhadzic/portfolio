import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

type MarkdownImport = () => Promise<string>;

const markdownFiles = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, MarkdownImport>;

const loadersBySlug: Record<string, MarkdownImport> = Object.fromEntries(
  Object.entries(markdownFiles).map(([path, loader]) => {
    const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
    return [slug, loader];
  }),
);

function parsePost(slug: string, raw: string): BlogPost {
  const parsed = matter(raw);

  return {
    slug,
    title: parsed.data.title || "Untitled",
    date: parsed.data.date || "No date",
    content: parsed.content,
  };
}

export async function loadAllPosts(): Promise<BlogPost[]> {
  const loadedPosts = await Promise.all(
    Object.entries(loadersBySlug).map(async ([slug, loader]) => {
      const raw = await loader();
      return parsePost(slug, raw);
    }),
  );

  return loadedPosts;
}

export async function loadPostBySlug(slug: string): Promise<BlogPost | null> {
  const loader = loadersBySlug[slug];
  if (!loader) return null;

  const raw = await loader();
  return parsePost(slug, raw);
}
