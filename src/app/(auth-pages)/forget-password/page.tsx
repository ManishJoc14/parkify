"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsAuthModalOpen(false);
  };

  if (!isAuthModalOpen) {
    router.push("/");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <div className="relative">
        {isAuthModalOpen && (
          <AuthModal isOpen={isAuthModalOpen} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}
