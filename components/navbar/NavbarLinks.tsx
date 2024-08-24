import Link from "next/link";

export default function NavbarLinks({
  content,
  href,
  extraStyles,
}: {
  content: string | JSX.Element;
  href: string;
  extraStyles?: string;
}) {
  return (
    <Link
      className={`${extraStyles} lg:hover:border-b transition border-white text-primary`}
      href={href}
    >
      {content}
    </Link>
  );
}
