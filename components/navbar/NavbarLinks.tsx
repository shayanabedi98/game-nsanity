"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinks({
  content,
  href,
  extraStyles,
  _blank,
  youtube,
  closeNav,
}: {
  content: string | JSX.Element;
  href: string;
  extraStyles?: string;
  _blank?: boolean;
  youtube?: boolean;
  closeNav?: () => void;
}) {
  const path = usePathname();
  return (
    <Link
      onClick={closeNav}
      target={_blank ? "_blank" : ""}
      className={`${extraStyles} flex justify-center text-center transition ${
        youtube
          ? "text-red-500"
          : path == href
            ? "min-w-[90px] border-b text-neutral-400"
            : "min-w-[90px] text-secondary"
      }`}
      href={href}
    >
      {content}
    </Link>
  );
}
