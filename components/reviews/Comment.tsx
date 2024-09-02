"use client";
import { formatMongoDate } from "@/utils/formatDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";

type Props = {
  image: string;
  text: string;
  name: string;
  signInUserId?: string;
  createdAt: Date;
  commentUserId: string;
  id: string;
};

export default function Comment({
  createdAt,
  image,
  text,
  name,
  signInUserId,
  commentUserId,
  id,
}: Props) {
  const [options, setOptions] = useState(false);
  const router = useRouter();

  const handleOptions = () => {
    setOptions(!options);
  };

  const handleDeleteComment = async (id: string) => {
    const confirmed = window.confirm("Delete this comment?");

    if (!confirmed) {
      setOptions(false);
    } else {
      try {
        const res = await fetch("/api/comment", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          setOptions(false);
          toast.success("Deleted Comment");
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong, try again later.");
      }
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-1 border-b-2 border-neutral-700 py-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={image}
            alt="User profile picture"
            width={30}
            height={30}
            className="rounded-full border-2"
          />
          <p className="font-bold text-neutral-300">{name}</p>
        </div>
        <div className="text-sm italic text-neutral-300 max-sm:text-xs">
          {formatMongoDate(createdAt)}
        </div>
      </div>
      <div className="break-words">
        <p className="">{text}</p>
      </div>
      {signInUserId == commentUserId && (
        <div>
          <div
            onClick={handleOptions}
            className="absolute -right-2 bottom-4 cursor-pointer text-3xl"
          >
            <CiMenuKebab />
          </div>
          {options && (
            <div
              onClick={() => handleDeleteComment(id)}
              className="absolute bottom-3 right-5 z-20 cursor-pointer select-none rounded-md bg-red-500 px-4 py-2 text-sm font-semibold transition hover:bg-red-500"
            >
              Delete Comment
            </div>
          )}
        </div>
      )}
    </div>
  );
}
