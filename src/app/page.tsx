import HeroSection from "@/components/HeroSection";
import HotelSearch from "@/components/HotelSearch";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { createAllAction } from "@/server/action";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-blue-900">
      <div className="container mx-auto">
        <Topbar />
        <HeroSection />
        <div className="bg-yellow-600">
          <HotelSearch />
        </div>
      </div>
    </div>

  );
}
