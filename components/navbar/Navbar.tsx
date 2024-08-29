"use client";

import { IoLogoGameControllerB } from "react-icons/io";
import Container from "../Container";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaYoutube } from "react-icons/fa";
import NavbarLinks from "./NavbarLinks";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter()
  const userMenu = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (userMenu.current && !userMenu.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showUserMenu]);

  return (
    <header className="bg-neutral-900 shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href={"/"} className="flex items-center work gap-2 ">
            <IoLogoGameControllerB className="text-4xl bg-accent -rotate-12 rounded-full p-1 text-primary" />
            <p className="text-2xl font-bold">
              GAME <span className="text-primary">NSANITY</span>
            </p>
          </Link>
          <div className="flex items-center gap-4 font-semibold">
            <NavbarLinks
              content={<FaYoutube />}
              _blank={true}
              href="https://www.youtube.com/@gamensanity"
              extraStyles="text-3xl"
            />
            <NavbarLinks content={"Home"} href="/" extraStyles="text-lg" />
            <NavbarLinks
              content={"Reviews"}
              href="/reviews"
              extraStyles="text-lg"
            />
            <NavbarLinks
              content={"Contact"}
              href="/contact"
              extraStyles="text-lg"
            />
            {session?.user ? (
              <div className="relative" ref={userMenu}>
                <Image
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                  }}
                  priority
                  src={session.user.image || "/assets/avatar.png"}
                  alt="user display picture"
                  className="cursor-pointer w-8 h-8 rounded-full border-2"
                  width={26}
                  height={26}
                />
                {showUserMenu && (
                  <div className="z-30 right-0 min-w-36 bg-black absolute flex flex-col items-center justify-center rounded-md shadow-md p-2 gap-4 top-10 rounded-tr-none">
                    <span>{session.user.email}</span>
                    <button className="btn1"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-24">
                <button className="btn1" onClick={() => router.push("/register")}>Join</button>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}