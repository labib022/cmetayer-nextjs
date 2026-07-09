import "./globals.css";
import { Toaster } from "sonner";
import StoreProvider from "../lib/redux/StoreProvider";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export const metadata = {
  title: {
    default: "Cmetayer — Home Services",
    template: "%s | Cmetayer",
  },
  description: "Book trusted moving, cleaning, repair, and laundry services instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Toaster richColors position="top-right" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}