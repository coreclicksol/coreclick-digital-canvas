import { defineTool } from "@lovable.dev/mcp-js";
import { services, studio } from "../content";

export default defineTool({
  name: "list_services",
  title: "List services",
  description: "List the design and development services CoreClick offers, with a short description of each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: services.map((s) => `- ${s.title}: ${s.desc}`).join("\n"),
      },
    ],
    structuredContent: { studio: studio.name, services },
  }),
});
