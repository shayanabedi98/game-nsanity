"use client";
import { FaTrashAlt } from "react-icons/fa";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Image = {
  secure_url: string;
  public_id: string;
};

type Props = {
  user: {
    name: string | null;
  };
  cloudinaryPreset: string;
};

type Review = {
  title: string;
  author: string;
  paragraphs: string[];
  rating: number;
  thumbnailUrl: { secure_url: string; public_id: string };
  images?: string[];
  videoUrl: string;
};

export default function CreateReviewForm({ user, cloudinaryPreset }: Props) {
  // const [imageUrls, setImageUrls] = useState<Image[]>([]);
  const [showCloudinary, setShowCloudinary] = useState(true);
  const [review, setReview] = useState<Review>({
    title: "",
    author: user.name || "",
    paragraphs: [""],
    rating: 0,
    thumbnailUrl: {
      secure_url: "",
      public_id: "",
    },
    videoUrl: "",
    // images: [],
  });
  const router = useRouter();

  useEffect(() => {
    return () => {
      // Ensure scroll is re-enabled
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleThumbnailUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;
    if (Array.isArray(info) && info.length > 1) {
      toast.error("Please upload only one image.");
      return;
    }
    if ("secure_url" in info && "public_id" in info) {
      setReview((prev) => {
        return {
          ...prev,
          thumbnailUrl: {
            secure_url: info.secure_url as string,
            public_id: info.public_id as string,
          },
        };
      });
      setShowCloudinary(false);
    }
    console.log(info);
  };

  // const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
  //   const info = result.info as object;
  //   if (info && "secure_url" in info && "public_id" in info) {
  //     setImageUrls((prevUrls) => [
  //       ...prevUrls,
  //       {
  //         secure_url: info.secure_url as string,
  //         public_id: info.public_id as string,
  //       },
  //     ]);
  //   }
  // };

  const removeImage = async (
    e: React.FormEvent,
    publicId: string,
    isThumbnail: boolean
  ) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        if (isThumbnail) {
          setReview((prev) => ({
            ...prev,
            thumbnailUrl: { secure_url: "", public_id: "" },
          }));
        }
      }
    } catch (error) {
      alert("whoops");
    }
  };

  const handleChange = (name: string, value: string) => {
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const addParagraph = (e: React.FormEvent) => {
    e.preventDefault();
    setReview((prev) => {
      const newParagraphs = [...prev.paragraphs];
      newParagraphs.push("");
      return { ...prev, paragraphs: newParagraphs };
    });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = review.paragraphs.filter((_, i) => i !== index);
    setReview((prev) => ({ ...prev, paragraphs: newParagraphs }));
  };

  const handleParagraphs = (index: number, value: string) => {
    setReview((prev) => {
      const newParagraphs = [...prev.paragraphs];
      newParagraphs[index] = value;
      return { ...prev, paragraphs: newParagraphs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !review.title ||
      !review.thumbnailUrl ||
      review.paragraphs.some((p) => p.trim() === "")
    ) {
      toast.error("Missing fields");
      return;
    }

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ review }),
      });
      if (res.ok) {
        toast.success("Created Review");
        router.push("/reviews");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center px-8 py-4 sm:w-[450px] w-full mx-auto justify-center bg-neutral-900 rounded-md shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="register w-full flex flex-col gap-2 items-center justify-center"
      >
        <p className="text-xl font-semibold">Create Review</p>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="title">Game Title</label>
          <input
            value={review.title}
            autoComplete="off"
            required
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            type="text"
            name="title"
          />
        </div>
        <div className="w-full flex flex-col">
          <span>Thumbnail</span>
          <div className="flex items-center justify-center">
            <Image
              className="w-full object-cover"
              src={
                review.thumbnailUrl.secure_url ||
                "/assets/thumbnail-default.jpg"
              }
              height={300}
              width={300}
              alt="review thumbnail"
            />
          </div>
          <CldUploadButton
            className={showCloudinary ? "btn2" : "hidden"}
            uploadPreset={cloudinaryPreset}
            onSuccess={handleThumbnailUpload}
            options={{
              // sources: ["local"],
              multiple: false,
              maxFiles: 1,
              clientAllowedFormats: ["jpg", "jpeg", "png"],
              maxFileSize: 4000000, //4.0MB
            }}
          />
          {review.thumbnailUrl.secure_url && !showCloudinary && (
            <button
              className="btn2 "
              onClick={(e) => {
                removeImage(e, review.thumbnailUrl.public_id, true);
                setShowCloudinary(true);
              }}
            >
              Remove Thumbnail
            </button>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="paragraphs">Paragraphs:</label>
          {review.paragraphs.map((p, index) => (
            <div className="flex w-full flex-col gap-1" key={index}>
              <div className="flex justify-between">
                <span>{index + 1}</span>
                {index > 0 && (
                  <button onClick={() => removeParagraph(index)}>
                    <FaTrashAlt />
                  </button>
                )}
              </div>
              <textarea
                className="min-h-40 text-sm"
                autoComplete="off"
                required
                value={review.paragraphs[index]}
                onChange={(e) => {
                  handleParagraphs(index, e.target.value);
                }}
                name="paragraphs"
              />
              <p className="text-sm">
                {review.paragraphs[index].length} characters
              </p>
            </div>
          ))}
        </div>
        <button onClick={addParagraph} className="btn2">
          Add Paragraph
        </button>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="rating">Rating</label>
          <input
            value={review.rating}
            autoComplete="off"
            required
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            type="number"
            min={0}
            max={10}
            step={0.1}
            name="rating"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="videoUrl">Video URL</label>
          <input
            value={review.videoUrl}
            autoComplete="off"
            placeholder="https://youtube.com/..."
            required
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            type="text"
            name="videoUrl"
          />
        </div>
        <div className="mt-4 pb-4 w-full flex items-center justify-center border-accent">
          <button className="btn1" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
