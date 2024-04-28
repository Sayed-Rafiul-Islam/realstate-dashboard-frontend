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
                    <BreadcrumbItem>
                        <Link prefetch href='/'>Dashboard</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {
                        pathname.map((z,index) => {
                            if (pathname.length -1 === index) {
                                return (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{z[0].toUpperCase()+z.slice(1)}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )
                            } else {
                                return (
                                    <>
                                        <BreadcrumbItem>
                                            <Link prefetch href={`/${z}`}>{z[0].toUpperCase()+z.slice(1)}</Link>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </>
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