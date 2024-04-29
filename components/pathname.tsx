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
  

const Pathname = () => {
    const pathname = usePathname().split("/").slice(1)
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
                    }
                </BreadcrumbList>
            </Breadcrumb>

        </div>
     );
}
 
export default Pathname;