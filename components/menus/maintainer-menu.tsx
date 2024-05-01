"use client"

import { ChevronDown, Info, LayoutDashboard, Tag, UserCircle, Wrench } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const MaintainerMenu = () => {
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
            active : pathname === '/',
        },
        {
            id : 2,
            group : [],
            label : "Tickets",
            href : "/tickets",
            drop : false,
            icon : <Tag size={20} />,
            active : pathname === '/tickets',
        },
        {
            id : 3,
            group : [],
            label : "Information",
            href : "/information",
            drop : false,
            icon : <Info size={20} />,
            active : pathname === 'information',
        },
        {
            id : 4,
            group : [],
            label : "Maintainance Request",
            href : "/maintainance",
            drop : false,
            icon : <Wrench size={20} />,
            active : pathname === 'maintainance',
        },
        {
            id : 5,
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
            icon : <UserCircle size={20} />,
            active : pathname === '/profile' || pathname === '/changepassword',
        }
    ])

    useEffect(()=>{
        setMenu([
            {
                id : 1,
                group : [],
                label : "Dashboard",
                href : "/",
                drop : false,
                icon : <LayoutDashboard size={20} />,
                active : pathname === '/',
            },
            {
                id : 2,
                group : [],
                label : "Tickets",
                href : "/tickets",
                drop : false,
                icon : <Tag size={20} />,
                active : pathname === '/tickets',
            },
            {
                id : 3,
                group : [],
                label : "Information",
                href : "/information",
                drop : false,
                icon : <Info size={20} />,
                active : pathname === 'information',
            },
            {
                id : 4,
                group : [],
                label : "Maintainance Request",
                href : "/maintainance",
                drop : false,
                icon : <Wrench size={20} />,
                active : pathname === 'maintainance',
            },
            {
                id : 5,
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
                icon : <UserCircle size={20} />,
                active : pathname === '/profile' || pathname === '/changepassword',
            }
        ])
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
                        group.map(({id,label,href},index) =>
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
 
export default MaintainerMenu;