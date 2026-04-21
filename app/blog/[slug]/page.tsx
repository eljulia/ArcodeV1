import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPosts, getPostBySlug } from "@/lib/queries/blog";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.extracto ?? undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0f172a] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-[#2563eb]/10 text-[#2563eb] border-0">
                {tag}
              </Badge>
            ))}
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            {post.titulo}
          </h1>
          {post.published_at && (
            <p className="text-sm text-[#94a3b8]">{formatDate(post.published_at)}</p>
          )}
        </header>

        <div className="prose prose-slate max-w-none text-[#64748b] leading-relaxed whitespace-pre-wrap">
          {post.contenido}
        </div>
      </div>
    </div>
  );
}
