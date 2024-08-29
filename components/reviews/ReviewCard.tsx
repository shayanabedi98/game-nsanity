"use client";

import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  adminControls: boolean;
  review: {
    id: string;
    title: string;
    rating: number;
    videoUrl: string;
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
    <div className="w-full gap-4 h-64 border-b-2 shadow-lg bg-neutral-900 border-accent flex items-center justify-between">
      <div className="w-full flex-col py-4 px-4 gap-4 flex justify-between h-full">
        <h1 className="text-3xl font-extrabold">{review.title} Review</h1>
        <p className="break-all">{truncateText(review.paragraphs[0])}</p>
        <p>
          Written by <span className="font-bold">{review.author}</span>
        </p>
        <div className="flex justify-between">
          <Link
            className="font-semibold btn1"
            href={`/reviews/${review.title}`}
          >
            Read
          </Link>
          <div className="w-full flex justify-center">
            {adminControls && (
              <div className="flex gap-4 text-xl items-center">
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
      <div className="flex items-center justify-center relative w-full h-full aspect-square">
        <Image
          priority
          src={review.thumbnailUrl.secure_url}
          className="object-cover w-full h-full"
          alt=""
          width={800}
          height={800}
        />
        <div className="absolute font-bold text-4xl bg-primary h-16 w-16 flex items-center justify-center rounded-sm bg-opacity-85 border">
          {review.rating}
        </div>
      </div>
    </div>
  );
}
