"use client"

import { BarChart3, CalendarCheck, ChevronDown, CircleUser, DockIcon, Info, LandPlot, LayoutDashboard, ListChecks, Mail, MailIcon, Presentation, Receipt, ReceiptText, Settings, Tag, User, UserCircle, UserRoundCheck, Wrench } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const OwnerMenuEx = () => {
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
            active : false,
        },
        {
            id : 2,
            group : [
                {
                    id : 21,
                    label : "All Properties",
                    g_href : "/properties/all_properties",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 22,
                    label : "All Units",
                    g_href : "/properties/all_units",
                    g_href1 : ``,
                    g_active : false,
                },
            ],
            label : "Properties",
            href : "/properties",
            href1 : '',
            drop : false,
            icon : <LandPlot size={20} />,
            active : false
        },
        {
            id : 3,
            group : [
                {
                    id : 31,
                    label : "All Tenants",
                    g_href : "/tenants/all_tenants",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 32,
                    label : "Tenants History",
                    g_href : "/tenants/tenants_history",
                    g_href1 : ``,
                    g_active : false,
                },
            ],
            label : "Tenants",
            href : "/tenants",
            href1 : ``,
            drop : false,
            icon : <User size={20} />,
            active : false,
        },
        {
            id : 1,
            group : [],
            label : "Rents",
            href : "/rents",
            href1 : '',
            drop : false,
            icon : <Receipt size={20} />,
            active : false,
        },

        {
            id : 9,
            group : [
                {
                    id : 91,
                    label : "All Maintainers",
                    g_href : "/maintainers/all_maintainers",
                    g_href1 : ``,
                    g_active : false,
                },
                // {
                //     id : 92,
                //     label : "Maintainance Request",
                //     g_href : "/maintainancerequest",
                //     g_href1 : ``,
                //     g_active : false,
                // }
            ],
            label : "Maintainers",
            href : "/maintainers",
            href1 : '',
            drop : false,
            icon : <Wrench size={20} />,
            active : false,
        },
        {
            id : 29,
            group : [
                {
                    id : 291,
                    label : "All Requests",
                    g_href : "/maintainance_requests/all_maintainance_requests",
                    g_href1 : ``,
                    g_active : false,
                },
                // {
                //     id : 92,
                //     label : "Maintainance Request",
                //     g_href : "/maintainancerequest",
                //     g_href1 : ``,
                //     g_active : false,
                // }
            ],
            label : "Maintainance Request",
            href : "/maintainance_requests",
            href1 : '',
            drop : false,
            icon : <Wrench size={20} />,
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
            label : "Invoices",
            href : "/invoices",
            href1 : '',
            drop : false,
            icon : <Receipt size={20} />,
            active : false,
        },
        {
            id : 12,
            group : [
                {
                    id : 121,
                    label : "Earnings",
                    g_href : "/report/earnings",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 122,
                    label : "Expenses",
                    g_href : "/report/expenses",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 123,
                    label : "Loss / Profit By Month",
                    g_href : "/report/monthly_report",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 124,
                    label : "Occupancy",
                    g_href : "/report/occupancy",
                    g_href1 : ``,
                    g_active : false,
                },
                // {
                //     id : 125,
                //     label : "Maintainance",
                //     g_href : "/report/mainntainance",
                //     g_href1 : ``,
                //     g_active : false,
                // },
                // {
                //     id : 126,
                //     label : "Tenant",
                //     g_href : "/report/tenant",
                //     g_href1 : ``,
                //     g_active : false,
                // }
            ],
            label : "Report",
            href : "/report",
            href1 : '',
            drop : false,
            icon : <BarChart3 size={20} />,
            active : false,
        },
        {
            id : 5,
            group : [],
            label : "Massages",
            href : "/massages",
            href1 : '',
            drop : false,
            icon : <MailIcon size={20} />,
            active : false
        },
        {
            id : 5,
            group : [
                {
                    id : 51,
                    label : "Payment Gateway",
                    g_href : "/settings/payment_gateway",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 52,
                    label : "Expense Type",
                    g_href : "/settings/expense_type",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 53,
                    label : "Invoice Type",
                    g_href : "/settings/invoice_type",
                    g_href1 : ``,
                    g_active : false,
                },
                {
                    id : 54,
                    label : "Maintainance Issue",
                    g_href : "/settings/maintainance_issue",
                    g_href1 : ``,
                    g_active : false,
                },
            ],
            label : "Settings",
            href : "/settings",
            href1 : '',
            drop : false,
            icon : <Settings size={20} />,
            active : false
        },
        // {
        //     id : 6,
        //     group : [],
        //     label : "Information",
        //     href : "/information",
        //     href1 : '',
        //     drop : false,
        //     icon : <Info size={20} />,
        //     active : pathname === '/information'
        // },
        // {
        //     id : 7,
        //     group : [],
        //     label : "Expenses",
        //     href : "/expenses",
        //     href1 : '',
        //     drop : false,
        //     icon : <ReceiptText size={20} />,
        //     active : pathname === '/expenses'
        // },

        // {
        //     id : 7,
        //     group : [],
        //     label : "Information",
        //     href : "/information",
        //     href1 : '',
        //     drop : false,
        //     icon : <Info size={20} />,
        //     active : pathname === '/information'
        // },
        // {
        //     id : 8,
        //     group : [
        //         {
        //             id : 81,
        //             label : "Upload List",
        //             g_href : "/uploadloist",
        //             g_href1 : ``,
        //             g_active : false,
        //         },
        //         {
        //             id : 82,
        //             label : "All List",
        //             g_href : "/alllist",
        //             g_href1 : ``,
        //             g_active : false,
        //         },
        //         {
        //             id : 83,
        //             label : "Contact List",
        //             g_href : "/contactlist",
        //             g_href1 : ``,
        //             g_active : false,
        //         }
        //     ],
        //     label : "My Listing",
        //     href : "",
        //     href1 : '',
        //     drop : false,
        //     icon : <ListChecks size={20} />,
        //     active : pathname === '/uploadloist' ||
        //     pathname === '/alllist' ||
        //     pathname === '/contactlist',
        // },
        
        // {
        //     id : 10,
        //     group : [],
        //     label : "Tickets",
        //     href : "/tickets",
        //     href1 : '',
        //     drop : false,
        //     icon : <Tag size={20} />,
        //     active : pathname === '/tickets'
        // },
        // {
        //     id : 11,
        //     group : [],
        //     label : "Notice Board",
        //     href : "/notice",
        //     href1 : '',
        //     drop : false,
        //     icon : <Presentation size={20} />,
        //     active : pathname === '/notice'
        // },
 
        // {
        //     id : 13,
        //     group : [
        //         {
        //             id : 131,
        //             label : "SMS",
        //             g_href : "/sms",
        //             g_href1 : ``,
        //             g_active : false,
        //         },
        //         {
        //             id : 132,
        //             label : "Email",
        //             g_href : "/email",
        //             g_href1 : ``,
        //             g_active : false,
        //         },
        //         {
        //             id : 133,
        //             label : "Email Template",
        //             g_href : "/emailtamplate",
        //             g_href1 : ``,
        //             g_active : false,
        //         }
        //     ],
        //     label : "Bulk SMS/Mail",
        //     href : "",
        //     href1 : '',
        //     drop : false,
        //     icon : <Mail size={20} />,
        //     active : pathname === '/sms' ||
        //     pathname === '/email' ||
        //     pathname === '/emailtamplate',
        // },
        // {
        //     id : 14,
        //     group : [],
        //     label : "Aggrement",
        //     href : "/aggrement",
        //     href1 : '',
        //     drop : false,
        //     icon : <UserRoundCheck size={20} />,
        //     active : pathname === '/aggrement',
        // },
        {
            id : 15,
            group : [
                {
                    id : 81,
                    label : "My Profile",
                    g_href : "/profile/my_profile",
                    g_href1 : ``,
                    g_active : false
                },
                {
                    id : 82,
                    label : "Change Password",
                    g_href : "/profile/change_password",
                    g_href1 : ``,
                    g_active : false
                },
                {
                    id : 82,
                    label : "Change User Name",
                    g_href : "/profile/change_email",
                    g_href1 : ``,
                    g_active : false
                },
            ],
            label : "Profile",
            href : "/profile",
            drop : false,
            icon : <CircleUser size={20} />,
            active : false
        },
        // {
        //     id : 16,
        //     group : [],
        //     label : "My Subscription",
        //     href : "/subscription",
        //     href1 : '',
        //     drop : false,
        //     icon : <CalendarCheck size={20} />,
        //     active : pathname === '/subscription',
        // },
    ])

    useEffect(()=>{

        const temp = menu.map((item) =>{
            // ||  pathname === item.href + '/' + params.id
            if (pathname === item.href || pathname === item.href1 ) {
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
        </>
        
     );
}
 
export default OwnerMenuEx;