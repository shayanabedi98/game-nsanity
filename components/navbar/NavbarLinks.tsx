import Link from "next/link";

export default function NavbarLinks({
  content,
  href,
  extraStyles,
  _blank
}: {
  content: string | JSX.Element;
  href: string;
  extraStyles?: string;
  _blank?: boolean
}) {
  return (
    <Link
      target={_blank ? "_blank" : ""}
      className={`${extraStyles} lg:hover:border-b transition border-white text-primary`}
      href={href}
    >
      {content}
    </Link>
  );
}
