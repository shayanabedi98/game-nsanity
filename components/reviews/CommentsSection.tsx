"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Comment from "./Comment";

type Props = {
  session: any;
  comments: {
    id: string;
    gameReviewId: string | null;
    userId: string;
    text: string;
    createdAt: Date;
    author: {
      name: string | null;
      id: string;
      image: string | null;
    };
  }[];
  signInUser:
    | {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
      }
    | null
    | undefined;
  gameReviewId: string;
};

export default function CommentSection({
  comments,
  session,
  gameReviewId,
  signInUser,
}: Props) {
  const [comment, setComment] = useState({
    text: "",
    userId: signInUser?.id,
    gameReviewId: gameReviewId,
  });
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setComment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignIn = () => {
    const currentPath = window.location.pathname + window.location.search;

    router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (session) {
      if (!comment.text) {
        toast.error("Missing comment field");
        return;
      }

      try {
        const res = await fetch(`/api/comment`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ comment }),
        });

        if (res.ok) {
          toast.success("Comment Posted");
          setComment((prev) => ({ ...prev, text: "" }));
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong, try again later");
      }
    }
  };

  return (
    <div className="register flex min-h-80 mx-auto w-full sm:w-96 flex-col items-center gap-2 rounded-sm border border-accent bg-bg px-4 py-2 text-secondary">
      <h2 className="w-full border-b border-accent py-2 text-center text-2xl font-bold">
        Comments
      </h2>
      {comments.length > 0 ? (
        <div className="flex w-full flex-col">
          {comments.map((c, index) => (
            <Comment
              id={c.id}
              commentUserId={c.userId}
              signInUserId={signInUser?.id}
              createdAt={c.createdAt}
              name={c.author.name || "Anonymous"}
              key={index}
              image={c.author.image || "/assets/avatar.png"}
              text={c.text}
            />
          ))}
        </div>
      ) : (
        <div>
          <span className="text-sm">No comments to show</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          maxLength={100}
          disabled={!session}
          autoComplete="off"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          name="text"
          className={`w-full ${session ? "cursor-text" : "cursor-not-allowed"}`}
          value={comment.text}
          type="text"
          placeholder={session ? "Your coment here..." : "Must be signed in"}
        />
        <div className="w-1/3">
          {session ? (
            <button
              type="submit"
              className={`btn3 text-sm`}
              style={{
                height: "35px",
              }}
            >
              Comment
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className={`btn3 text-sm`}
              style={{
                height: "35px",
              }}
            >
              Sign in
            </button>
          )}
        </div>
      </form>
      <div className="self-start text-sm">{comment.text.length}/100</div>
    </div>
  );
}
