import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_inquiry",
  title: "Create project inquiry",
  description:
    "Submit a new project inquiry to CoreClick on behalf of the signed-in user. Ask the user for the details before calling this.",
  inputSchema: {
    name: z.string().trim().min(1).describe("Contact name."),
    email: z.string().trim().email().describe("Contact email address."),
    company: z.string().trim().optional().describe("Company name, if any."),
    service: z
      .string()
      .trim()
      .min(1)
      .describe("Service needed, e.g. Web Design, UI/UX, Branding, Web Development, Graphic Design."),
    budget: z.string().trim().min(1).describe("Budget range, e.g. $1k – $3k."),
    message: z.string().trim().min(1).describe("Description of the project."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("inquiries")
      .insert({ ...input, user_id: ctx.getUserId() })
      .select()
      .single();

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Inquiry submitted. CoreClick replies within one working day.` }],
      structuredContent: { inquiry: data },
    };
  },
});
