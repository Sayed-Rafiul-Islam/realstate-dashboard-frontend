"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const AdminMenu = () => {
    const pathname = usePathname()
    const [menu,setMenu] = useState
    ([
        {
            id : 1,
            group : [],
            label : "Dashboard",
            href : "/",
            drop : false
        },
        {
            id : 2,
            group : [],
            label : "Packages",
            href : "/packages",
            drop : false
        },
        {
            id : 3,
            group : [],
            label : "All Orders",
            href : "/allorders",
            drop : false
        },
        {
            id : 4,
            group : [],
            label : "Owner Packages",
            href : "/ownerpackages",
            drop : false
        },
        {
            id : 5,
            group : [],
            label : "Message",
            href : "/message",
            drop : false
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
            drop : false
        },
        {
            id : 7,
            group : [],
            label : "Owner",
            href : "/owner",
            drop : false
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
            drop : false
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
        console.log(menu)
    }


    return ( 
        <>
                {
            menu.map(({id,group,label,href,drop})=>
                <div key={id}>
                    {
                        group.length === 0 ?
                        <Link
                            className={
                            `
                                ${pathname === href && 'dark:text-white text-black font-bold'}
                            dark:text-stone-500 dark:hover:text-stone-200 
                                text-stone-500
                                
                                transition-all
                            `}
                            href={href}
                        >
                            {label}
                        </Link>
                    :
                        <div>
                            <button onClick={()=>dropDown(id)}>{label}</button>
                            {
                                drop &&
                                group.map(({id,label,href}) =>
                                    <div key={id}>
                                        <Link
                                            className={
                                            `
                                                ${pathname === href && 'dark:text-white text-black font-bold'}
                                            dark:text-stone-500 dark:hover:text-stone-200 
                                                text-stone-500
                                                
                                                transition-all
                                            `}
                                            href={href}
                                        >
                                            {label}
                                        </Link>
                                    </div>
                                )
                          
                            }
                        </div>

                    }
                    
                </div>
            )
        }
        </>
        
     );
}
 
export default AdminMenu;