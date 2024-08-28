import { formatMongoDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  user: { image: string | null };
  review: {
    id: string;
    title: string;
    videoUrl: string;
    paragraphs: string[];
    rating: number;
    thumbnailUrl: {
      secure_url: string;
      public_id: string;
    };
    createdAt: Date;
    author: string;
    comments: {
      gameReviewId: string | null;
      text: string;
      userId: string;
    }[];
  };
};

export default function Review({ review, user }: Props) {
  return (
    <div className="flex flex-col gap-10 items-center bg-neutral-900 p-10 shadow-xl rounded-md">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-bold text-4xl text-primary">
          Here&apos; a Short Review of {review.title}
        </h1>
        <Image
          src={user.image || "/assets/avatar.png"}
          alt="Author profile picture"
          width={36}
          height={36}
          className="rounded-full border-2"
        />
        <p>
          Written by <span className="font-semibold">{review.author}</span>
        </p>
        <p>Published on {formatMongoDate(review.createdAt)}</p>
      </div>
      <div className="w-full h-[550px]">
        <iframe
          className="w-full h-full"
          src={review.videoUrl.replace("watch?v=", "embed/")}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex flex-col gap-5 leading-relaxed tracking-wide">
        {review.paragraphs
          .filter((_, _index) => review.paragraphs.length >= 7 ? _index < 3 : _index < 1 )
          .map((p, index) => (
            <p key={index}>{p}</p>
          ))}
      </div>
      <div className="relative w-full h-[500px]">
        <Image
          className="object-cover rounded-sm"
          src={review.thumbnailUrl.secure_url}
          alt={`A scenic screen shot from the game ${review.title}`}
          fill
        />
      </div>
      <div className="flex flex-col gap-5 leading-relaxed tracking-wide">
        {review.paragraphs
          .filter((_, _index) => review.paragraphs.length >= 7 ? _index >= 3 : _index >= 1 )
          .map((p, index) => (
            <p key={index}>{p}</p>
          ))}
      </div>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-2xl">{review.title}</p>
        <div className="flex items-center justify-center h-44 w-44 bg-primary text-5xl font-bold rounded-full shadow-lg border-2">
          {review.rating}
        </div>
      </div>
      <div>
        <p>
          Be sure to checkout the YouTube channel, where you can watch every
          review I have made.{" "}
          <Link
            className="text-primary"
            target="_blank"
            href={"https://www.youtube.com/@gamensanity"}
          >
            Watch on YouTube
          </Link>
        </p>
      </div>
    </div>
  );
}
