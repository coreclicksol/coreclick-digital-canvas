import { auth, defineMcp } from "@lovable.dev/mcp-js";

import listServices from "./tools/list-services";
import listPackages from "./tools/list-packages";
import listProjects from "./tools/list-projects";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import createInquiry from "./tools/create-inquiry";
import listMyInquiries from "./tools/list-my-inquiries";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "coreclick-digital-canvas",
  title: "CoreClick Digital Canvas",
  version: "0.1.0",
  instructions:
    "Tools for CoreClick, a digital design and development studio. Read the studio's services, packages, portfolio projects and journal articles, and submit or review project inquiries on behalf of the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  // The SDK's tool type omits `undefined` for optional fields, which trips
  // exactOptionalPropertyTypes; the runtime shape is correct.
  tools: [
    listServices,
    listPackages,
    listProjects,
    listBlogPosts,
    getBlogPost,
    createInquiry,
    listMyInquiries,
  ] as never,
});
