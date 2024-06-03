"use client"

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import './navbar.css'
import AdminMenu from "./menus/admin-menu";
import AccessProvider from "@/actions/accessProvider";
import OwnerMenu from "./menus/owner-menu";
import MaintainerMenu from "./menus/maintainer-menu";
import Image from "next/image";
import logo_expanded from '@/images/logo_expanded.png'
import logo from '@/images/logo.png'
import TenantMenu from "./menus/tenant-menu";
import { UsersReducerProps } from "@/types";
import OwnerMenuEx from "./menus/owner-menu-ex";
import AdminMenuEx from "./menus/admin-menu-ex";
import TenantMenuEx from "./menus/tenant-menu-ex";
import MaintainerMenuEx from "./menus/maintainer-menu-ex";

interface NavbarProps {
    expand : boolean
}

const Navbar : React.FC<NavbarProps> = ({expand}) => {
    AccessProvider()
    const {email,role} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer.user)
    const path = usePathname()
   
    return ( 
        <div className={`${expand ? "header" : "header-1" } hidden md:block`}>
            {/* logo  */}
            <div className="flex justify-between items-center gap-2">
                
                <div className={`${expand ? "h-[60px]" : 'h-[40px] ml-1'} relative  w-5/6`}>
                    <Image src={expand ? logo_expanded : logo} fill alt="logo" />
                </div>
            </div>
            <div className="flex">
                <div className={expand ? "nav-bar" : "nav-bar-1"}>
                    <div className={expand ? "nav-bar-inner" : "nav-bar-inner-1"}>
                        <div className="">
                            

                            {/* menu */}
                            {
                                expand ? 
                                <div className="nav-links px-5 flex flex-col gap-2 pb-[150px]">
                                    {role === 'admin' && <AdminMenuEx />}
                                    {role === 'owner' && <OwnerMenuEx />}
                                    {role === 'tenant' && <TenantMenuEx />}
                                    {role === 'maintainer' && <MaintainerMenuEx />}
                                </div>
                                :
                                <div className="nav-links items-center flex flex-col justify-center gap-2 pb-[150px]">
                                    {role === 'admin' && <AdminMenu />}
                                    {role === 'owner' && <OwnerMenu />}
                                    {role === 'tenant' && <TenantMenu />}
                                    {role === 'maintainer' && <MaintainerMenu />}
                                </div>
                            }
                          
                        </div>
                    </div>
                </div>  
            </div>

            <div className={`${expand ? "header-psudo" : "header-psudo-1"} hidden md:flex`}/>
        </div>
     );
}
 
export default Navbar;