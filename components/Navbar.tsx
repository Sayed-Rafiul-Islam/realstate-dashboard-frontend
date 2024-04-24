"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import './navbar.css'
import AdminMenu from "./menus/admin-menu";
import AccessProvider from "@/actions/accessProvider";
import OwnerMenu from "./menus/owner-menu";
import MaintainerMenu from "./menus/maintainer-menu";
import Image from "next/image";
import logo from '@/images/logo.png'
import TenantMenu from "./menus/tenant-menu";

const Navbar = () => {
    AccessProvider()
    const {user_name,role} = useSelector((data : any) => data.user)
    const path = usePathname()
   
    return ( 
        <div className="header hidden md:block">
            {/* logo  */}
            <div className="flex items-center gap-2 mb-10">
                <div className="relative h-[60px] w-[60px]">
                    <Image src={logo} fill alt="logo" />
                </div>
                <h1 className="text-4xl font-bold">FIND<span className="text-indigo-600">HOME</span></h1>
            </div>
            <div className="flex">
                <div className="nav-bar ">
                    <div className='nav-bar-inner'>
                        <div className="nav-links mt-10 px-5 flex flex-col gap-5 pb-[150px]">
                            

                            {/* menu */}
                            {role === 'admin' && <AdminMenu />}
                            {role === 'owner' && <OwnerMenu />}
                            {role === 'tenant' && <TenantMenu />}
                            {role === 'maintainer' && <MaintainerMenu />}
                        </div>
                    </div>
                </div>  
            </div>

            <div className="header-psudo hidden md:flex"/>
        </div>
     );
}
 
export default Navbar;