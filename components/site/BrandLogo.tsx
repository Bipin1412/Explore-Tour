import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  href?: string;
  size?: "header" | "footer";
  showTagline?: boolean;
}

export default function BrandLogo({
  href = "/",
  size = "header",
  showTagline = true
}: BrandLogoProps) {
  const imageWrapperClassName =
    size === "header"
      ? "w-[150px] rounded-[1rem] border border-[#d9c8ab]/70 bg-[#f7f1e7] px-3 py-2 shadow-[0_14px_34px_rgba(0,0,0,0.14)] sm:w-[180px]"
      : "w-[170px] rounded-[1.1rem] border border-[#d9c8ab]/70 bg-[#f7f1e7] px-3 py-2 shadow-[0_14px_34px_rgba(0,0,0,0.18)] sm:w-[210px]";

  const taglineClassName =
    size === "header"
      ? "hidden text-[10px] uppercase tracking-[0.24em] text-[#c8a783] sm:block sm:tracking-[0.34em]"
      : "text-[10px] uppercase tracking-[0.24em] text-[#c8a783] sm:tracking-[0.3em]";

  return (
    <Link href={href} className="inline-flex min-w-0 flex-col gap-2">
      <div className={imageWrapperClassName}>
        <Image
          src="/branding/final-logo-02.png"
          alt="Explorers logo"
          width={300}
          height={76}
          priority={size === "header"}
          className="h-auto w-full object-contain"
        />
      </div>
      {showTagline ? (
        <span className={taglineClassName}>Since 2001 | The Name of Excellence</span>
      ) : null}
    </Link>
  );
}
