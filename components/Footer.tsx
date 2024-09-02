import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-xs shadow-xl">
      <Container>
        <div className="flex items-center justify-center gap-1 border-accent py-8">
          <p className="text-center">
            Copyright &copy; GAME NSANITY {new Date().getFullYear()}, website
            developed and design by{" "}
            <Link
              className="text-primary underline"
              href={"https://pantheras.ca"}
            >
              Pantheras Digital
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
