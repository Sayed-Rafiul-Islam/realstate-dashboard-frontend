"use client"

import { Separator } from "@/components/ui/separator";
import { MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, MaintainerInfoReducerProps, PropertiesReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps, UsersReducerProps } from "@/types";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { MaintainanceClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const AllRequests = () => {

    const maintainer = useSelector(({maintainerInfoReducer} : MaintainerInfoReducerProps)=> maintainerInfoReducer).maintainerInfo

    const {maintainanceRequests} = useSelector(({maintainanceReducer} : MaintainanceRequestsReducerProps) => maintainanceReducer)
    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const requests = maintainanceRequests.filter((item)=>item.maintainer._id === maintainer._id)
    const formattedRequests = requests.map((
        {
            _id,
            date,
            requestNo,
            type,
            property,
            unit,
            issue,
            status,
            details,
            cost,
            attachment,
            paymentStatus
        }) => {
            const typeName  = maintainanceTypes.filter(({_id}) =>_id === type._id)[0]?.type
            const propertyName  = properties.filter(({_id}) =>_id === property._id)[0]?.name
            const unitName  = units.filter(({_id}) =>_id === unit._id)[0]?.name

            return {
                _id,
                propertyId : property._id,
                unitId : unit._id,
                date : format(date,"MMMM do, yyyy"),
                requestNo,
                type : typeName,
                typeId : type._id,
                issue,
                status,
                details,
                cost,
                attachment,
                property_unit : `${propertyName}/${unitName}`,
                paymentStatus
            }
    })
   
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