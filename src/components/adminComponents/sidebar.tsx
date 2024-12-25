"use client";

import Link from "next/link";
import NavLinks from "@/components/adminComponents/navlinks";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function SideNav() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full sticky flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex flex-col justify-start rounded-md bg-primary pt-6 px-4 pb-4"
        href="/"
      >
        <div className="w-32 text-xl sm:text-3xl pb-1 text-white font-mont-semibold md:w-40 ">
          Parkify
        </div>
        <span className="text-md text-white/80">{user?.fullName}</span>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <div
            onClick={logout}
            className="flex h-[48px] cursor-pointer w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-mont-medium hover:bg-primary/10 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <button type="submit" className="flex justify-center gap-2">
              <LogOutIcon />
              SignOut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
