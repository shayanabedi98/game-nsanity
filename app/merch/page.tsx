import Image from "next/image";
import Link from "next/link";

export default function Merch() {
  return (
    <div className="relative flex items-center justify-center h-screen w-full">
      <Image
        priority
        className="object-cover"
        src={"/assets/hero/nsanity-banner.webp"}
        alt="A man wearing a sweater by nsanity with a grungy streetwear design"
        fill
      />
      <div className="absolute flex flex-col gap-16">
        <Image
          priority
          src={"/assets/hero/nsanity-logo.webp"}
          height={400}
          width={700}
          alt="Nsanity clothing line logo"
        />
        <div className="w-40 mx-auto">
          <Link
            target="_blank"
            href={"https://www.etsy.com/shop/NSANITYShop"}
            className="px-16 py-4 rounded-md font-bold bg-red-500 border-2 border-secondary text-lg transition lg:hover:bg-accent"
          >
            SHOP
          </Link>
        </div>
      </div>
    </div>
  );
}
