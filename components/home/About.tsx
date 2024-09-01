import Image from "next/image";
import Container from "../Container";
import Link from "next/link";

export default function About() {
  return (
    <Container>
      <div className="flex min-h-[480px] open-sans">
        <div className="bg-bg flex flex-col gap-6 rounded-l-md w-1/2 px-8 py-4">
          <h2 className="text-3xl font-bold">ABOUT ME</h2>
          <p className="tracking-wide leading-relaxed">
            Hey there, welcome to my website. GAME NSANITY is a growing platform for short and sweet video game reviews. I know what it can be like trying to watch a 45 minute documentary to see if Star Wars: Outlaws is a trash game or not. I try to keep the duration of all my videos on YouTube to 8 minutes or less. I love games and I review them as an enjoyer, rather than a group of biased journalists that give everything a 7 because they&apos;re not even sure how to review and play games as intended. I love open-world, action RPGs, or even anything in the survival genre.
          </p>
          <p>If you wanna contact me, feel free to send me an email</p>
          <Link href={"/contact"} className="btn3">
            Contact
          </Link>
        </div>
        <div className="relative w-1/2">
          <Image
            className="object-cover rounded-r-md"
            priority
            src={"/assets/hero/10.webp"}
            alt="A screenshot of the game Elden Ring"
            fill
          />
        </div>
      </div>
    </Container>
  );
}
