"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PropertiesReducerProps, TenantProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { TenantColumn } from "./components/column";
import { TenantsClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const AllTenants = () => {
    const router = useRouter()
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const formattedtenants : TenantColumn[] = tenants.map((
        {
            _id,
            propertyId,
            unitId,
            name,
            image,
            email,
            phone,
            occupation,
            startDate,
            endDate,
            NID,
            due,
            age,
            familyMember,
            status,
            personalDoc,
            propertyDoc
        } : TenantProps,index : number) => {
            const property  = properties.filter(({_id}) =>_id === propertyId)[0]
            const unit  = units.filter(({_id}) =>_id === unitId)[0]
            return {
                serial : index + 1,
                _id,
                propertyId,
                unitId,
                propertyName : property ? property.name : '',
                unitName : unit ? unit.name : '',
                monthlyRent : unit ? `${property.rent} BDT` : '',
                name,
                image,
                email,
                phone,
                occupation,
                startDate,
                endDate,
                NID,
                due,
                age,
                familyMember,
                status,
                personalDoc,
                propertyDoc
            }
    })
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex justify-end">
                    <Pathname />
                </div>
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">Tenants History</h1>
                </div>
                <Separator />
                <TenantsClient data={formattedtenants} />
            </div>
        </div>
     );
}
 
export default AllTenants;