"use client"

import { removeUser } from "@/redux/auth/authSlice"
import { BarChart3, Bell, BookText, ChevronDown, File, Info, LayoutDashboard, Mail, Power, Tag, UserCircle, Wrench } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const MaintainerMenuEx = () => {
    const dispatch = useDispatch()
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
            label : "Maintainance Requests",
            href : "/maintainer_requests",
            href1 : '',
            drop : false,
            icon : <Wrench size={20} />,
            active : false
        },
        // {
        //     id : 3,
        //     group : [],
        //     label : "Invoices",
        //     href : "/maintainer_invoices",
        //     href1 : '',
        //     drop : false,
        //     icon : <BookText size={20} />,
        //     active : false
        // },
        {
            id : 4,
            group : [
                // {
                //     id : 41,
                //     label : "Invoices",
                //     g_href : "/maintainer_reports/invoices",
                //     g_href1 : ``,
                //     g_active : false,
                // },
                {
                    id : 42,
                    label : "All Maintainance",
                    g_href : "/maintainer_reports/requests",
                    g_href1 : ``,
                    g_active : false,
                },
            ],
            label : "Reports",
            href : "/maintainer_reports",
            href1 : '',
            drop : false,
            icon : <BarChart3 size={20} />,
            active : false
        },
        {
            id : 5,
            group : [
                {
                    id : 51,
                    label : "Inbox",
                    g_href : "/maintainer_messages/inbox",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 52,
                    label : "Send Message",
                    g_href : "/maintainer_messages/send_message",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "Messages",
            href : "/maintainer_messages",
            href1 : '',
            drop : false,
            icon : <Mail size={20} />,
            active : false
        },
        {
            id : 6,
            group : [],
            label : "Documents",
            href : "/maintainer_documents",
            href1 : '',
            drop : false,
            icon : <File size={20} />,
            active : false
        },
        // {
        //     id : 8,
        //     group : [],
        //     label : "Notifications",
        //     href : "/maintainer_notifications",
        //     href1 : '',
        //     drop : false,
        //     icon : <Bell size={20} />,
        //     active : false
        // },
        {
            id : 7,
            group : [
                {
                    id : 71,
                    label : "My Profile",
                    g_href : "/profile/my_profile",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 72,
                    label : "Change Password",
                    g_href : "/profile/change_password",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "Profile",
            href : "/profile",
            href1 : '',
            drop : false,
            icon : <UserCircle size={20} />,
            active : false
        }
    ])

    useEffect(()=>{
        const temp = menu.map((item) =>{
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
                    <span className="flex items-center gap-4">
                        <span>{icon}</span>
                        <span>{label}</span>
                    </span>
                </Link>
            :
                <div>
                    <button 
                        className={`nav-item
                        ${drop ? 'font-semibold' : ''}
                         flex items-center gap-4 w-full hover:text-amber-500 transition-all
                         ${href === "/"+pathname.split("/")[1] ? "text-amber-500 bg-sky-400 bg-opacity-10 py-2 px-2 border-r-4 border-amber-500" : "text-gray-500"}
                         `}
                        onClick={()=>dropDown(id)}
                    >   <span>{icon}</span>
                        <span className="w-full flex justify-between items-center">
                            <span>{label}</span>
                            <span><ChevronDown className={drop ? 'arrow-up' : 'arrow-down'} size={15}/></span>
                        </span>
                    </button>
                    <div className="ml-5">
                    {
                        group.map(({id,label,g_href,g_active},index) =>
                            <div className={drop ? `drop-on my-1 pl-5
                             
                             ` : 'drop-off'}
                            //  ${g_active && 'bg-sky-400 bg-opacity-10 border-r-4 border-amber-500'}
                             
                             key={index}>
                                <Link
                                    className={
                                    `
                                        ${g_active ? 'dark:text-white text-amber-500 font-bold' : 'text-gray-500'}
                                    dark:text-stone-500 dark:hover:text-stone-200 
                                         hover:text-amber-500
                                        
                                        transition-all
                                    `}
                                    href={g_href}
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
            <button 
                onClick={()=>dispatch(removeUser()) && router.push('/authentication')}
                className="text-left text-gray-500 flex items-center gap-4 hover:text-red-500 transition-all"
            >
               <Power size={20} /> Log Out
            </button>
        </>
        
     );
}
 
export default MaintainerMenuEx;