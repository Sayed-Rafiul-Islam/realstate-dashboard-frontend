"use client"

import { Separator } from "@/components/ui/separator";
import { MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, MaintainerInfoReducerProps, MaintainerMaintainanceRequestsReducerProps, PropertiesReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps, UsersReducerProps } from "@/types";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { MaintainanceClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const AllRequests = () => {

    const maintainer = useSelector(({maintainerInfoReducer} : MaintainerInfoReducerProps)=> maintainerInfoReducer).maintainerInfo

    const requests = useSelector(({maintainerMaintainanceReducer} : MaintainerMaintainanceRequestsReducerProps)=>maintainerMaintainanceReducer).maintainerMaintainanceRequests

    const formattedRequests = requests.map((
        {
            _id,
            date,
            requestNo,
            propertyName,
            unitName,
            type,
            property,
            unit,
            issue,
            status,
            details,
            cost,
            attachment,
            paymentStatus
        }) => ({
                _id,
                propertyId : property._id,
                unitId : unit._id,
                date : format(date,"MMMM do, yyyy"),
                requestNo,
                type : type.type,
                typeId : type._id,
                issue : details,
                status,
                details,
                cost,
                attachment,
                property_unit : `${propertyName}/${unitName}`,
                paymentStatus
    }))
   
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

                <MaintainanceClient data={formattedRequests} />
                
            </div>
        </div>
     );
}
 
export default AllRequests;