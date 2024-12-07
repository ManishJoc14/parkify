"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setEmail("");
      setPassword("");
      setName("");
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        // await signUpWithEmail(email, password, name);
      } else {
        // await signInWithEmail(email, password);
      }
      onClose();
    } catch (err) {
      setError((err as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      // await signInWithGoogle();
      onClose();
    } catch (err) {
      setError((err as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForget = async () => {
    setError("");
    setIsLoading(true);

    try {
      // await forgetPassword(email);
      router.push("/reset-password");
      onClose();
    } catch (err) {
      setError((err as { message: string }).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className=" flex flex-col gap-1">
            {isSignUp && (
              <>
                <div className="pt-2">
                  <p className="px-2 text-sm bg-white text-gray-500 ">Name</p>
                </div>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    required={isSignUp}
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            <div className="pt-4">
              <p className="px-2 text-sm bg-white text-gray-500 ">Email</p>
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

            {/* FIXME - Forget Passowrd */}
            <div className="pt-4">
              <div className="flex justify-between text-sm">
                <p
                  className="px-2 bg-white text-gray-500"
                  onClick={handleForget}
                >
                  Password
                </p>

                {!isSignUp && (
                  <p
                    className="px-2 bg-white cursor-pointer underline hover:text-primary transition-all text-gray-500 "
                    onClick={handleForget}
                  >
                    Forgot Password?
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Johndoe@143"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 mt-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            {isLoading ? "Please wait..." : "Continue with Google"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
