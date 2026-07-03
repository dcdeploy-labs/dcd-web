import { client, urlFor } from "../../../lib/sanity";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export const revalidate = 60; // Revalidate every minute

async function getPost(slug: string) {
  const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "author": author->{name, "image": image.asset->url, bio},
    "mainImage": mainImage.asset->url,
    publishedAt,
    categories[]->{title},
    body,
    description
  }`;

  const post = await client.fetch(query, { slug });
  return post;
}

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-10 overflow-hidden rounded-2xl border border-border-default">
          <img
            src={urlFor(value).url()}
            alt={value.alt || "Blog image"}
            className="w-full h-auto"
            loading="lazy"
          />
          {value.caption && (
            <div className="bg-slate-50 px-4 py-3 text-sm text-text-muted border-t border-border-default italic">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-12 mb-6 text-text-heading">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-10 mb-4 text-text-heading">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg text-text-body leading-[1.8] mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand pl-6 py-2 italic text-text-heading bg-bg-blue-tint/30 rounded-r-xl my-8 text-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 space-y-3 mb-8 text-text-body text-lg">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 space-y-3 mb-8 text-text-body text-lg">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-brand underline decoration-brand/30 hover:decoration-brand font-semibold transition-all"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-white relative overflow-visible min-h-screen">
      
      <section className="relative pt-4 pb-16 px-6 max-w-6xl mx-auto w-full">
        <Link
          href="/blog"
          className="text-brand font-bold text-[14px] inline-flex items-center gap-2 group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.categories?.map((cat: any, i: number) => (
            <span
              key={i}
              className="bg-bg-blue-tint text-brand text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            >
              {cat.title}
            </span>
          ))}
        </div>

        <h1 className="text-[40px] md:text-[56px] font-heading font-extrabold text-text-heading leading-[1.1] tracking-[-0.02em] mb-8 max-w-4xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-border-default max-w-4xl">
          <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold text-lg overflow-hidden">
            {post.author?.image ? (
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              post.author?.name?.slice(0, 2).toUpperCase() || "DC"
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-text-heading">
              {post.author?.name || "DCDeploy Team"}
            </span>
            <span className="text-[14px] text-text-muted">
              {new Date(post.publishedAt || Date.now()).toLocaleDateString(
                "en-US",
                { month: "long", day: "numeric", year: "numeric" }
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 min-w-0">
            {post.mainImage && (
              <div className="w-full aspect-video rounded-[32px] overflow-hidden mb-16 shadow-2xl">
                <img
                  src={post.mainImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <article className="max-w-none">
              {post.description && (
                <p className="text-2xl text-text-body font-medium leading-relaxed mb-12 text-slate-600">
                  {post.description}
                </p>
              )}

              <div className="blog-content">
                <PortableText value={post.body} components={components} />
              </div>
            </article>
          </div>

          <aside className="w-full lg:w-[350px] shrink-0 sticky top-32">
            <div className="bg-white border border-border-default rounded-[32px] p-8 shadow-[0_20px_50px_rgba(14,84,135,0.06)] hover:shadow-[0_20px_60px_rgba(14,84,135,0.1)] transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-8">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>

                <h3 className="text-2xl font-heading font-bold text-text-heading mb-4 leading-tight">
                  Ready to supercharge?
                </h3>
                <p className="text-[15px] text-text-muted leading-relaxed mb-8">
                  Leverage DCDeploy’s high-performance CPUs to supercharge your
                  applications. With automatic scaling, it dynamically adjusts
                  resources based on demand and even shuts down idle services
                  (scale-to-zero), ensuring you only pay for what you use.
                </p>

                <Link
                  href="https://dash.dcdeploy.com"
                  className="block w-full py-5 bg-[#fcb817] text-[#0F172A] text-center rounded-2xl font-bold shadow-lg shadow-[#fcb817]/20 hover:bg-[#e5a515] transition-all transform hover:-translate-y-1"
                >
                  Deploy Now
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-bg-page py-24 px-6 mt-16 border-t border-border-default">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[32px] font-heading font-bold text-text-heading mb-6">
            Ready to ship?
          </h2>
          <p className="text-[18px] text-text-muted mb-10">
            Join thousands of developers building the future on DCDeploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://dash.dcdeploy.com"
              className="px-8 py-4 bg-[#fcb817] text-[#0F172A] rounded-full font-bold shadow-lg shadow-[#fcb817]/20 hover:bg-[#e5a515] transition-all"
            >
              Start Building Now
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white border border-border-default text-text-heading rounded-full font-bold hover:border-brand transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
