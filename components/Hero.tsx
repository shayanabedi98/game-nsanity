import Image from "next/image";

export default function Hero({
  content,
  image,
}: {
  content: string;
  image: string;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen">
      <Image
        priority
        className="object-cover"
        src={image}
        alt="Video game screenshot"
        fill
        quality={90}
      />
      <h1 className="absolute text-center text-4xl font-bold sm:text-7xl">
        {content}
      </h1>
    </div>
  );
}