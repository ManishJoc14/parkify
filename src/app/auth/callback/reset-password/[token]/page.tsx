"use client";

import axiosInstance from "@/lib/axiosInstance";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  const { token } = useParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) return;
    async function Verify() {
      try {
        await axiosInstance.post("/public/user-app/users/verify", {
          token: token as string,
        });
        toast.success("Account verified successfully");
      } catch (err) {
        console.log(err);
      }
    }
    Verify();
  }, [token, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    try {
      setIsLoading(true);
      await axiosInstance.post("/public/user-app/users/forget-password", {
        token: token as string,
        newPassword,
        confirmPassword,
      });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function onClose() {
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <div className="relative">
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
              <h2 className="text-2xl font-mont-bold text-gray-800 mb-4 text-center">
                Forget Password
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="relative">
                  <div className="my-2">
                    <p className="px-2 text-sm  font-mont-medium bg-white text-gray-500 ">
                      New Password
                    </p>
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      required
                      disabled={isLoading}
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <div className="my-2 pt-2">
                    <p className="px-2 text-sm font-mont-medium bg-white text-gray-500 ">
                      Confirm Password
                    </p>
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      required
                      disabled={isLoading}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary/90 text-white py-2 rounded-lg font-mont-medium hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
