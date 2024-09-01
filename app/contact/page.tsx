import Container from "@/components/Container";
import ContactForm from "@/components/forms/ContactForm";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Contact() {
  const accessCode = process.env.CONTACT_ACCESSCODE;

  return (
    <div className="bg-neutral-300">
      <Hero content="CONTACT" image="/assets/hero/5.webp" />
      <Container>
        <div className="mt-32 pb-20 flex">
          <div className="w-1/2">
            <ContactForm accessCode={accessCode!} />
          </div>
          <div className="w-1/2 relative">
            <Image
              className="object-cover rounded-r-md"
              src={"/assets/hero/9.webp"}
              alt="A picture of Spider-man swinging in Marvel's Spider-man game"
              fill
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
