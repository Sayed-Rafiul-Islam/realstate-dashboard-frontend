"use client"
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button"
import { removeUser } from "@/redux/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import AccessProvider from "@/actions/accessProvider";
import { Power, UserCircle } from "lucide-react";

const SignOut = () => {
    AccessProvider()
    const {user_name} = useSelector(({user} : any)=> user)
    const letter = user_name?.slice(0,1)

    const dispatch = useDispatch()
    const router = useRouter()
    const path = usePathname()
    return ( 
       <>
         {
            user_name &&
            <DropdownMenu>
            <DropdownMenuTrigger className="fixed right-12 top-8">
                <div className="bg-indigo-400 px-4 pt-2 pb-2 rounded-full flex justify-center items-center">
                    <span className="text-white mb-1">{letter}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-500">
                    <UserCircle size={20} />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-500" onClick={()=>dispatch(removeUser()) && router.push('/authentication')}>
                    <Power size={20} />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        }
       </>
        

        // <Button  className={path === '/authentication' ? 'hidden' : "fixed right-12 top-8"} variant='destructive'>Log Out</Button>
     );
}
 
export default SignOut;