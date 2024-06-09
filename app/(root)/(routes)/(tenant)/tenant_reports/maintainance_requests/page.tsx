"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, PropertiesReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps, UsersReducerProps } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MaintainanceClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { PrinterIcon } from "lucide-react";

const AllRequests = () => {

    const router = useRouter()
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo

    const {maintainanceRequests} = useSelector(({maintainanceReducer} : MaintainanceRequestsReducerProps) => maintainanceReducer)
    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const thisTenantRequests = maintainanceRequests.filter(({propertyId,unitId})=>propertyId === tenant.property._id && unitId === tenant.unit._id)
    const formattedRequests = thisTenantRequests.map((
        {
            _id,
            date,
            requestNo,
            type,
            propertyId,
            unitId,
            issue,
            status,
            details,
            cost,
            attachment,
            responsibility,
            paymentStatus
        }) => {
            const typeName  = maintainanceTypes.filter(({_id}) =>_id === type)[0]?.type
            const propertyName  = properties.filter(({_id}) =>_id === propertyId)[0]?.name
            const unitName  = units.filter(({_id}) =>_id === unitId)[0].name

            return {
                _id,
                propertyId,
                unitId,
                date : format(date,"MMMM do, yyyy"),
                requestNo,
                type : typeName,
                typeId : type,
                issue : details,
                status,
                details,
                cost,
                attachment,
                property_unit : `${propertyName}/${unitName}`,
                responsibility,
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

                <MaintainanceClient data={formattedRequests} />
                
            </div>
        </div>
     );
}
 
export default AllRequests;