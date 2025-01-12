"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { User } from "@/types/definitions";
import { getRoute } from "@/lib/utils";

export default function HeaderAuth({ user }: { user: User | null }) {
  const { logout } = useAuth();

  return user ? (
    <div className="flex items-center gap-4">
      <Link href={getRoute(user?.roles[0])}>
        Hey, {user.firstName} {user.middleName} {user.lastName}!
      </Link>
      <Button
        type="submit"
        variant={"outline"}
        className="font-mont-semibold text-black px-4 py-3"
        onClick={logout}
      >
        Sign out
      </Button>
    </div>
  ) : (
    <Button
      asChild
      size="sm"
      variant={"default"}
      className="font-mont-semibold text-white px-4 py-3"
    >
      <Link href="/login">Sign in</Link>
    </Button>
  );
}
