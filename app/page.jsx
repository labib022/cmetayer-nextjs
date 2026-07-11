
import Hero from "../components/main/home/Hero";
import OurServices from "../components/main/home/OurServices";
import OurValues from "../components/main/home/OurValues";
import Clients from "../components/main/home/Clients";
import Faq from "../components/main/home/Faq";
import Quote from "../components/main/home/Quote";

export const metadata = {
  title: "Home",
  description: "Book trusted home services instantly.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurServices />
      <OurValues />
      <Clients />
      <Faq />
      <Quote />
    </>
  );
}