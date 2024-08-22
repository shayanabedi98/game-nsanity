"use client";

import { IoLogoGameControllerB } from "react-icons/io";
import Container from "./Container";

export default function Navbar() {
  return (
    <header>
      <Container>
        <nav className="py-4 border-b border-accent">
          <div className="flex items-center work gap-2 ">
            <IoLogoGameControllerB className="text-4xl bg-accent -rotate-12 rounded-full p-1 text-primary" />
            <p className="text-2xl font-bold">
              GAME <span className="text-primary">NSANITY</span>
            </p>
          </div>
        </nav>
      </Container>
    </header>
  );
}
