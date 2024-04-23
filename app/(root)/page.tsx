"use client"

import AccessProvider from "@/actions/accessProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Home() {

  const path = usePathname()
  AccessProvider(path)


  return (
   <div>
    <Button variant='secondary'>CLick</Button>
   </div>
  );
}
