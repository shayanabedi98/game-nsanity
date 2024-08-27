"use client";
import { FaTrashAlt } from "react-icons/fa";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React, { useState, useEffect } from "react";

type Image = {
  secure_url: string;
  public_id: string;
};

type Props = {
  user: {
    name: string | null;
  };
};

type Review = {
  title: string;
  author: string;
  paragraphs: string[];
  rating: number | null;
  thumbnailUrl: { secure_url: string; public_id: string };
  images?: string[];
};

export default function CreateReviewForm({ user }: Props) {
  const [imageUrls, setImageUrls] = useState<Image[]>([]);
  const [review, setReview] = useState<Review>({
    title: "",
    author: user.name || "",
    paragraphs: [""],
    rating: null,
    thumbnailUrl: {
      secure_url: "",
      public_id: "",
    },
    images: [],
  });

  useEffect(() => {
    console.log("Current image URLs:", imageUrls);
    // console.log(review);
    console.log(review.thumbnailUrl);
  }, [imageUrls, review]);

  const handleThumbnailUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;
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
    }
  };

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;
    if (info && "secure_url" in info && "public_id" in info) {
      setImageUrls((prevUrls) => [
        ...prevUrls,
        {
          secure_url: info.secure_url as string,
          public_id: info.public_id as string,
        },
      ]);
    }
  };

  const removeImage = async (e: React.FormEvent, publicId: string) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });
    } catch (error) {
      alert("whoops");
    }
  };

  const handleChange = (name: string, value: string) => {
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const addParagraph = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center px-8 py-4 sm:w-96 w-full mx-auto justify-center bg-neutral-900 rounded-md shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="register w-full flex flex-col gap-2 items-center justify-center"
      >
        <p className="text-xl font-semibold">Create Review</p>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="title">Title</label>
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
                autoComplete="off"
                required
                value={review.paragraphs[index]}
                onChange={(e) => {
                  handleParagraphs(index, e.target.value);
                }}
                name="paragraphs"
              />
            </div>
          ))}
        </div>
        <button onClick={addParagraph} className="btn2">
          add
        </button>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="rating">Rating</label>
          <input
            value={review.rating || 0}
            autoComplete="off"
            required
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            type="number"
            min={0}
            max={10}
            step={0.1}
            name="title"
          />
        </div>
        <div className="w-full flex flex-col">
          <span>Thumbnail</span>
          {review.thumbnailUrl.secure_url && (
            <div>{review.thumbnailUrl.secure_url}</div>
          )}
          {!review.thumbnailUrl.secure_url && (
            <CldUploadButton
              className="btn2"
              uploadPreset="wkmh2srv"
              onSuccess={handleThumbnailUpload}
            />
          )}
          {review.thumbnailUrl.secure_url && (
            <button
              className="btn2 "
              onClick={(e) => removeImage(e, review.thumbnailUrl.public_id)}
            >
              Remove Thumbnail
            </button>
          )}

          {/* {imageUrls.length > 0 &&
            imageUrls.map((img) => (
              <button
                key={img.public_id}
                className="btn2"
                onClick={(e) => removeImage(e, img.public_id)}
              >
                Remove {img.secure_url}
              </button>
            ))} */}
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
