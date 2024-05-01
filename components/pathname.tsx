"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminMenu } from "./menus/menus";
  

const Pathname = () => {
    // const pathname = usePathname().split("/").slice(1)
    const pathname = usePathname()
    const menu = AdminMenu
    console.log(menu)
    // console.log(pathname)




    // const x = '/dashboard/shop/here'.split("/")
    // const y = x.slice(1)
    return ( 
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                        <Link prefetch href='/'>Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {
                        menu.map(({id,label,group,href},index) => {
                            if (!group.length) {
                                if (pathname === href) {
                                    return (
                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbPage>{label}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    )
                                }
                                else if (pathname === href + '/add') {
                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                            <Link prefetch href={href}>{label}</Link>
                                        </BreadcrumbItem>

                                         <BreadcrumbSeparator />

                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbPage>Add</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </div>
                                    )
                                    
                                }
                            } 
                            else {
                                return (
                                    <div key={index} className="flex items-center gap-2">
                                        {/* <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                            <Link prefetch href={`/${z}`}>{z[0].toUpperCase()+z.slice(1)}</Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator /> */}
                                    </div>
                                )
                            }
                            

                        })   
                    }
                    {/* {
                        pathname.map((z,index) => {
                            if (pathname.length -1 === index) {
                                return (
                                    <BreadcrumbItem key={index}>
                                        <BreadcrumbPage>{z[0].toUpperCase()+z.slice(1)}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )
                            } else {
                                return (
                                    <div key={index} className="flex items-center gap-2">
                                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                            <Link prefetch href={`/${z}`}>{z[0].toUpperCase()+z.slice(1)}</Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </div>
                                )
                            }
                            

                        })   
                    } */}
                </BreadcrumbList>
            </Breadcrumb>

        </div>
     );
}
 
export default Pathname;