import LaundryHero from "../../../components/main/services/laundry/LaundryHero";
import LaundryAboutUs from "../../../components/main/services/laundry/LaundryAboutUs";
import OurLaundryServices from "../../../components/main/services/laundry/OurLaundryServices";
import Clients from "../../../components/main/home/Clients"
import Faq from "../../../components/main/home/Faq";

export const metadata = {
  title: "Laundry Services",
  description: "Convenient pickup-and-delivery laundry services. Book online and get your laundry done hassle-free.",
};

export default function LaundryPage() {
  return (
    <>
      <LaundryHero />
      <LaundryAboutUs />
      <OurLaundryServices />
      <Clients />
      <Faq />
    </>
  );
}