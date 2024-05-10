"use client"

import { BarChart3, CalendarCheck, ChevronDown, DockIcon, Info, LandPlot, LayoutDashboard, ListChecks, Mail, Presentation, Receipt, ReceiptText, Tag, User, UserCircle, UserRoundCheck, Wrench } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const OwnerMenu = () => {
    const pathname = usePathname()
    const params = useParams()
    
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
            active : pathname === '/',
        },
        {
            id : 2,
            group : [
                {
                    id : 21,
                    label : "All Properties",
                    g_href : "/properties/all_properties",
                    g_href1 : `/properties/all_properties/${params.detail_id}`,
                    g_active : false,
                },
                {
                    id : 22,
                    label : "All Units",
                    g_href : "/properties/all_units",
                    g_href1 : ``,
                    g_active : false,
                },
                // {
                //     id : 24,
                //     label : "Lease Property",
                //     href : "/properties/lease_property"
                // }
            ],
            label : "Properties",
            href : "/properties",
            href1 : '',
            drop : false,
            icon : <LandPlot size={20} />,
            active : pathname === '/properties/all_properties' ||
            pathname === '/properties/units'
            // pathname === '/properties/own_property' ||
            // pathname === '/properties/lease_property',
        },
        {
            id : 3,
            group : [],
            label : "Tenants",
            href : "/tenants",
            href1 : `/tenants/details/${params.id}`,
            drop : false,
            icon : <User size={20} />,
            active : false,
        },
        {
            id : 4,
            group : [
                {
                    id : 41,
                    label : "All Invoices",
                    g_href : "/invoices/all_invoices",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 42,
                    label : "Recurring Settings",
                    g_href : "/invoices/recurring_settings",
                    g_href1 : ``,
                    g_active : false,
                },
            ],
            label : "Billing Center",
            href : "/invoices",
            href1 : '',
            drop : false,
            icon : <Receipt size={20} />,
            active : false,
        },
        {
            id : 5,
            group : [],
            label : "Expenses",
            href : "/expenses",
            href1 : '',
            drop : false,
            icon : <ReceiptText size={20} />,
            active : pathname === '/expenses'
        },
        {
            id : 6,
            group : [],
            label : "Documents",
            href : "/documents",
            href1 : '',
            drop : false,
            icon : <DockIcon size={20} />,
            active : pathname === '/documents'
        },
        {
            id : 7,
            group : [],
            label : "Information",
            href : "/information",
            href1 : '',
            drop : false,
            icon : <Info size={20} />,
            active : pathname === '/information'
        },
        {
            id : 8,
            group : [
                {
                    id : 81,
                    label : "Upload List",
                    g_href : "/uploadloist",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 82,
                    label : "All List",
                    g_href : "/alllist",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 83,
                    label : "Contact List",
                    g_href : "/contactlist",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "My Listing",
            href : "",
            href1 : '',
            drop : false,
            icon : <ListChecks size={20} />,
            active : pathname === '/uploadloist' ||
            pathname === '/alllist' ||
            pathname === '/contactlist',
        },
        {
            id : 9,
            group : [
                {
                    id : 91,
                    label : "Maintainers",
                    g_href : "/maintainers",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 92,
                    label : "Maintainance Request",
                    g_href : "/maintainancerequest",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "Maintains",
            href : "",
            href1 : '',
            drop : false,
            icon : <Wrench size={20} />,
            active : pathname === '/Maintainers' ||
            pathname === '/maintainancerequest',
        },
        {
            id : 10,
            group : [],
            label : "Tickets",
            href : "/tickets",
            href1 : '',
            drop : false,
            icon : <Tag size={20} />,
            active : pathname === '/tickets'
        },
        {
            id : 11,
            group : [],
            label : "Notice Board",
            href : "/notice",
            href1 : '',
            drop : false,
            icon : <Presentation size={20} />,
            active : pathname === '/notice'
        },
        {
            id : 12,
            group : [
                {
                    id : 121,
                    label : "Earning",
                    g_href : "/earning",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 122,
                    label : "Loss / Profit By Month",
                    g_href : "/monthly",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 123,
                    label : "Expenses",
                    g_href : "/expenses",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 124,
                    label : "Occupancy",
                    g_href : "/occupancy",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 125,
                    label : "Maintainance",
                    g_href : "/mainntainance",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 126,
                    label : "Tenant",
                    g_href : "/tenant",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "Report",
            href : "",
            href1 : '',
            drop : false,
            icon : <BarChart3 size={20} />,
            active : pathname === '/earning' ||
            pathname === '/monthly' ||
            pathname === '/expenses' ||
            pathname === '/occupancy' ||
            pathname === '/mainntainance' ||
            pathname === '/tenant',
        },
        {
            id : 13,
            group : [
                {
                    id : 131,
                    label : "SMS",
                    g_href : "/sms",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 132,
                    label : "Email",
                    g_href : "/email",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 133,
                    label : "Email Template",
                    g_href : "/emailtamplate",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "Bulk SMS/Mail",
            href : "",
            href1 : '',
            drop : false,
            icon : <Mail size={20} />,
            active : pathname === '/sms' ||
            pathname === '/email' ||
            pathname === '/emailtamplate',
        },
        {
            id : 14,
            group : [],
            label : "Aggrement",
            href : "/aggrement",
            href1 : '',
            drop : false,
            icon : <UserRoundCheck size={20} />,
            active : pathname === '/aggrement',
        },
        {
            id : 15,
            group : [
                {
                    id : 151,
                    label : "My Profile",
                    g_href : "/profile",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 132,
                    label : "Change Password",
                    g_href : "/changepassword",
                    g_href1 : ``,
                    g_active : false,
                }
            ],
            label : "Profile",
            href : "",
            href1 : '',
            drop : false,
            icon : <UserCircle size={20} />,
            active : pathname === '/uploadloist' ||
            pathname === '/profile' ||
            pathname === '/changepassword',
        },
        {
            id : 16,
            group : [],
            label : "My Subscription",
            href : "/subscription",
            href1 : '',
            drop : false,
            icon : <CalendarCheck size={20} />,
            active : pathname === '/subscription',
        },
    ])

    useEffect(()=>{

        const temp = menu.map((item) =>{
            if (pathname === item.href || pathname === item.href1 ||  pathname === item.href + '/' + params.id) {
                item.active = true
            }

             else {
                item.active = false
                item.group.map((g_item)=>{
                    console.log(g_item.g_href1)
                    if (pathname === g_item.g_href || pathname === g_item.g_href1 ||  pathname === g_item.g_href + '/' + params.id) {
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
                         flex items-center gap-4 w-full hover:text-indigo-400 transition-all
                         `}
                        onClick={()=>dropDown(id)}
                    >   <span>{icon}</span>
                        <span className="w-full flex justify-between items-center">
                            <span>{label}</span>
                            <span><ChevronDown className={drop ? 'arrow-up' : 'arrow-down'} size={15}/></span>
                        </span>
                    </button>
                    <div className="ml-10">
                    {
                        group.map(({id,label,g_href,g_active},index) =>
                            <div className={drop ? `drop-on my-1` : 'drop-off'} key={index}>
                                <Link
                                    className={
                                    `
                                        ${g_active ? 'dark:text-white text-indigo-400 font-bold' : 'text-gray-500'}
                                    dark:text-stone-500 dark:hover:text-stone-200 
                                         hover:text-indigo-400
                                        
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
</>
        
     );
}
 
export default OwnerMenu;