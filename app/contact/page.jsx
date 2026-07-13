import ContactHero from "../../components/main/contact/ContactHero";
import ContactForm from "../../components/main/contact/ContactForm";
import ContactInfo from "../../components/main/contact/ContactInfo";
import Faq from "../../components/main/home/Faq";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Easy Lift & Clean.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <Faq />
    </>
  );
}