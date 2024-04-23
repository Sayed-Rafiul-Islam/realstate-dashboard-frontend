"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const OwnerMenu = () => {
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
            group : [
                {
                    id : 21,
                    label : "All Properties",
                    href : "/allproperties"
                },
                {
                    id : 22,
                    label : "All Units",
                    href : "/allunits"
                },
                {
                    id : 23,
                    label : "Own Property",
                    href : "/ownproperty"
                },
                {
                    id : 23,
                    label : "Lease Property",
                    href : "/leaseproperty"
                },
            ],
            label : "Properties",
            href : "",
            drop : false
        },
        {
            id : 3,
            group : [
                {
                    id : 31,
                    label : "All Tenants",
                    href : "/alltenants"
                },
                {
                    id : 32,
                    label : "Tenant History",
                    href : "/tenanthistory"
                }
            ],
            label : "Tenants",
            href : "",
            drop : false
        },
        {
            id : 4,
            group : [
                {
                    id : 41,
                    label : "All Invoices",
                    href : "/allinvoices"
                },
                {
                    id : 42,
                    label : "Recurring Settings",
                    href : "/recurringsettings"
                }
            ],
            label : "Billing Center",
            href : "",
            drop : false
        },
        {
            id : 5,
            group : [],
            label : "Expenses",
            href : "/expenses",
            drop : false
        },
        {
            id : 6,
            group : [],
            label : "Documents",
            href : "/documents",
            drop : false
        },
        {
            id : 7,
            group : [],
            label : "Information",
            href : "/information",
            drop : false
        },
        {
            id : 8,
            group : [
                {
                    id : 81,
                    label : "Upload List",
                    href : "/uploadloist"
                },
                {
                    id : 82,
                    label : "All List",
                    href : "/alllist"
                },
                {
                    id : 83,
                    label : "Contact List",
                    href : "/contactlist"
                }
            ],
            label : "My Listing",
            href : "",
            drop : false
        },
        {
            id : 9,
            group : [
                {
                    id : 91,
                    label : "Maintainers",
                    href : "/maintainers"
                },
                {
                    id : 92,
                    label : "Maintainance Request",
                    href : "/maintainancerequest"
                }
            ],
            label : "Maintains",
            href : "",
            drop : false
        },
        {
            id : 10,
            group : [],
            label : "Tickets",
            href : "/tickets",
            drop : false
        },
        {
            id : 11,
            group : [],
            label : "Notice Board",
            href : "/notice",
            drop : false
        },
        {
            id : 12,
            group : [
                {
                    id : 121,
                    label : "Earning",
                    href : "/earning"
                },
                {
                    id : 122,
                    label : "Loss / Profit By Month",
                    href : "/monthly"
                },
                {
                    id : 123,
                    label : "Expenses",
                    href : "/expenses"
                },
                {
                    id : 124,
                    label : "Occupancy",
                    href : "/occupancy"
                },
                {
                    id : 125,
                    label : "Maintainance",
                    href : "/mainntainance"
                },
                {
                    id : 126,
                    label : "Tenant",
                    href : "/tenant"
                }
            ],
            label : "Report",
            href : "",
            drop : false
        },
        {
            id : 13,
            group : [
                {
                    id : 131,
                    label : "SMS",
                    href : "/sms"
                },
                {
                    id : 132,
                    label : "Email",
                    href : "/email"
                },
                {
                    id : 133,
                    label : "Email Template",
                    href : "/emailtamplate"
                }
            ],
            label : "Report",
            href : "",
            drop : false
        },
        {
            id : 14,
            group : [],
            label : "Aggrement",
            href : "/aggrement",
            drop : false
        },
        {
            id : 15,
            group : [
                {
                    id : 151,
                    label : "My Profile",
                    href : "/profile"
                },
                {
                    id : 132,
                    label : "Change Password",
                    href : "/changepassword"
                }
            ],
            label : "Report",
            href : "",
            drop : false
        },
        {
            id : 16,
            group : [],
            label : "My Subscription",
            href : "subscription",
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
 
export default OwnerMenu;