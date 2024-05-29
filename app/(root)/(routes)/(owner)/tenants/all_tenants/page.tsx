"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PropertiesReducerProps, TenantProps, TenantsReducerProps, UnitProps, UnitsReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Tenants from "./components/tenants";
import { TenantColumn } from "@/app/(root)/(routes)/(owner)/tenants/tenants_history/components/column";
import { useEffect, useState } from "react";


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
                monthlyRent : unit ? `${property.rent}` : '',
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