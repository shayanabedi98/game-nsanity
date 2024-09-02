import Container from "@/components/Container";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import Image from "next/image";

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        priority
        className="object-cover"
        src={"/assets/hero/8.webp"}
        alt="Video game screenshot of scenic view"
        fill
      />
      <div className="absolute w-full">
        <Container>
          <ResetPasswordForm />
        </Container>
      </div>
    </div>
  );
}
