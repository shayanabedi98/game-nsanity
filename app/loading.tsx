import { BiLoaderAlt } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <BiLoaderAlt className="animate-spin text-5xl text-red-500" />
    </div>
  );
}
