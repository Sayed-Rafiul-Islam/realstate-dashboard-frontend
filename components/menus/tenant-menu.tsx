"use client"

import { BookText, ChevronDown, FileText, Handshake, Info, LayoutDashboard, Power, Tag, UserCircle, Wrench } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDispatch } from "react-redux"
import { removeUser } from "@/redux/auth/authSlice"

const TenantMenu = () => {
    const pathname = usePathname()
    const params = useParams()
    const dispatch = useDispatch()
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
            active : false,
        },
        {
            id : 2,
            group : [],
            label : "Invoice",
            href : "/invoice",
            href1 : '',
            drop : false,
            icon : <BookText size={20} />,
            active : false
        },
        {
            id : 3,
            group : [],
            label : "My Tickets",
            href : "/mytickets",
            href1 : '',
            drop : false,
            icon : <Tag size={20} />,
            active : false
        },
        {
            id : 4,
            group : [],
            label : "Information",
            href : "/information",
            href1 : '',
            drop : false,
            icon : <Info size={20} />,
            active : false
        },
        {
            id : 5,
            group : [],
            label : "Documents",
            href : "/documents",
            href1 : '',
            drop : false,
            icon : <FileText size={20} />,
            active : false
        },
        {
            id : 6,
            group : [],
            label : "Aggrement Request",
            href : "/maintainance",
            href1 : '',
            drop : false,
            icon : <Handshake size={20} />,
            active : false
        },
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
                    g_href : "/profile/changepassword",
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
            <button 
                onClick={()=>dispatch(removeUser()) && router.push('/authentication')}
                className="text-left text-gray-500 flex gap-4 hover:text-red-500 transition-all"
            >
                <Power size={20} />
            </button>
        </>
        
     );
}
 
export default TenantMenu;