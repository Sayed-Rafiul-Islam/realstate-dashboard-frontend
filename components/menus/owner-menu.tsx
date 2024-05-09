"use client"

import { BarChart3, CalendarCheck, ChevronDown, DockIcon, Info, LandPlot, LayoutDashboard, ListChecks, Mail, Presentation, Receipt, ReceiptText, Tag, User, UserCircle, UserRoundCheck, Wrench } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const OwnerMenu = () => {
    const pathname = usePathname()
    const params = useParams()

    console.log(pathname === `/tenants/details/${params.id}`)
    
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
                    href : "/properties/all_properties"
                },
                {
                    id : 22,
                    label : "All Units",
                    href : "/properties/all_units"
                },
                // {
                //     id : 23,
                //     label : "Own Property",
                //     href : "/properties/own_property"
                // },
                // {
                //     id : 24,
                //     label : "Lease Property",
                //     href : "/properties/lease_property"
                // }
            ],
            label : "Properties",
            href : "",
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
            href1 : '',
            drop : false,
            icon : <Receipt size={20} />,
            active : pathname === '/allinvoices' ||
            pathname === '/recurringsettings',
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
            } else {
                item.active = false
            }
            return item
        })
        setMenu(temp)
        // setMenu([
        //     {
        //         id : 1,
        //         group : [],
        //         label : "Dashboard",
        //         href : "/",
        //         drop : false,
        //         icon : <LayoutDashboard size={20} />,
        //         active : pathname === '/',
        //     },
        //     {
        //         id : 2,
        //         group : [
        //             {
        //                 id : 21,
        //                 label : "All Properties",
        //                 href : "/allproperties"
        //             },
        //             {
        //                 id : 22,
        //                 label : "All Units",
        //                 href : "/allunits"
        //             },
        //             {
        //                 id : 23,
        //                 label : "Own Property",
        //                 href : "/ownproperty"
        //             },
        //             {
        //                 id : 24,
        //                 label : "Lease Property",
        //                 href : "/leaseproperty"
        //             }
        //         ],
        //         label : "Properties",
        //         href : "",
        //         drop : false,
        //         icon : <LandPlot size={20} />,
        //         active : pathname === '/allproperties' ||
        //         pathname === '/allunits' ||
        //         pathname === '/ownproperty' ||
        //         pathname === '/leaseproperty',
        //     },
        //     {
        //         id : 3,
        //         group : [
        //             {
        //                 id : 31,
        //                 label : "All Tenants",
        //                 href : "/alltenants"
        //             },
        //             {
        //                 id : 32,
        //                 label : "Tenant History",
        //                 href : "/tenanthistory"
        //             }
        //         ],
        //         label : "Tenants",
        //         href : "",
        //         drop : false,
        //         icon : <User size={20} />,
        //         active : pathname === '/alltenants' ||
        //         pathname === '/tenanthistory',
        //     },
        //     {
        //         id : 4,
        //         group : [
        //             {
        //                 id : 41,
        //                 label : "All Invoices",
        //                 href : "/allinvoices"
        //             },
        //             {
        //                 id : 42,
        //                 label : "Recurring Settings",
        //                 href : "/recurringsettings"
        //             }
        //         ],
        //         label : "Billing Center",
        //         href : "",
        //         drop : false,
        //         icon : <Receipt size={20} />,
        //         active : pathname === '/allinvoices' ||
        //         pathname === '/recurringsettings',
        //     },
        //     {
        //         id : 5,
        //         group : [],
        //         label : "Expenses",
        //         href : "/expenses",
        //         drop : false,
        //         icon : <ReceiptText size={20} />,
        //         active : pathname === '/expenses'
        //     },
        //     {
        //         id : 6,
        //         group : [],
        //         label : "Documents",
        //         href : "/documents",
    
        //         drop : false,
        //         icon : <DockIcon size={20} />,
        //         active : pathname === '/documents'
        //     },
        //     {
        //         id : 7,
        //         group : [],
        //         label : "Information",
        //         href : "/information",
        //         drop : false,
        //         icon : <Info size={20} />,
        //         active : pathname === '/information'
        //     },
        //     {
        //         id : 8,
        //         group : [
        //             {
        //                 id : 81,
        //                 label : "Upload List",
        //                 href : "/uploadloist"
        //             },
        //             {
        //                 id : 82,
        //                 label : "All List",
        //                 href : "/alllist"
        //             },
        //             {
        //                 id : 83,
        //                 label : "Contact List",
        //                 href : "/contactlist"
        //             }
        //         ],
        //         label : "My Listing",
        //         href : "",
        //         drop : false,
        //         icon : <ListChecks size={20} />,
        //         active : pathname === '/uploadloist' ||
        //         pathname === '/alllist' ||
        //         pathname === '/contactlist',
        //     },
        //     {
        //         id : 9,
        //         group : [
        //             {
        //                 id : 91,
        //                 label : "Maintainers",
        //                 href : "/maintainers"
        //             },
        //             {
        //                 id : 92,
        //                 label : "Maintainance Request",
        //                 href : "/maintainancerequest"
        //             }
        //         ],
        //         label : "Maintains",
        //         href : "",
        //         drop : false,
        //         icon : <Wrench size={20} />,
        //         active : pathname === '/Maintainers' ||
        //         pathname === '/maintainancerequest',
        //     },
        //     {
        //         id : 10,
        //         group : [],
        //         label : "Tickets",
        //         href : "/tickets",
        //         drop : false,
        //         icon : <Tag size={20} />,
        //         active : pathname === '/tickets'
        //     },
        //     {
        //         id : 11,
        //         group : [],
        //         label : "Notice Board",
        //         href : "/notice",
        //         drop : false,
        //         icon : <Presentation size={20} />,
        //         active : pathname === '/notice'
        //     },
        //     {
        //         id : 12,
        //         group : [
        //             {
        //                 id : 121,
        //                 label : "Earning",
        //                 href : "/earning"
        //             },
        //             {
        //                 id : 122,
        //                 label : "Loss / Profit By Month",
        //                 href : "/monthly"
        //             },
        //             {
        //                 id : 123,
        //                 label : "Expenses",
        //                 href : "/expenses"
        //             },
        //             {
        //                 id : 124,
        //                 label : "Occupancy",
        //                 href : "/occupancy"
        //             },
        //             {
        //                 id : 125,
        //                 label : "Maintainance",
        //                 href : "/mainntainance"
        //             },
        //             {
        //                 id : 126,
        //                 label : "Tenant",
        //                 href : "/tenant"
        //             }
        //         ],
        //         label : "Report",
        //         href : "",
        //         drop : false,
        //         icon : <BarChart3 size={20} />,
        //         active : pathname === '/earning' ||
        //         pathname === '/monthly' ||
        //         pathname === '/expenses' ||
        //         pathname === '/occupancy' ||
        //         pathname === '/mainntainance' ||
        //         pathname === '/tenant',
        //     },
        //     {
        //         id : 13,
        //         group : [
        //             {
        //                 id : 131,
        //                 label : "SMS",
        //                 href : "/sms"
        //             },
        //             {
        //                 id : 132,
        //                 label : "Email",
        //                 href : "/email"
        //             },
        //             {
        //                 id : 133,
        //                 label : "Email Template",
        //                 href : "/emailtamplate"
        //             }
        //         ],
        //         label : "Bulk SMS/Mail",
        //         href : "",
        //         drop : false,
        //         icon : <Mail size={20} />,
        //         active : pathname === '/sms' ||
        //         pathname === '/email' ||
        //         pathname === '/emailtamplate',
        //     },
        //     {
        //         id : 14,
        //         group : [],
        //         label : "Aggrement",
        //         href : "/aggrement",
        //         drop : false,
        //         icon : <UserRoundCheck size={20} />,
        //         active : pathname === '/aggrement',
        //     },
        //     {
        //         id : 15,
        //         group : [
        //             {
        //                 id : 151,
        //                 label : "My Profile",
        //                 href : "/profile"
        //             },
        //             {
        //                 id : 132,
        //                 label : "Change Password",
        //                 href : "/changepassword"
        //             }
        //         ],
        //         label : "Profile",
        //         href : "",
        //         drop : false,
        //         icon : <UserCircle size={20} />,
        //         active : pathname === '/uploadloist' ||
        //         pathname === '/profile' ||
        //         pathname === '/changepassword',
        //     },
        //     {
        //         id : 16,
        //         group : [],
        //         label : "My Subscription",
        //         href : "/subscription",
        //         drop : false,
        //         icon : <CalendarCheck size={20} />,
        //         active : pathname === '/subscription',
        //     },
        // ])
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
 
export default OwnerMenu;