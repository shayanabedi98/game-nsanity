import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="text-xs">
      <Container>
        <div className="flex items-center justify-center py-8 border-t border-accent">
          Copyright &copy; GAME NSANITY {new Date().getFullYear()}, website developed and design by{" "}
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
