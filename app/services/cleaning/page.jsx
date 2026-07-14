import CleaningHero from "../../../components/main/services/cleaning/CleaningHero";
import CleaningAboutUs from "../../../components/main/services/cleaning/CleaningAboutUs";
import OurCleaningServices from "../../../components/main/services/cleaning/OurCleaningServices";
import Clients from "../../../components/main/home/Clients";
import Faq from "../../../components/main/home/Faq";

export const metadata = {
  title: "Cleaning Services",
};

export default function CleaningPage() {
  return (
    <>
      <CleaningHero />
      <CleaningAboutUs />
      <OurCleaningServices />
      <Clients />
      <Faq />
    </>
  );
}