export const metadata = {
  title: "IdeaVault | Home",
};

import Banner from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import NewIdeasPage from "@/components/NewIdeasPage";
import TrendingIdeas from "@/components/TrendingIdeas";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
     <Banner/>
       <TrendingIdeas/>
       <HowItWorks/>
      <NewIdeasPage/>
    </div>
  );
}
