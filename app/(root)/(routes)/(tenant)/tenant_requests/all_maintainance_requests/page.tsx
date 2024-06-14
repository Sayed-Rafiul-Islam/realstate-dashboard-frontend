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
import { useEffect, useState } from "react";

const AllRequests = () => {

    const router = useRouter()
    const requests = useSelector(({tenantMaintainanceReducer} : TenantMaintainanceRequestsReducerProps) => tenantMaintainanceReducer).tenantMaintainanceRequests

   
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
                            <Link prefetch href='/tenant_requests'>Maintainance Requests</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            All Maintainance Requests
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">Maintainance Requests</h1>
                    <Button className="lg:w-1/4 md:w-1/5 w-2/3 bg-purple-500" onClick={()=>router.push('/tenant_requests/add')}>New Request</Button>
                </div>
                <Separator />

                <MaintainanceClient data={requests} />
                
            </div>
        </div>
     );
}
 
export default AllRequests;