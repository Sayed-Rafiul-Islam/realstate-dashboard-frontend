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
            NID,
            due,
            age,
            familyMember,
            status,
        } : TenantProps,index : number) => {
            const propertyName  = properties.filter(({_id}) =>_id === propertyId)[0]?.name
            const unit  = units.filter(({_id}) =>_id === unitId)[0]
            return {
                serial : index + 1,
                _id,
                propertyId,
                unitId,
                propertyName : propertyName ? propertyName : '',
                unitName : unit ? unit.name : '',
                monthlyRent : unit ? unit.rent : '',
                name,
                image,
                email,
                phone,
                occupation,
                startDate,
                NID,
                due,
                age,
                familyMember,
                status
            }
    })


   
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-end md:items-center">

                    {/* <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                                <Link prefetch href='/'>Dashboard</Link>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    Tenants
                                </BreadcrumbPage>
                            </BreadcrumbItem>   
                        </BreadcrumbList>
                    </Breadcrumb> */}

                    <Pathname />
                </div>

                <div className="flex justify-between items-center"> 
                    <h1 className="font-bold text-xl">All Tenants</h1>
                    <Button onClick={()=>router.push('/tenants/add')} className="">Add New Tenant</Button>
                </div>
                <Separator />

                <Tenants data={formattedtenants} />
            </div>
        </div>
     );
}
 
export default AllTenants;