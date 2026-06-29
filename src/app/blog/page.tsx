import Link from "next/link";
import { client, urlFor } from "../../lib/sanity";
import { groq } from "next-sanity";

// This enables live updates without full redeploy using Incremental Static Regeneration (ISR)
export const revalidate = 60; 

async function getPosts() {
  try {
    const query = groq`*[_type == "post"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      "author": author->name,
      "mainImage": mainImage.asset->url,
      publishedAt,
      categories[]->{title},
      description,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }`;
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return []; // Return empty array if not configured
  }
}

export default async function BlogPage() {
  const dynamicPosts = await getPosts();
  
  // Fallback static data if Sanity is not yet connected or has no posts
  const staticFallbackPosts = [
    { title: "Building a Serverless Database from Scratch", bg: "from-blue-100 to-blue-200", badge: "ENGINEERING", time: "10 min", author: "David Kim" },
    { title: "Deploy Next.js 14 to production in 3 clicks", bg: "from-purple-100 to-purple-200", badge: "TUTORIAL", time: "5 min", author: "Alex Chen" },
  ];

  const posts = dynamicPosts.length > 0 ? dynamicPosts : null;

  return (
    <div className="flex flex-col w-full bg-bg-page relative overflow-hidden min-h-screen">
      
      {/* HERO / FEATURED POST */}
      <section className="relative pt-32 pb-16 px-6 max-w-6xl mx-auto w-full">
        <h1 className="text-[48px] font-heading font-extrabold text-text-heading leading-[1.1] tracking-[-0.02em] mb-12 text-center md:text-left">
          The DCDeploy <span className="gradient-text">Blog</span>
        </h1>
        
        {posts ? (
           <Link href={`/blog/${posts[0].slug}`} className="block relative bg-white border border-border-default rounded-[24px] overflow-hidden shadow-sm hover:shadow-[0_12px_48px_rgba(14,84,135,0.12)] transition-shadow group">
            <div className="flex flex-col md:flex-row h-auto md:h-[400px]">
                <div className="md:w-[55%] h-[240px] md:h-full relative overflow-hidden">
                  <img src={posts[0].mainImage || "/dash.png"} alt={posts[0].title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                
                <div className="md:w-[45%] p-10 flex flex-col justify-center">
                  <div className="bg-bg-blue-tint text-brand text-[11px] font-bold px-3 py-1 rounded-full w-max mb-6 uppercase tracking-wider">
                    {posts[0].categories?.[0]?.title || "Featured"}
                  </div>
                  <h2 className="text-[32px] font-heading font-bold text-text-heading mb-4 leading-tight group-hover:text-brand transition-colors">{posts[0].title}</h2>
                  <p className="text-[16px] text-text-muted leading-[1.7] mb-8 line-clamp-3">
                    {posts[0].description || "Read our latest announcement and technical deep-dives on the DCDeploy platform."}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                        {posts[0].author?.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-text-heading">{posts[0].author}</span>
                        <span className="text-[12px] text-text-muted">{new Date(posts[0].publishedAt || Date.now()).toLocaleDateString()} • {posts[0].estimatedReadingTime || 5} min read</span>
                      </div>
                  </div>
                </div>
            </div>
          </Link>
        ) : (
          <Link href="/blog/featured" className="block relative bg-white border border-border-default rounded-[24px] overflow-hidden shadow-sm hover:shadow-[0_12px_48px_rgba(14,84,135,0.12)] transition-shadow group">
             <div className="flex flex-col md:flex-row h-auto md:h-[400px]">
                <div className="md:w-[55%] h-[240px] md:h-full bg-gradient-to-br from-[#073a61] via-[#0e5487] to-[#227dbf] relative p-8 flex items-end">
                   <div className="absolute inset-0 circuit-pattern opacity-[0.1] -z-0"></div>
                   <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-white z-10 font-mono text-[14px] shadow-lg border border-white/20">
                     export const deploy = async () =&gt; &#123; ... &#125;
                   </div>
                </div>
                
                <div className="md:w-[45%] p-10 flex flex-col justify-center">
                   <div className="bg-bg-blue-tint text-brand text-[11px] font-bold px-3 py-1 rounded-full w-max mb-6 uppercase tracking-wider">Product Update</div>
                   <h2 className="text-[32px] font-heading font-bold text-text-heading mb-4 leading-tight group-hover:text-brand transition-colors">Introducing DCDeploy Edge Workers</h2>
                   <p className="text-[16px] text-text-muted leading-[1.7] mb-8">
                     Run your compute at the edge, globally distributed across 35 regions. 0ms cold starts, native TypeScript support, and built directly into our deployment pipeline.
                   </p>
                   <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">AC</div>
                      <div className="flex flex-col">
                         <span className="text-[14px] font-semibold text-text-heading">Alex Chen</span>
                         <span className="text-[12px] text-text-muted">April 28, 2026 • 6 min read</span>
                      </div>
                   </div>
                </div>
             </div>
          </Link>
        )}
      </section>

      {/* FILTER PILLS */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
          <button className="px-5 py-2 rounded-full text-[14px] font-medium bg-[#fcb817] text-[#0F172A] shadow-md">All Posts</button>
          <button className="px-5 py-2 rounded-full text-[14px] font-medium bg-white text-text-muted hover:text-text-heading border border-border-default">Tutorials</button>
          <button className="px-5 py-2 rounded-full text-[14px] font-medium bg-white text-text-muted hover:text-text-heading border border-border-default">Engineering</button>
          <button className="px-5 py-2 rounded-full text-[14px] font-medium bg-white text-text-muted hover:text-text-heading border border-border-default">Product Updates</button>
          <button className="px-5 py-2 rounded-full text-[14px] font-medium bg-white text-text-muted hover:text-text-heading border border-border-default">Company</button>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="px-6 mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {posts ? posts.map((post: any, i: number) => (
              <Link href={`/blog/${post.slug}`} key={i} className="bg-white border border-border-default rounded-[20px] overflow-hidden shadow-sm hover:shadow-[0_8px_40px_rgba(14,84,135,0.12)] transition-shadow flex flex-col group cursor-pointer">
                 <div className="h-[200px] w-full bg-slate-100 relative overflow-hidden">
                   <img src={post.mainImage || "/dash.png"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-text-heading text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {post.categories?.[0]?.title || "Article"}
                   </div>
                 </div>
                 
                 <div className="p-6 flex-1 flex flex-col">
                   <h3 className="text-[18px] font-heading font-semibold text-text-heading leading-snug mb-3 group-hover:text-brand transition-colors">{post.title}</h3>
                   <p className="text-[14px] text-text-muted mb-6 flex-1 line-clamp-2">{post.description || "Read more about this article on the DCDeploy blog."}</p>
                   
                   <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand/10 text-brand flex items-center justify-center text-[10px] uppercase font-bold">
                           {post.author?.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[12px] text-text-muted font-medium">{post.author}</span>
                      </div>
                      <span className="text-[12px] text-text-light">{post.estimatedReadingTime || 5} min read</span>
                   </div>
                 </div>
              </Link>
           )) : staticFallbackPosts.map((post, i) => (
              <div key={i} className="bg-white border border-border-default rounded-[20px] overflow-hidden shadow-sm hover:shadow-[0_8px_40px_rgba(14,84,135,0.12)] transition-shadow flex flex-col group cursor-pointer">
                 <div className={`h-[200px] w-full bg-gradient-to-br ${post.bg} p-6 flex items-start relative`}>
                   <div className="bg-white/80 backdrop-blur text-text-heading text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.badge}</div>
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                   <h3 className="text-[18px] font-heading font-semibold text-text-heading leading-snug mb-3 group-hover:text-brand transition-colors">{post.title}</h3>
                   <p className="text-[14px] text-text-muted mb-6 flex-1 line-clamp-2">Learn about the latest techniques and best practices to optimize your developer workflow.</p>
                   <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] uppercase font-bold">
                           {post.author.slice(0, 2)}
                        </div>
                        <span className="text-[12px] text-text-muted font-medium">{post.author}</span>
                      </div>
                      <span className="text-[12px] text-text-light">{post.time}</span>
                   </div>
                 </div>
              </div>
           ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-white border border-border-default rounded-[24px] p-10 md:p-14 shadow-lg text-center relative overflow-hidden">
           <div className="absolute inset-0 circuit-pattern opacity-[0.03] -z-0"></div>
           <div className="relative z-10 max-w-lg mx-auto">
             <div className="w-16 h-16 bg-bg-blue-tint rounded-2xl mx-auto flex items-center justify-center text-brand text-2xl mb-6">✉️</div>
             <h2 className="text-[32px] font-heading font-bold text-text-heading mb-4">Subscribe to our newsletter</h2>
             <p className="text-[16px] text-text-muted mb-8">Get the latest engineering posts, platform updates, and deployment tips sent straight to your inbox once a month.</p>
             <div className="flex flex-col sm:flex-row gap-3">
               <input type="email" placeholder="Email address" className="flex-1 bg-white border border-border-default rounded-full px-5 py-3 focus:outline-none focus:border-brand shadow-sm text-[15px]" />
               <button className="bg-[#fcb817] text-[#0F172A] font-semibold rounded-full px-8 py-3 hover:bg-[#e5a515] transition-colors shadow-[0_4px_14px_rgba(14,84,135,0.3)]">Subscribe</button>
             </div>
             <p className="text-[12px] text-text-light mt-4">No spam. Unsubscribe anytime.</p>
           </div>
        </div>
      </section>

    </div>
  );
}
