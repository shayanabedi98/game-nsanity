"use client";

import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatMongoDate } from "@/utils/formatDate";
import Container from "../Container";

type Props = {
  adminControls: boolean;
  review: {
    id: string;
    title: string;
    rating: number;
    videoUrl: string;
    createdAt: Date;
    thumbnailUrl: {
      secure_url: string;
      public_id: string;
    };
    author: string;
    paragraphs: string[];
  };
};

export default function ReviewCard({ review, adminControls }: Props) {
  const router = useRouter();

  const deleteReview = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this review?");

    if (confirmed) {
      try {
        const res = await fetch("/api/review/", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          toast.success("Review deleted");
          router.refresh();
        }
      } catch (error) {
        toast.success("Something went wrong.");
      }
    }
  };

  return (
    <div className="shadow-custom open-sans flex w-full flex-col items-center justify-between gap-4 rounded-md bg-white text-bg sm:h-[450px] sm:flex-row lg:h-[380px] xl:h-[320px]">
      <div className="flex h-full w-full flex-col justify-between gap-4 px-4 py-4">
        <h1 className="text-3xl font-bold">{review.title} Review</h1>
        <p className="break-words text-neutral-800">
          {truncateText(review.paragraphs[0])}
        </p>
        <p>
          Written by <span className="font-bold">{review.author}</span>
        </p>
        <p className="text-sm italic">
          Published on {formatMongoDate(review.createdAt)}
        </p>
        <div className="flex justify-between">
          <Link
            className="btn3 text-xl font-semibold"
            href={`/reviews/${review.title}`}
          >
            Read
          </Link>
          <div className="flex w-full justify-center">
            {adminControls && (
              <div className="flex items-center gap-4 text-xl">
                <Link href={`/admin/edit/${review.title}`}>
                  <FaEdit />
                </Link>
                <button onClick={() => deleteReview(review.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative flex aspect-square h-full w-full items-center justify-center">
        <Image
          priority
          src={review.thumbnailUrl.secure_url}
          className="h-full w-full max-sm:rounded-b-md sm:rounded-r-md object-cover"
          alt=""
          quality={85}
          width={800}
          height={800}
        />
        <div className="absolute flex h-16 w-16 items-center justify-center rounded-sm border bg-red-500 bg-opacity-85 text-4xl font-bold text-secondary">
          {review.rating}
        </div>
      </div>
    </div>
  );
}
