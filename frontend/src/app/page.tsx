import HomeScreen from "@/screens/home/HomeScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LIV - Your Personal Longevity Coach",
  description: "Daily longevity coaching. Grounded in science. Tailored to your biology.",
  openGraph: {
    title: "LIV - Your Personal Longevity Coach",
    description: "Daily longevity coaching. Grounded in science. Tailored to your biology.",
    type: "website",
  },
};

export default function Home() {
  return <HomeScreen />;
}
