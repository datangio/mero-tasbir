"use client";
import { Header } from "@repo/ui/index";

export default function Home() {
  const handleCheckAvailability = () => {
    // Handle check availability action
    console.log("Check availability clicked");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        logo="Mero Tasbir"
        onCheckAvailability={handleCheckAvailability}
      />
    </div>
  );
}
