"use client"

import { useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GatewaysReducerProps, InvoiceTypesReducerProps, InvoicesReducerProps, PropertiesReducerProps, TenantInfoReducerProps, TenantInvoicesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { InvoicesClient } from "./components/client";
import Link from "next/link";
import { useState } from "react";


const TenantInvoicesPage = () => {
    const router = useRouter()
    const invoices = useSelector(({tenantInvoicesReducer} : TenantInvoicesReducerProps)=>tenantInvoicesReducer).tenantInvoices

    // const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    
    // const [data,setData] = useState(invoices)

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} = await api.get(`getTenantInvoices?property=${tenant.property._id}&unit=${tenant.unit._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
            <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/'>Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            Invoices
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Invoices</h1>
                </div>
                <Separator />
                <div>
                    <InvoicesClient data={invoices} />
                </div>
            </div>
        </div>
     );
}
 
export default TenantInvoicesPage;