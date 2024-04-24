"use client"

import AccessProvider from "@/actions/accessProvider";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/redux/auth/authSlice";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  AccessProvider()

  return (
   <div>
      <div className="h-[500px] w-[200px] bg-fuchsia-800">

  </div>
      <div className="h-[500px] w-[200px] bg-green-800">

  </div>
   </div>
  );
}
