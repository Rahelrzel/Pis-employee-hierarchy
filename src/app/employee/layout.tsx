"use client";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    if (!user) {
      router.push(`/`);
    }
  }, [user]);
  return <>{children}</>;
}
