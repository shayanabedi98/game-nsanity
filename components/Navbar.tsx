"use client";

import { IoLogoGameControllerB } from "react-icons/io";
import Container from "./Container";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaYoutube } from "react-icons/fa";

export default function Navbar() {
  const { status, data: session } = useSession();

  return (
    <header>
      <Container>
        <nav className="flex items-center justify-between py-4 border-b border-accent">
          <Link href={"/"} className="flex items-center work gap-2 ">
            <IoLogoGameControllerB className="text-4xl bg-accent -rotate-12 rounded-full p-1 text-primary" />
            <p className="text-2xl font-bold">
              GAME <span className="text-primary">NSANITY</span>
            </p>
          </Link>
          <div className="flex items-center gap-2 font-semibold">
            <Link className="text-2xl " href={"https://www.youtube.com/@gamensanity"}>
              <FaYoutube />
            </Link>
            <Link href={"/blogs"}>Blog</Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
