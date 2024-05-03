"use client"

import { ChevronDown, CircleUser, LayoutDashboard, LayoutList, LockKeyhole, MessageCircle, Package, ReceiptText, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import './menu.css'

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
            icon : <LayoutDashboard size={20} />,
            active : false
        },
        {
            id : 2,
            group : [],
            label : "Packages",
            href : "/packages",
            drop : false,
            icon : <Package size={20} />,
            active : false
        },
        {
            id : 3,
            group : [],
            label : "All Orders",
            href : "/all_orders",
            drop : false,
            icon : <LayoutList size={20} />,
            active : false
        },
        {
            id : 4,
            group : [],
            label : "Owner Packages",
            href : "/owner_packages",
            drop : false,
            icon : <ReceiptText size={20} />,
            active : false
        },
        {
            id : 5,
            group : [],
            label : "Messages",
            href : "/messages",
            drop : false,
            icon : <MessageCircle size={20} />,
            active : false
        },
        // {
        //     id : 6,
        //     group : [
        //         {
        //             id : 61,
        //             label : "Terms & Conditions",
        //             href : "/terms"
        //         },
        //         {
        //             id : 62,
        //             label : "Privacy Policy",
        //             href : "/privacy"
        //         },
        //         {
        //             id : 63,
        //             label : "Cookie Policy",
        //             href : "/cookie"
        //         },
        //     ],
        //     label : "Message Policy",
        //     href : "",
        //     drop : false,
        //     icon : <LockKeyhole size={20} />,
        //     active : pathname === '/terms' ||
        //     pathname === '/privacy' ||
        //     pathname === '/cookie'
        // },
        {
            id : 7,
            group : [],
            label : "Owners",
            href : "/owners",
            drop : false,
            icon : <User size={20} />,
            active : false 
        },
        {
            id : 8,
            group : [
                {
                    groupId : 81,
                    label : "My Profile",
                    href : "/my_profile"
                },
                {
                    groupId : 82,
                    label : "Change Password",
                    href : "/my_profile/change_password"
                },
                {
                    groupId : 82,
                    label : "Change User Name",
                    href : "/my_profile/change_user_name"
                },
            ],
            label : "Profile",
            href : "/my_profile",
            drop : false,
            icon : <CircleUser size={20} />,
            active : false
        },
    ])

    useEffect(()=>{

        const temp = menu.map((item) =>{
            if (pathname === item.href || pathname === item.href + "/add") {
                item.active = true
            } else {
                item.active = false
            }
            return item
        })
        setMenu(temp)
    },[pathname])



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
            menu.map(({id,group,label,href,drop,icon,active},index)=>
                <div key={index}>
                    {
                        group.length === 0 ?
                        <Link
                        className={`
                        ${active ? 'dark:text-white font-semibold text-indigo-400' : 'text-gray-500'}
                        dark:text-stone-500 hover:text-indigo-400 transition-all nav-item
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
                                className={`nav-item
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
                                group.map(({groupId,label,href},index) =>
                                    <div className={drop ? `drop-on my-1` : 'drop-off'} key={index}>
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