"use client"

import AccessProvider from "@/actions/accessProvider";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/redux/auth/authSlice";
import { PartyPopper } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  AccessProvider()
  const {role,user_name} = useSelector(({user} : any)=> user)

  return (
   <div>
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <h4 className="text-gray-500 text-sm">Welcome back, <span className="text-primary font-bold">{user_name}</span></h4>
      </div>
   </div>
  );
}
