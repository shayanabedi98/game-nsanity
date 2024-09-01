import Image from "next/image";
import YoutubeStats from "./YoutubeStats";

export default function HomeHero() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen text-secondary">
      <Image
        priority
        className="object-cover opacity-[98%]"
        src={"/assets/hero/2.webp"}
        alt="Video game screenshot"
        fill
      />
      <div className="absolute flex py-11 flex-col gap-10 items-center justify-center w-full">
        <h1 className="text-center text-7xl font-extrabold rounded-sm">
          GAME <span className="text-secondary">NSANITY</span>
        </h1>
        <h2 className="flex items-center gap-4 text-4xl font-bold">
          THANK YOU FOR <YoutubeStats /> SUBSCRIBERS!
        </h2>
      </div>
    </div>
  );
}
