import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { posts } from "../content";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Read the full text of one CoreClick journal article by its slug.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Slug of the article, from list_blog_posts."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      throw new ToolError(`No article with slug "${slug}". Use list_blog_posts to see valid slugs.`);
    }
    return {
      content: [{ type: "text", text: `# ${post.title}\n\n${post.body.join("\n\n")}` }],
      structuredContent: { post },
    };
  },
});
