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
      />
      <h1 className="absolute text-center text-7xl font-bold border-2 bg-black text-white bg-opacity-40 rounded-sm shadow-md shadow-neutral-800 px-20 py-10">
        {content}
      </h1>
    </div>
  );
}
