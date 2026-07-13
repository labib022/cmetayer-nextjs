import MovingHero from "../../../components/main/services/moving/MovingHero";
import MovingDescription from "../../../components/main/services/moving/MovingDescription";
import OurMovingServices from "../../../components/main/services/moving/OurMovingServices";
import Clients from "../../../components/main/home/Clients";
import Faq from "../../../components/main/home/Faq";

export const metadata = {
  title: "Moving Services",
};

export default function MovingPage() {
  return (
    <>
      <MovingHero />
      <MovingDescription />
      <OurMovingServices />
      <Clients />
      <Faq />
    </>
  );
}