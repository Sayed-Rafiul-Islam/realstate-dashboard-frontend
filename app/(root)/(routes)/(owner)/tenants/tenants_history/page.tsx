"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OwnerInfoReducerProps, PropertiesReducerProps, TenantProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { TenantColumn } from "./components/column";
import { TenantsClient } from "./components/client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

const AllTenants = () => {

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const tenants = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer).tenants
    .filter((tenant) => tenant.owner._id === owner._id)

    const formattedtenants : TenantColumn[] = tenants.map((
        {
            _id,
            name,
            occupation,
            startDate,
            endDate,
            due,
            age,
            familyMembers,
            status,
            personalDoc,
            propertyDoc,
            property,
            unit,
            owner,
            user
        } : TenantProps,index : number) => {
            return {
                serial : index + 1,
                _id,
                name,
                occupation,
                startDate,
                endDate,
                due,
                age,
                familyMembers,
                status,
                personalDoc,
                propertyDoc,
                property,
                unit,
                owner,
                user
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