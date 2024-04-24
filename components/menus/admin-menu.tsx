"use client"

import { ChevronDown, CircleUser, LayoutDashboard, LayoutList, LockKeyhole, MessageCircle, Package, ReceiptText, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import './menu.css'
import AccessProvider from "@/actions/accessProvider"
import { useSelector } from "react-redux"

const AdminMenu = () => {

    const pathname = usePathname()
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

    const dropDown = (id : number) => {
        const temp = menu.filter((item)=>{
            if(item.id === id) {
                item.drop = !item.drop
            }
            return item
        })
        setMenu(temp)
    }


    return ( 
        <>
                {
            menu.map(({id,group,label,href,drop,icon})=>
                <div key={id}>
                    {
                        group.length === 0 ?
                        <Link
                            className={
                            `
                                ${pathname === href ? 'dark:text-white font-semibold text-indigo-400' : 'text-gray-500'}
                            dark:text-stone-500 hover:text-indigo-400 
                                transition-all
                            `}
                            href={href}
                        >
                            <span className="flex items-center gap-4">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </span>
                        </Link>
                    :
                        <div>
                            <button 
                                className={`
                                ${drop ? 'dark:text-white text-black font-semibold' : 'text-gray-500'}
                                 flex items-center gap-4 w-full hover:text-indigo-400 transition-all`}
                                onClick={()=>dropDown(id)}
                            >   <span>{icon}</span>
                                <span className="w-full flex justify-between items-center">
                                    <span>{label}</span>
                                    <span><ChevronDown className={drop ? 'arrow-up' : 'arrow-down'} size={15}/></span>
                                </span>
                            </button>
                            <div className="ml-10">
                            {
                                group.map(({id,label,href}) =>
                                    <div className={drop ? `drop-on my-1` : 'drop-off'} key={id}>
                                        <Link
                                            className={
                                            `
                                                ${pathname === href ? 'dark:text-white text-indigo-400 font-bold' : 'text-gray-500'}
                                            dark:text-stone-500 dark:hover:text-stone-200 
                                                 hover:text-indigo-400
                                                
                                                transition-all
                                            `}
                                            href={href}
                                        >
                                            &#x2022; {label}
                                        </Link>
                                    </div>
                                )
                          
                            }
                            </div>
                            
                        </div>

                    }
                    
                </div>
            )
        }
        </>
        
     );
}
 
export default AdminMenu;