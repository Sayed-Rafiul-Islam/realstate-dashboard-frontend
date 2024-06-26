"use client"

import { ChevronDown, CircleUser, LayoutDashboard, LayoutList, MessageCircle, Package, ReceiptText, User } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import './menu.css'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const AdminMenu = () => {

    const pathname = usePathname()
    const params = useParams()
    const router = useRouter()

    const [menu,setMenu] = useState
    ([
        {
            id : 1,
            group : [],
            label : "Dashboard",
            href : "/",
            href1 : '',
            drop : false,
            icon : <LayoutDashboard size={20} />,
            active : false
        },
        {
            id : 2,
            group : [],
            label : "Packages",
            href : "/packages",
            href1 : '',
            drop : false,
            icon : <Package size={20} />,
            active : false
        },
        {
            id : 3,
            group : [],
            label : "All Orders",
            href : "/all_orders",
            href1 : '',
            drop : false,
            icon : <LayoutList size={20} />,
            active : false
        },
        {
            id : 4,
            group : [],
            label : "Owner Packages",
            href : "/owners_packages",
            href1 : '',
            drop : false,
            icon : <ReceiptText size={20} />,
            active : false
        },
        {
            id : 5,
            group : [
                {
                    id : 51,
                    label : "Inbox",
                    g_href : "/admin_messages/inbox",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 52,
                    label : "Send Message",
                    g_href : "/admin_messages/send_message",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "Messages",
            href : "/admin_messages",
            href1 : '',
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
        //             g_href : "/terms"
        //         },
        //         {
        //             id : 62,
        //             label : "Privacy Policy",
        //             g_href : "/privacy"
        //         },
        //         {
        //             id : 63,
        //             label : "Cookie Policy",
        //             g_href : "/cookie"
        //         },
        //     ],
        //     label : "Message Policy",
        //     g_href : "",
        //     href1 : '',
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
            href1 : '',
            drop : false,
            icon : <User size={20} />,
            active : false 
        },
        {
            id : 8,
            group : [
                {
                    id : 81,
                    label : "My Profile",
                    g_href : "/profile/my_profile",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 82,
                    label : "Change Password",
                    g_href : "/profile/change_password",
                    g_href1 : ``,
                    g_active : false,
                },
                // {
                //     groupId : 82,
                //     label : "Change User Name",
                //     g_href : "/profile/change_email",
                //     g_href1 : ``,
                //     g_active : false,
                // },
            ],
            label : "Profile",
            href : "profile",
            href1 : '',
            drop : false,
            icon : <CircleUser size={20} />,
            active : false
        },
    ])

   
    useEffect(()=>{

        const temp = menu.map((item) =>{
            // ||  pathname === item.href + '/' + params.id
            if (pathname === item.href || pathname === item.href1) {
                item.active = true
            }

             else {
                item.active = false
                item.group.map((g_item)=>{

                    if (pathname === g_item.g_href || pathname === g_item.g_href + '/' + params.detail_id ||  pathname === g_item.g_href + '/' + params.id) {
                        g_item.g_active = true
                    } else {
                        g_item.g_active = false
                    }
                })
            }
            return item
        })
        setMenu(temp)

    },[pathname])

    const dropDown = (id : number) => {
        const temp = menu.filter((item)=>{
            if(item.id === id) {
                item.drop = true
            } else {
                item.drop = false
            }
            return item
        })
        setMenu(temp)
    }
    
    return ( 
        <>
        {
    menu.map(({id,group,label,href,drop,icon,active},index)=>
        <div className={`${active && 'bg-sky-400 bg-opacity-10 border-r-4 border-amber-500 px-2'} py-2 transition-all`} key={index}>
            {
                group.length === 0 ?
                <Link
                className={`
                ${active ? 'dark:text-white font-semibold text-amber-500 ' : 'text-gray-500'}
                dark:text-stone-500 hover:text-amber-500 transition-all nav-item
                `}   
                    href={href}
                >
                    <span className="flex items-center justify-center">
                        <span>{icon}</span>
                    </span>
                </Link>
            :
                <div>
                      <DropdownMenu>
                <DropdownMenuTrigger  asChild>
                    <button 
                        className={`nav-item
                        ${drop ? 'font-semibold' : ''}
                         flex items-center gap-4 w-full hover:text-amber-500 transition-all
                         ${href === "/"+pathname.split("/")[1] ? "text-amber-500 bg-sky-400 bg-opacity-10 py-2 px-2 border-r-4 border-amber-500" : "text-gray-500"}
                         `}
                        onClick={()=>dropDown(id)}
                    >   <span>{icon}</span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-12" align="end">
                    {
                        group.map(({id,label,g_href,g_active},index) =>
                            <DropdownMenuItem className={`my-1 py-2 cursor-pointer`}
                             key={index}
                             onClick={()=>{router.push(g_href)}}
                             >
                                {label}
                            </DropdownMenuItem>
                        )
                  
                    }
                </DropdownMenuContent>
            </DropdownMenu>                    
                </div>

            }
            
        </div>
    )
}
</>
        
     );
}
 
export default AdminMenu;