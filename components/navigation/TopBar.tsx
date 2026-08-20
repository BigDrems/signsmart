"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function TopBar() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{
    display_name: string;
    avatar_url: string | null;
  } | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile(data);
        } else {
          // Fallback from user metadata
          setProfile({
            display_name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "Student",
            avatar_url:
              user.user_metadata?.avatar_url ||
              user.user_metadata?.picture ||
              null,
          });
        }
      }
    };

    getUser();
  }, []);

  const displayName = profile?.display_name || "Student";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 sm:px-6">
      <div>
        <h2 className="text-sm font-medium text-gray-500">Welcome back,</h2>
        <p className="text-base font-semibold text-gray-900">{displayName} 👋</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{displayName}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="h-9 w-9 rounded-full ring-2 ring-blue-100 object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold ring-2 ring-blue-100">
            {initials}
          </div>
        )}
      </div>
    </header>
  );
}
