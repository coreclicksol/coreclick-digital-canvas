import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Service is required"),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().min(1, "Message is required"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export async function sendInquiry(input: InquiryInput) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set; inquiry was not emailed.", input);
    return { ok: false as const, error: "Email service is not configured yet." };
  }

  const fromEmail = process.env["RESEND_FROM_EMAIL"] || "CoreClick <noreply@coreclick.studio>";
  const toEmail = process.env["INQUIRY_EMAIL"] || "coreclicksol@gmail.com";

  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company || "-"}`,
    `Service: ${input.service}`,
    `Budget: ${input.budget}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: input.email,
        subject: `New project inquiry from ${input.name}`,
        text: body,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend error:", res.status, text);
      return { ok: false as const, error: "Failed to send inquiry. Please try again later." };
    }

    return { ok: true as const };
  } catch (err) {
    console.error("Failed to reach Resend:", err);
    return { ok: false as const, error: "Failed to send inquiry. Please try again later." };
  }
}
