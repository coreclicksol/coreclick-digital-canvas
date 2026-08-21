import { defineTool } from "@lovable.dev/mcp-js";
import { packages } from "../content";

export default defineTool({
  name: "list_packages",
  title: "List packages",
  description: "List CoreClick's service packages with pricing, who each is for, and what it includes.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: packages
          .map((p) => `${p.name} — ${p.price}\n${p.forWho}\n${p.features.map((f) => `  • ${f}`).join("\n")}`)
          .join("\n\n"),
      },
    ],
    structuredContent: { packages },
  }),
});
