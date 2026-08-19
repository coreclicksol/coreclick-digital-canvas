import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { posts } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { MagneticLink } from "@/components/MagneticButton";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable — CoreClick" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — CoreClick Journal` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
      ],
    };
  },
  component: Article,
});

function Article() {
  const { post } = Route.useLoaderData();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="shell pb-24 pt-32 md:pt-44">
      <Reveal>
        <Link
          to="/blogs"
          className="font-display text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to journal
        </Link>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">{post.category}</span>
          <span>{post.date}</span>
          <span>{post.read}</span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.03] text-balance-tight sm:text-6xl">
          {post.title}
        </h1>
      </Reveal>
      <Reveal delay={180}>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="mt-12 h-64 w-full rounded-[2rem] border border-glass-border object-cover md:h-[28rem]"
        />
      </Reveal>

      <div className="mx-auto mt-14 max-w-2xl space-y-6">
        <Reveal>
          <p className="text-lg leading-relaxed text-foreground">{post.excerpt}</p>
        </Reveal>
        {post.body.map((para, i) => (
          <Reveal key={i} delay={i * 60}>
            <p className="leading-relaxed text-muted-foreground">{para}</p>
          </Reveal>
        ))}
        <Reveal delay={200}>
          <div className="mt-12 glass rounded-3xl p-8">
            <p className="eyebrow">Want this for your business?</p>
            <p className="mt-3 text-lg font-semibold">
              We design and build digital experiences that earn attention.
            </p>
            <div className="mt-6">
              <MagneticLink to="/contact">
                Let&apos;s Talk <span aria-hidden>→</span>
              </MagneticLink>
            </div>
          </div>
        </Reveal>
      </div>

      <section className="mt-24">
        <p className="eyebrow">Keep reading</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {more.map((p) => (
            <Link
              key={p.slug}
              to="/blogs/$slug"
              params={{ slug: p.slug }}
              className="group rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1.5 hover:glow-ring"
            >
              <span className="eyebrow">{p.category}</span>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <span className="mt-4 inline-block font-display text-sm text-primary">
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
