"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  const { token } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    async function Verify() {
      try {
        await axiosInstance.post("/public/user-app/users/verify", {
          token: token as string,
        });
        toast.success("Account verified successfully");
        router.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
    Verify();
  }, [token, router]);

  return null;
}
