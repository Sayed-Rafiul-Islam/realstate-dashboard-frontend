"use client"
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
  } from "@/components/ui/drawer"

import { usePathname, useRouter } from "next/navigation"

import { useEffect, useState } from "react";
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
import { UsersReducerProps } from "@/types";


interface NavbarToggleProps {
    className ?: React.HtmlHTMLAttributes<HTMLElement>,

}

const NavbarToggle : React.FC<NavbarToggleProps>= ({
    className,
}) => {

    AccessProvider()
    const {user_name,role} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer.user)

    const pathname = usePathname()
    const router = useRouter()
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        setOpen(false)
    },[pathname])


    return ( 
        <div>
             <Button onClick={()=>setOpen(true)} variant="outline" size="icon">
                    <MenuIcon /> 
            </Button>
            <Drawer open={open} direction="left" onClose={()=>setOpen(false)}>
            {/* <DrawerTrigger asChild>
                <Button  variant="outline" size="icon">
                    <MenuIcon /> 
                </Button>
            </DrawerTrigger> */}
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
        </div>
        
     );
}
 
export default NavbarToggle;
