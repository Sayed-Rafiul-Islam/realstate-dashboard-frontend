"use client"
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  import { CircleUser, LayoutDashboard, LayoutList, LockKeyhole, MessageCircle, Package, ReceiptText, User } from "lucide-react"


import { usePathname, useRouter } from "next/navigation"

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import AccessProvider from "@/actions/accessProvider";
import { useSelector } from "react-redux";
import AdminMenu from "./menus/admin-menu";
import OwnerMenu from "./menus/owner-menu";
import TenantMenu from "./menus/tenant-menu";
import MaintainerMenu from "./menus/maintainer-menu";
import logo from '@/images/logo.png'
import Image from "next/image";
import SignOut from "./signout";
import './navbar-toogle.css'

interface Menu {
    id : number,
    group : string[],
    label : string,
    href : string
}

interface NavbarToggleProps {
    className ?: React.HtmlHTMLAttributes<HTMLElement>,

}

const NavbarToggle : React.FC<NavbarToggleProps>= ({
    className,
}) => {

    AccessProvider()
    const {user_name,role} = useSelector((data : any) => data.user)

    const [menu,setMenu] = useState
    ([
        {
            id : 1,
            group : [],
            label : "Dashboard",
            href : "/",
            drop : false,
            icon : <LayoutDashboard size={20} />
        },
        {
            id : 2,
            group : [],
            label : "Packages",
            href : "/packages",
            drop : false,
            icon : <Package size={20} />
        },
        {
            id : 3,
            group : [],
            label : "All Orders",
            href : "/allorders",
            drop : false,
            icon : <LayoutList size={20} />
        },
        {
            id : 4,
            group : [],
            label : "Owner Packages",
            href : "/ownerpackages",
            drop : false,
            icon : <ReceiptText size={20} />
        },
        {
            id : 5,
            group : [],
            label : "Message",
            href : "/message",
            drop : false,
            icon : <MessageCircle size={20} />
        },
        {
            id : 6,
            group : [
                {
                    id : 61,
                    label : "Terms & Conditions",
                    href : "/terms"
                },
                {
                    id : 62,
                    label : "Privacy Policy",
                    href : "/privacy"
                },
                {
                    id : 63,
                    label : "Cookie Policy",
                    href : "/cookie"
                },
            ],
            label : "Message Policy",
            href : "",
            drop : false,
            icon : <LockKeyhole size={20} />
        },
        {
            id : 7,
            group : [],
            label : "Owner",
            href : "/owner",
            drop : false,
            icon : <User size={20} />
        },
        {
            id : 8,
            group : [
                {
                    id : 81,
                    label : "My Profile",
                    href : "/profile"
                },
                {
                    id : 82,
                    label : "Change Password",
                    href : "/changepassword"
                }
            ],
            label : "Profile",
            href : "",
            drop : false,
            icon : <CircleUser size={20} />
        },
    ])

    const pathname = usePathname()
    const router = useRouter()
    // const [open,setOpen] = useState(false)
    return ( 
        <Drawer direction="left">
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                    <MenuIcon /> 
                </Button>
            </DrawerTrigger>
            <DrawerContent className="rounded-tr-lg rounded-br-lg -left-2">
            {/* logo  */}
            <div className="overflow-scroll relative px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 my-5 logo">
                        <div className="relative h-[60px] w-[60px]">
                            <Image src={logo} fill alt="logo" />
                        </div>
                        <h1 className="text-4xl font-bold">FIND<span className="text-indigo-600">HOME</span></h1>
                    </div>
                    <div>
                        <SignOut />
                    </div>
                </div>
                {/* menu */}
                <div className="mx-3 flex flex-col gap-4">
                    {role === 'admin' && <AdminMenu />}
                    {role === 'owner' && <OwnerMenu />}
                    {role === 'tenant' && <TenantMenu />}
                    {role === 'maintainer' && <MaintainerMenu />}
                </div>
            </div>
            </DrawerContent>
            </Drawer>
     );
}
 
export default NavbarToggle;
