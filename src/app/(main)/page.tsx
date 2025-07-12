import Featured from "@/components/Featured";
import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MailList from "@/components/MailList";
// import Navbar from "@/components/Navbar";
import PropertyList from "@/components/PropertyList";

export default function HomePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <div className="homeContainer mt-12 flex flex-col items-center gap-8 px-4 sm:px-8 lg:px-16">
        <Featured />
        <h1 className="homeTitle text-2xl sm:text-3xl lg:text-4xl w-full text-center font-bold mt-8">Browse by Property Type</h1>
        <PropertyList />
        <h1 className="homeTitle text-2xl m:text-3xl lg:text-4xl w-full text-center font-bold mt-8">Homes Guests Love</h1>
        <FeaturedProperties />
        <MailList />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
