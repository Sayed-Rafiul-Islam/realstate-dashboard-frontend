"use client"
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button"
import { removeUser } from "@/redux/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";

import './signout.css'


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import AccessProvider from "@/actions/accessProvider";
import { Power, UserCircle } from "lucide-react";
import { UsersReducerProps } from "@/types";
import Link from "next/link";
import Image from "next/image";

const SignOut = () => {
    AccessProvider()
    const {email,role,imageUrl} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer.user)

    const letter = email?.slice(0,1)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleSignOut = () => {
        window.location.assign('/authentication')
        if (typeof window !== 'undefined') {
            localStorage.removeItem('tenantInfo')
            localStorage.removeItem('ownerInfo')
            localStorage.removeItem('maintainerInfo')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('role')
        }
        // router.push('/authentication')
    }

    return ( 
       <>
         {
            // email &&
            <DropdownMenu>
            <DropdownMenuTrigger className="">
                {
                    imageUrl === undefined || imageUrl === '' ?
                    <div className="bg-purple-600 px-4 pt-2 pb-2 rounded-full flex justify-center items-center signout">
                        <span className="text-white mb-1">{letter}</span>
                    </div>
                    :
                    <div className="rounded-full h-[35px] w-[35px] bg-purple-600 flex justify-center items-center">
                        <div className="relative rounded-full h-[30px] w-[30px]">
                            <Image className="rounded-full" fill src={imageUrl} alt="image" />
                        </div>
                    </div>
                    
                    
                }
                
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

                <DropdownMenuItem onClick={()=>router.push('/profile')} className="flex items-center gap-2 cursor-pointer text-gray-500">
                    <UserCircle size={20} />
                    <span><Link prefetch href='/my_profile'>Profile</Link></span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-500" onClick={handleSignOut}>
                    <Power size={20} />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        }
       </>
     );
}
 
export default SignOut;