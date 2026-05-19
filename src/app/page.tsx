import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import Features from "../components/sections/HomePage/features";
import Pricing from "../components/sections/HomePage/Pricing";


export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Features/>
      <Pricing/>
      <Footer/>
    </div>
  );
}
