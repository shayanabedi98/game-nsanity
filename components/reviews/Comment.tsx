import Image from "next/image";

type Props = {
  image: string;
  text: string;
  name: string;
};

export default function Comment({ image, text, name }: Props) {
  return (
    <div className="flex flex-col gap-1 py-2 border-b-2 border-neutral-700 w-full">
      <div className="flex gap-2 items-center">
        <Image
          src={image}
          alt="User profile picture"
          width={30}
          height={30}
          className="rounded-full border-2"
        />
        <p className="text-neutral-300 font-bold">{name}</p>
      </div>
      <div className="break-words">
        <p className="pl-1">{text}</p>
      </div>
    </div>
  );
}
