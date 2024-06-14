"use client"

import { Separator } from "@/components/ui/separator";
import {  MaintainerMaintainanceRequestsReducerProps } from "@/types";
import { useSelector } from "react-redux";
import { MaintainanceClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const AllRequests = () => {

    const requests = useSelector(({maintainerMaintainanceReducer} : MaintainerMaintainanceRequestsReducerProps)=>maintainerMaintainanceReducer).maintainerMaintainanceRequests
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
                            All Maintainance Requests
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">All Maintainance Requests</h1>
                </div>
                <Separator />

                <MaintainanceClient data={requests} />
                
            </div>
        </div>
     );
}
 
export default AllRequests;