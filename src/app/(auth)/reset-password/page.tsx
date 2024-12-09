"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative">
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(true)} // never closing
          />
        )}
      </div>
    </div>
  );
}
