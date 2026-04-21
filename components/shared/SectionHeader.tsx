interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, subtitle, align = "center" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 ${alignClass}`}>
      <h2
        className="text-3xl md:text-4xl font-semibold text-[#0f172a] mb-4"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-[#64748b] max-w-2xl leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", ...(align === "center" ? { margin: "0 auto" } : {}) }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
