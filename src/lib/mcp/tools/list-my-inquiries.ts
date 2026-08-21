import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_my_inquiries",
  title: "List my inquiries",
  description: "List the project inquiries the signed-in user has submitted to CoreClick.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("inquiries")
      .select("id, name, email, company, service, budget, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    const rows = data ?? [];
    return {
      content: [
        {
          type: "text",
          text: rows.length
            ? rows.map((r) => `${r.created_at} — ${r.service} (${r.budget}): ${r.message}`).join("\n")
            : "No inquiries yet.",
        },
      ],
      structuredContent: { inquiries: rows },
    };
  },
});
