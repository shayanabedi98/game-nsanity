import Container from "@/components/Container";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import Image from "next/image";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        priority
        className="object-cover"
        src={"/assets/hero/8.webp"}
        alt="Video game screenshot of scenic view"
        fill
      />
      <div className="absolute w-full">
        <Container>
          <Suspense fallback={<div className="text-bg">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </Container>
      </div>
    </div>
  );
}
