"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, PropertiesReducerProps, TenantInfoReducerProps, TenantMaintainanceRequestsReducerProps, TenantsReducerProps, UnitsReducerProps, UsersReducerProps } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MaintainanceClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { PrinterIcon } from "lucide-react";
import { useEffect, useState } from "react";

const AllRequests = () => {


    const requests = useSelector(({tenantMaintainanceReducer} : TenantMaintainanceRequestsReducerProps) => tenantMaintainanceReducer).tenantMaintainanceRequests
    // const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    
    // const [data,setData] = useState(requests)

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} =  await api.get(`getTenantRequests?propertyId=${tenant.property._id}&unitId=${tenant.unit._id}`,{validateStatus: () => true})
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
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/tenant_reports/all_rents'>Report</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            All Maintainance
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">All Maintainance</h1>
                    <Button className="lg:w-1/4 md:w-1/5 w-2/3 bg-purple-500 flex items-center gap-2" 
                        // onClick={()=>router.push('/tenant_requests/add')}
                    ><PrinterIcon size={20} />Export</Button>
                </div>
                <Separator />

                <MaintainanceClient data={requests} />
                
            </div>
        </div>
     );
}
 
export default AllRequests;