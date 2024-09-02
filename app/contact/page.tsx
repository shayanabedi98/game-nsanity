import Container from "@/components/Container";
import ContactForm from "@/components/forms/ContactForm";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Contact() {
  const accessCode = process.env.CONTACT_ACCESSCODE;

  return (
    <div className="bg-neutral-300">
      <Hero content="CONTACT" image="/assets/hero/7.webp" />
      <Container>
        <div className="mt-32 flex flex-col-reverse pb-32 md:flex-row">
          <div className="md:w-1/2">
            <ContactForm accessCode={accessCode!} />
          </div>
          <div className="relative w-full max-md:h-80 md:w-1/2">
            <Image
              className="object-cover max-md:rounded-t-md md:rounded-r-md"
              src={"/assets/hero/9.webp"}
              alt="A picture of Spider-man swinging in Marvel's Spider-man game"
              fill
              quality={90}
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
