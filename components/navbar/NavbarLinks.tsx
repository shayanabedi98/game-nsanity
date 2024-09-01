import Link from "next/link";

export default function NavbarLinks({
  content,
  href,
  extraStyles,
  _blank,
  youtube,
}: {
  content: string | JSX.Element;
  href: string;
  extraStyles?: string;
  _blank?: boolean;
  youtube?: boolean;
}) {
  return (
    <Link
      target={_blank ? "_blank" : ""}
      className={`${extraStyles} lg:hover:border-b transition border-white ${
        youtube ? "text-red-500" : "text-secondary"
      }`}
      href={href}
    >
      {content}
    </Link>
  );
}
