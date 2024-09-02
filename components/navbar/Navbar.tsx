"use client";

import { IoLogoGameControllerB } from "react-icons/io";
import Container from "../Container";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaYoutube } from "react-icons/fa";
import NavbarLinks from "./NavbarLinks";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const path = usePathname();
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const userMenu = useRef<null | HTMLDivElement>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const closeNav = () => {
    setTimeout(() => {
      setShowMobileMenu(false);
    }, 1000);
  };

  return (
    <header className="fixed z-30 flex h-14 w-full items-center bg-neutral-900 shadow-md sm:h-20">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href={"/"} className="work flex items-center gap-2">
            <IoLogoGameControllerB className="-rotate-12 rounded-full bg-red-500 p-1 text-4xl text-secondary" />
            <p className="text-2xl font-bold">
              GAME <span className="text-primary">NSANITY</span>
            </p>
          </Link>
          <div className="flex items-center gap-4 font-semibold max-lg:hidden">
            <NavbarLinks
              content={<FaYoutube />}
              _blank={true}
              href="https://www.youtube.com/@gamensanity"
              extraStyles="text-3xl"
              youtube
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
            <NavbarLinks
              content={"Merch"}
              href="/merch"
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
                  className="h-8 w-8 cursor-pointer rounded-full border-2"
                  width={26}
                  height={26}
                />
                {showUserMenu && (
                  <div className="absolute right-0 top-10 z-30 flex min-w-36 flex-col items-center justify-center gap-4 rounded-md rounded-tr-none bg-black p-2 shadow-md">
                    <span>{session.user.email}</span>
                    <button
                      className="btn1"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : path != "/register" && path != "/sign-in" ? (
              <div className="w-24">
                <button
                  className="btn1"
                  onClick={() => router.push("/register")}
                >
                  Join
                </button>
              </div>
            ) : (
              <div className="w-24"></div>
            )}
          </div>
          {/* Mobile Menu */}
          <div
            className="z-30 flex h-[24px] cursor-pointer flex-col items-center justify-center gap-1 lg:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <motion.div
              className="z-20 h-[2px] w-[25px] bg-secondary"
              initial={{ position: "relative" }}
              animate={{
                top: showMobileMenu ? "3px" : 0,
                rotate: showMobileMenu ? 45 : 0,
              }}
            ></motion.div>
            <AnimatePresence mode="popLayout">
              {!showMobileMenu && (
                <motion.div
                  className="z-20 h-[2px] w-[25px] bg-secondary"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, position: "relative" }}
                ></motion.div>
              )}
            </AnimatePresence>
            <motion.div
              className="z-20 h-[2px] w-[25px] bg-secondary"
              initial={{ position: "relative" }}
              animate={{
                bottom: showMobileMenu ? "3px" : 0,
                rotate: showMobileMenu ? -45 : 0,
              }}
            ></motion.div>
          </div>
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center gap-4 bg-bg px-4 text-lg font-semibold"
                initial={{ top: "-100%" }}
                animate={{ top: 0 }}
                exit={{ top: "100%" }}
              >
                <NavbarLinks
                  closeNav={() => setShowMobileMenu(false)}
                  content="Home"
                  href="/"
                />
                <NavbarLinks
                  closeNav={() => setShowMobileMenu(false)}
                  content="Reviews"
                  href="/reviews"
                />
                <NavbarLinks
                  closeNav={() => setShowMobileMenu(false)}
                  content="Contact"
                  href="/contact"
                />
                <NavbarLinks
                  closeNav={() => setShowMobileMenu(false)}
                  content="Merch"
                  href="/merch"
                />
                {session?.user ? (
                  <div className="flex flex-col items-center">
                    <div
                      onClick={() => {
                        signOut();
                        setShowMobileMenu(false);
                      }}
                    >
                      Sign Out
                    </div>
                    <div className="text-sm">{session.user.email}</div>
                  </div>
                ) : (
                  <NavbarLinks
                    closeNav={() => setShowMobileMenu(false)}
                    content="Join"
                    href="/register"
                  />
                )}
                <NavbarLinks
                  closeNav={() => setShowMobileMenu(false)}
                  content={<FaYoutube />}
                  href="https://www.youtube.com/@gamensanity"
                  youtube
                  _blank
                  extraStyles="text-4xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </Container>
    </header>
  );
}
