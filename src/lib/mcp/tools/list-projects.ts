import { defineTool } from "@lovable.dev/mcp-js";
import { projects } from "../content";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description: "List the projects in CoreClick's portfolio, including category and the work delivered.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: projects
          .map((p) => `${p.title} (${p.category}) — ${p.desc} [${p.tags.join(", ")}]`)
          .join("\n"),
      },
    ],
    structuredContent: { projects },
  }),
});
