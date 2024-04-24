"use client"

import { BarChart3, CalendarCheck, ChevronDown, DockIcon, Info, LandPlot, LayoutDashboard, ListChecks, Mail, Presentation, Receipt, ReceiptText, Tag, User, UserCircle, UserRoundCheck, Wrench } from "lucide-react"
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
            drop : false,
            icon : <LayoutDashboard size={20} />
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
            drop : false,
            icon : <LandPlot size={20} />
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
            drop : false,
            icon : <User size={20} />
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
            drop : false,
            icon : <Receipt size={20} />
        },
        {
            id : 5,
            group : [],
            label : "Expenses",
            href : "/expenses",
            drop : false,
            icon : <ReceiptText size={20} />
        },
        {
            id : 6,
            group : [],
            label : "Documents",
            href : "/documents",
            drop : false,
            icon : <DockIcon size={20} />
        },
        {
            id : 7,
            group : [],
            label : "Information",
            href : "/information",
            drop : false,
            icon : <Info size={20} />
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
            drop : false,
            icon : <ListChecks size={20} />
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
            drop : false,
            icon : <Wrench size={20} />
        },
        {
            id : 10,
            group : [],
            label : "Tickets",
            href : "/tickets",
            drop : false,
            icon : <Tag size={20} />
        },
        {
            id : 11,
            group : [],
            label : "Notice Board",
            href : "/notice",
            drop : false,
            icon : <Presentation size={20} />
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
            drop : false,
            icon : <BarChart3 size={20} />
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
            label : "Bulk SMS/Mail",
            href : "",
            drop : false,
            icon : <Mail size={20} />
        },
        {
            id : 14,
            group : [],
            label : "Aggrement",
            href : "/aggrement",
            drop : false,
            icon : <UserRoundCheck size={20} />
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
            label : "Profile",
            href : "",
            drop : false,
            icon : <UserCircle size={20} />
        },
        {
            id : 16,
            group : [],
            label : "My Subscription",
            href : "subscription",
            drop : false,
            icon : <CalendarCheck size={20} />
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
            menu.map(({id,group,label,href,drop,icon})=>
                <div key={id}>
                    {
                        group.length === 0 ?
                        <Link
                            className={
                            `
                                ${pathname === href ? 'dark:text-white font-semibold text-indigo-400' : 'text-gray-500'}
                            dark:text-stone-500 hover:text-indigo-400 
                                transition-all nav-item
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
 
export default OwnerMenu;