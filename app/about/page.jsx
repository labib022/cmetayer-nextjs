import AboutHero from "../../components/main/about/AboutHero";
import AboutVideo from "../../components/main/about/AboutVideo";
import OurFoundation from "../../components/main/about/OurFoundation";
import OurTeam from "../../components/main/about/OurTeam";
import Faq from "../../components/main/home/Faq";

export const metadata = {
  title: "About",
  description: "Learn more about Easy Lift & Clean.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurFoundation />
      <AboutVideo />
      <OurTeam />
      <Faq />
    </>
  );
}