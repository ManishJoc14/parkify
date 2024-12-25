"use client";

import React, { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { useAuth } from "@/context/authContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { forgetPassword } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setEmail("");
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await forgetPassword(email);
    } catch (err) {
      setError((err as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
            disabled={isLoading}
          >
            <X size={20} />
          </button>

          <div className="p-8">
            <h2 className="text-2xl font-mont-semibold text-gray-800 mb-4 text-center">
              Forget Password
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <div className="my-2">
                  <p className="px-2 text-sm bg-white font-mont-medium text-gray-500 ">
                    Email
                  </p>
                </div>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="johndoe14@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary/90 font-mont-medium text-white py-2 rounded-lg hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Request Reset"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
