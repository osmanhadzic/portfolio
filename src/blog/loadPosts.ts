type MatterParsed = {
  data: Record<string, unknown>;
  content: string;
};

type MatterFn = (input: string) => MatterParsed;

let cachedMatter: MatterFn | null = null;

async function getMatter(): Promise<MatterFn> {
  if (cachedMatter) return cachedMatter;

  // Some gray-matter dependencies assume Buffer exists in the browser.
  if (typeof window !== "undefined" && !(window as any).Buffer) {
    const { Buffer } = await import("buffer");
    (window as any).Buffer = Buffer;
  }

  const module = await import("gray-matter");
  const matter = ((module as any).default ?? module) as MatterFn;
  cachedMatter = matter;
  return matter;
}

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

async function parsePost(slug: string, raw: string): Promise<BlogPost> {
  const matter = await getMatter();
  const parsed = matter(raw);

  const title =
    typeof parsed.data["title"] === "string"
      ? parsed.data["title"]
      : "Untitled";
  const date =
    typeof parsed.data["date"] === "string" ? parsed.data["date"] : "No date";

  return {
    slug,
    title,
    date,
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
