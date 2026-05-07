import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { Info, Lightbulb, ExternalLink, UserPlus } from "lucide-react";
import { ProfileShareButton } from "@/components/shared/profile-share-button";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="site-canvas">
      <NavbarShell />
      <main className="mx-auto w-full pb-16">
        {/* Hero Banner */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700 pb-28 pt-10 sm:pb-32 sm:pt-14">
          {/* Decorative floating circles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-[12%] h-4 w-4 rounded-full bg-white/20" />
            <div className="absolute left-[22%] top-[55%] h-3 w-3 rounded-full bg-white/25" />
            <div className="absolute left-[45%] top-[18%] h-5 w-5 rounded-full bg-white/15" />
            <div className="absolute left-[62%] top-[60%] h-4 w-4 rounded-full bg-white/20" />
            <div className="absolute left-[78%] top-[22%] h-6 w-6 rounded-full bg-white/15" />
            <div className="absolute left-[92%] top-[50%] h-3 w-3 rounded-full bg-white/25" />
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 leading-[0]">
            <svg
              className="relative block h-[60px] w-full sm:h-[80px]"
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,45 L1440,80 L0,80 Z"
                fill="#f9f8f6"
              />
            </svg>
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-lg border-4 border-white/90 bg-white p-3 shadow-xl sm:h-40 sm:w-40">
                {logoUrl ? (
                  <ContentImage
                    src={logoUrl}
                    alt={post.title}
                    fill
                    className="object-contain"
                    sizes="160px"
                    intrinsicWidth={160}
                    intrinsicHeight={160}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-blue-600">
                    {post.title.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <SchemaJsonLd data={breadcrumbData} />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Brand Name, Domain & Actions */}
          <div className="-mt-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {brandName}
            </h1>
            {domain ? (
              <p className="mt-1 text-sm font-medium text-muted-foreground">{domain}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="inline-flex items-center gap-2 bg-blue-600 px-6 text-base text-white hover:bg-blue-700"
              >
                <Link href="/login" className="inline-flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Follow
                </Link>
              </Button>
              <ProfileShareButton />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 border-b border-border/70">
            <nav className="flex gap-8">
              <div className="group relative inline-flex items-center gap-2 pb-3">
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  About
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              </div>
            </nav>
          </div>

          {/* About Section */}
          <section className="mt-10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60">
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">About</h2>
              <div className="ml-4 flex-1 border-t border-border/70" />
            </div>

            <article
              className="article-content prose prose-slate mt-6 max-w-3xl text-base leading-relaxed prose-p:my-4 prose-a:text-blue-600 prose-a:underline prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />

            {website ? (
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 px-7 text-base text-white hover:bg-blue-700"
                >
                  <Link
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Visit Official Site
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : null}
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
