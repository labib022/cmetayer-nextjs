import RepairHero from "../../../components/main/services/repair/RepairHero";
import RepairDescription from "../../../components/main/services/repair/RepairDescription";
import OurRepairServices from "../../../components/main/services/repair/OurRepairServices";
import Clients from "../../../components/main/home/Clients";
import Faq from "../../../components/main/home/Faq";

export const metadata = {
  title: "Home Repair Services",
};

export default function RepairPage() {
  return (
    <>
      <RepairHero />
      <RepairDescription />
      <OurRepairServices />
      <Clients />
      <Faq />
    </>
  );
}