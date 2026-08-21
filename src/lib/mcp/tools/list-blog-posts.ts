import { defineTool } from "@lovable.dev/mcp-js";
import { posts } from "../content";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description: "List CoreClick journal articles with their slug, title, category, date and excerpt.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const summaries = posts.map(({ slug, title, category, date, excerpt }) => ({
      slug,
      title,
      category,
      date,
      excerpt,
    }));
    return {
      content: [
        {
          type: "text",
          text: summaries.map((p) => `${p.slug} — ${p.title} (${p.category}, ${p.date})`).join("\n"),
        },
      ],
      structuredContent: { posts: summaries },
    };
  },
});
