import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Journal — Design & Digital Insights | CoreClick" },
      {
        name: "description",
        content:
          "Essays on web design, UI/UX, branding and digital strategy from the CoreClick studio.",
      },
      { property: "og:title", content: "CoreClick Journal" },
      {
        property: "og:description",
        content: "Essays on design, branding and digital strategy from CoreClick.",
      },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title={
          <>
            Notes on design, <span className="italic text-primary">business and the web.</span>
          </>
        }
        intro="Practical thinking from the studio — written for founders and marketing teams, not for designers only."
      />

      <div className="shell pb-24">
        {featured ? (
          <Reveal>
            <Link
              to="/blogs/$slug"
              params={{ slug: featured.slug }}
              data-cursor="hover"
              className="group grid gap-6 overflow-hidden rounded-[2rem] glass p-4 transition-all duration-500 hover:glow-ring md:grid-cols-2 md:p-6"
            >
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="h-60 w-full object-cover transition-transform duration-[900ms] group-hover:scale-105 md:h-80"
                />
              </div>
              <div className="flex flex-col justify-center px-2 pb-4 md:px-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
                    {featured.category}
                  </span>
                  <span>{featured.date}</span>
                  <span>{featured.read}</span>
                </div>
                <h2 className="mt-5 text-2xl font-bold leading-tight sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 font-display text-sm text-primary">
                  Read Article{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 70}>
              <Link
                to="/blogs/$slug"
                params={{ slug: post.slug }}
                data-cursor="hover"
                className="group flex h-full flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2 hover:glow-ring"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span>{post.read}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold leading-snug">{post.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm">
                    Read Article{" "}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
