import About from "@/components/home/About";
import HomeHero from "@/components/home/HomeHero";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <HomeHero />
      <div className="bg-accent relative py-10 flex min-h-screen w-full items-center justify-center">
        <Image
          src={"/assets/hero/11.webp"}
          alt=""
          fill
          className="max-md:hidden min-h-screen object-cover"
        />
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <About />
        </div>
      </div>
    </div>
  );
}
