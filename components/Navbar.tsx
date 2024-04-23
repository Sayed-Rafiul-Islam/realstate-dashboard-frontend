"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import './navbar.css'
import AdminMenu from "./menus/admin-menu";
import AccessProvider from "@/actions/accessProvider";
import OwnerMenu from "./menus/owner-menu";

const Navbar = () => {
    AccessProvider()
    const {user_name,role} = useSelector((data : any) => data.user)
    console.log(role)

    const path = usePathname()


    


   
    return ( 
        <div className={path === '/authentication' ? 'hidden' : 'block'}>

            <div className="header hidden bg-indigo-200 md:flex border-r dark:border-stone-800">
                <div className="nav-bar ">
                    <div className='nav-bar-inner'>
                        <div className="nav-links mt-10 px-5 flex flex-col gap-2">
                            {role === 'admin' && <AdminMenu />}
                            {role === 'owner' && <OwnerMenu />}
                            {role === 'tenant' && <AdminMenu />}
                            {role === 'maintainer' && <AdminMenu />}
                        </div>
                    </div>
                </div>  
            </div>

            <div className="header-psudo hidden md:flex"/>
        </div>
     );
}
 
export default Navbar;