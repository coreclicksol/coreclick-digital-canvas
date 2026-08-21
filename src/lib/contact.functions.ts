import { createServerFn } from "@tanstack/react-start";
import { inquirySchema, sendInquiry } from "./contact.server";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    return sendInquiry(data);
  });
