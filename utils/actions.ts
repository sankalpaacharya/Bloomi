"use server";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const signInWithGoogle = async () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const redirectTo = new URL("/auth/callback", siteUrl).toString();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });
  if (error) {
    console.log(error);
  }
  if (data.url) {
    redirect(data.url);
  }
};
