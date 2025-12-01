import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Rewinding Pros - Motor Rewinding & Electrical Repair",
  description: "Motor rewinding, pump repair, fan repair, and electrical services."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
