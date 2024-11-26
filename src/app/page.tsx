import HeroSection from "@/components/HeroSection";
import HotelSearch from "@/components/HotelSearch";
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { createAllAction } from "@/server/action";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
}
