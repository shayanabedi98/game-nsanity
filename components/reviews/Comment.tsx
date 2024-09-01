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
        toast.error("Something went wrong, try again later.")
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-1 py-2 border-b-2 border-neutral-700 w-full">
      <div className="flex gap-2 items-center justify-between">
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
        <div className="text-sm italic text-neutral-300">
          {formatMongoDate(createdAt)}
        </div>
      </div>
      <div className="break-words">
        <p className="pl-1">{text}</p>
      </div>
      {signInUserId == commentUserId && (
        <div>
          <div
            onClick={handleOptions}
            className="cursor-pointer absolute -right-2 text-3xl bottom-4"
          >
            <CiMenuKebab />
          </div>
          {options && (
            <div
              onClick={() => handleDeleteComment(id)}
              className="cursor-pointer hover:bg-red-500 transition text-sm font-semibold absolute right-5 select-none bg-red-500 rounded-md z-20 bottom-3 px-4 py-2"
            >
              Delete Comment
            </div>
          )}
        </div>
      )}
    </div>
  );
}
