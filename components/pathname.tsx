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
import { useParams, usePathname } from "next/navigation";
  

const Pathname = () => {
    const pathname = usePathname().split("/").slice(1)
    const params = useParams()
    const id = params.id
    const details = params.detail_id


    
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
                                const x = z.split("_")

                                if (x.length > 1) {
                                    return (
                                    <BreadcrumbItem key={index}>
                                        <BreadcrumbPage >
                                            {
                                                 x.map((y,index)=>
                                                    <span key={index}>{y[0].toUpperCase()+y.slice(1)} </span>
                                                )
                                            }
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                               
                                                    
                                )
                                } else {
                                    return (
                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbPage>
                                                {
                                                    ((details || id) && z !== 'add') ?
                                                    <div>
                                                        { details && "Details" }
                                                        { id && "Edit" }
                                                    </div>
                                                    :
                                                    z[0].toUpperCase()+z.slice(1)
                                                }
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    )
                                }                                
                            } else {
                                    const x = z.split("_")
                                    if (x.length > 1) {
                                        return (
                                        <div key={index} className="flex items-center gap-2">
                                            <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                                <Link prefetch href={`/${z}`}>
                                                    {
                                                        x.map((y,index)=>
                                                            <span key={index}>{y[0].toUpperCase()+y.slice(1)} </span>
                                                        )
                                                    }
                                                </Link>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                        </div>
                                                        
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

                            }
                            

                        })   
                    }
                </BreadcrumbList>
            </Breadcrumb>

        </div>
     );
}
 
export default Pathname;