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
        <div className="pb-32 mt-32 flex flex-col-reverse md:flex-row">
          <div className="md:w-1/2">
            <ContactForm accessCode={accessCode!} />
          </div>
          <div className="relative h-80 w-full md:w-1/2">
            <Image
              className="max-md:rounded-t-md md:rounded-r-md object-cover"
              src={"/assets/hero/9.webp"}
              alt="A picture of Spider-man swinging in Marvel's Spider-man game"
              fill
              quality={85}
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
