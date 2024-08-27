import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="text-xs bg-neutral-900 shadow-xl">
      <Container>
        <div className="flex items-center justify-center py-8 gap-1 border-accent">
          Copyright &copy; GAME NSANITY {new Date().getFullYear()}, website
          developed and design by{" "}
          <Link
            className="underline text-primary"
            href={"https://pantheras.ca"}
          >
            Pantheras Digital
          </Link>
        </div>
      </Container>
    </footer>
  );
}
