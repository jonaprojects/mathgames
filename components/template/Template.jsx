import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Inter, Open_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export default function Template(props) {
  return (
    <div className={`${openSans.className} min-h-screen relative`}>
      <Navbar />
      <div className="mb-12">{props.children}</div>
      <Footer />
    </div>
  );
}
