import Container from "@/components/Container";
import About from "@/components/home/About";
import HomeHero from "@/components/home/HomeHero";
import YoutubeStats from "@/components/home/YoutubeStats";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <HomeHero />
      <div className="relative flex items-center justify-center w-full h-screen">
        <Image
          src={"/assets/hero/11.webp"}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute">
          <About />
        </div>
      </div>
    </div>
  );
}
