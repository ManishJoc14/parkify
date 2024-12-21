"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";

export default function HeaderAuth() {
  const { user, logout } = useAuth();

  console.log(user);

  return user ? (
    <div className="flex items-center gap-4">
      <Link href={`/${user.roles[0]}dashboard`}>
        Hey, {user.firstName} {user.middleName} {user.lastName}!
      </Link>
      <Button type="submit" variant={"outline"} onClick={logout}>
        Sign out
      </Button>
    </div>
  ) : (
    <Button asChild size="sm" variant={"default"} className="font-mont-bold text-white px-4 py-3">
      <Link href="/login">Sign in</Link>
    </Button>
  );
}
