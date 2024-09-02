"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function HomeHero() {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const res = await fetch("/api/youtube-stats");
        const data = await res.json();
        setSubscriberCount(Number(data.subscriberCount));
      } catch (error) {
        setSubscriberCount(null);
      }
    }
    fetchSubs();
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center text-secondary">
      <Image
        priority
        className="object-cover object-[-200px] opacity-[98%] md:object-center"
        src={"/assets/hero/3.webp"}
        alt="Video game screenshot"
        fill
        quality={100}
      />
      <div className="absolute flex w-full flex-col items-center justify-center gap-10 rounded-sm px-4 py-11 lg:w-[750px]">
        <h1 className="text-center text-4xl font-bold sm:text-7xl">
          GAME <span className="text-secondary">NSANITY</span>
        </h1>
        {subscriberCount ? (
          <h2 className="items-center gap-4 text-center text-xl font-bold sm:text-4xl">
            THANK YOU FOR{" "}
            <span className="text-red-500">{subscriberCount}</span> SUBSCRIBERS!
          </h2>
        ) : (
          <AiOutlineLoading3Quarters className="relative animate-spin text-4xl text-red-500" />
        )}

        <div className="flex w-36 md:flex-row">
          {/* <Link
            target="_blank"
            href={"https://www.youtube.com/@gamensanity"}
            className="btn3"
          >
            YouTube
          </Link> */}
          <Link href={"/reviews"} className="btn2">
            Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
