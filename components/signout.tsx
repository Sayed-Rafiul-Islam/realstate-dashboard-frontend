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
import { Mail, Power, UserCircle } from "lucide-react";
import { AdminMessagesReducerProps, MaintainerMessagesReducerProps, MessageProps, OwnerMessagesReducerProps, RedReducerProps, TenantMessagesReducerProps, UsersReducerProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import api from "@/actions/api";
import { useEffect, useState } from "react";
import { setRed } from "@/redux/message-red";

const SignOut = () => {
    AccessProvider()
    const dispatch = useDispatch()
    const router = useRouter()
    const {email,role,imageUrl,_id,firstName,lastName} = useSelector(({usersReducer} : UsersReducerProps)=> usersReducer.user)
    const {red} = useSelector(({redReducer} : RedReducerProps)=> redReducer)

    useEffect(()=>{
        const getData = async () => {
            const {data,status} = await api.get(`getMessages?id=${_id}`,{validateStatus: () => true})
            if (status === 200) {
                const unread = data.filter((d : MessageProps)=> d.read === false)
                if (unread.length > 0) {
                    dispatch(setRed(true))
                } else {
                    dispatch(setRed(false))
                }
            }
        }
        getData()
    },[_id])



    const letter = email?.slice(0,1)
    
    const handleSignOut = () => {
                localStorage.removeItem("user")
                localStorage.removeItem("owners")
                localStorage.removeItem("tenants")
                localStorage.removeItem("maintainers")
                localStorage.removeItem('accessToken')
                localStorage.removeItem('tenantInfo')
                localStorage.removeItem('ownerInfo')
                localStorage.removeItem('maintainerInfo')
                localStorage.removeItem('role')
                localStorage.removeItem("ownerProperties")
                localStorage.removeItem("ownerUnits")
                localStorage.removeItem("documents")
                localStorage.removeItem("tenantDocuments")
                localStorage.removeItem("expenses")
                localStorage.removeItem("propertyForm")
                localStorage.removeItem("tenantForm")
                localStorage.removeItem("invoices")
                localStorage.removeItem("maintainanceRequests")
                localStorage.removeItem("messages")
                localStorage.removeItem("orders")
                localStorage.removeItem("ownerPackages")
                localStorage.removeItem("packages")
                localStorage.removeItem("properties")
                localStorage.removeItem("rents")
                localStorage.removeItem("earnings")
                localStorage.removeItem("monthlyRecords")
                localStorage.removeItem("notifications")
                localStorage.removeItem("expenseTypes")
                localStorage.removeItem("gateways")
                localStorage.removeItem("invoiceTypes")
                localStorage.removeItem("maintainanceTypes")
                localStorage.removeItem("units")
                localStorage.removeItem("allUsers")
                localStorage.removeItem("ownerMaintainanceTypes")
                localStorage.removeItem("ownerMaintainers")
                localStorage.removeItem("ownerTenants")
                localStorage.removeItem("ownerMaintainanceRequests")
                localStorage.removeItem("maintainerMaintainanceRequests")
                localStorage.removeItem("tenantMaintainanceRequests")

                window.location.assign('/authentication')
    }

    const handleRedirect = () => {
        if (role === 'admin') {
            router.push('/admin_messages/inbox')
        } else if (role === 'owner') {
            router.push('/massages/inbox')
        } else if (role === 'tenant') {
            router.push('/tenant_messages/inbox')
        } else if (role === 'maintainer') {
            router.push('/maintainer_messages/inbox')
        }
    }

    return ( 
       <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
            <button onClick={handleRedirect}><Mail size={20} /></button>
            {/* <h4 className="text-sm">{firstName ? `${firstName} ${lastName}` : lastName}</h4> */}
            {red && <div className="h-[10px] w-[10px] bg-red-500 rounded-full absolute top-1 -left-1" />}
        </div>
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
       </div>
     );
}
 
export default SignOut;