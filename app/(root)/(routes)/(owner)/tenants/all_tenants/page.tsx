"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OwnerInfoReducerProps, PropertiesReducerProps, TenantProps, TenantsReducerProps, UnitProps, UnitsReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Tenants from "./components/tenants";
import { TenantColumn } from "@/app/(root)/(routes)/(owner)/tenants/tenants_history/components/column";
import { useEffect, useState } from "react";


const AllTenants = () => {
    const router = useRouter()

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
                <Pathname />
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">All Tenants</h1>
                    <Button className="lg:w-1/4 md:w-1/5 w-2/3 bg-purple-600" onClick={()=>router.push('/tenants/add')}>Add New Tenant</Button>
                </div>
                <Separator />

                <Tenants data={formattedtenants} />
            </div>
        </div>
     );
}
 
export default AllTenants;