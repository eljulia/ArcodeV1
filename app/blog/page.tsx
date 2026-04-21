import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/queries/blog";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — IA para negocios colombianos",
  description:
    "Artículos prácticos sobre IA, automatización y transformación digital para PYMEs en Colombia.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4"
            style={{ fontFamily: "var(--font-geist)" }}
          >
            Blog
          </h1>
          <p className="text-[#64748b]">
            IA y automatización explicadas para empresarios colombianos.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 text-[#94a3b8]">
            Próximos artículos en preparación.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white border border-[#e2e8f0] rounded-xl p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-[#2563eb]/10 text-[#2563eb] border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2
                  className="text-xl font-semibold text-[#0f172a] group-hover:text-[#2563eb] transition-colors mb-2"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {post.titulo}
                </h2>
                {post.extracto && (
                  <p className="text-[#64748b] text-sm leading-relaxed mb-3">
                    {post.extracto}
                  </p>
                )}
                {post.published_at && (
                  <p className="text-xs text-[#94a3b8]">{formatDate(post.published_at)}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
