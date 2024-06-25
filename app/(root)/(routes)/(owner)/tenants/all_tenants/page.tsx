"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OwnerInfoReducerProps, OwnerTenantsReducerProps, PropertiesReducerProps, TenantProps, TenantsReducerProps, UnitProps, UnitsReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Tenants from "./components/tenants";
import { TenantColumn } from "@/app/(root)/(routes)/(owner)/tenants/tenants_history/components/column";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getOwnerTenants } from "@/redux/data/owner/tenantsSlice";


const AllTenants = () => {
    const router = useRouter()
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const tenants = useSelector(({ownerTenantsReducer} : OwnerTenantsReducerProps) => ownerTenantsReducer).ownerTenants

    const [data,setData] = useState(tenants)

  
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} =  await api.get(`getOwnerTenants?id=${owner._id}`,{validateStatus: () => true})         
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])
        
        

    const formattedtenants : TenantColumn[] = data.map((
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

    // if (!isMounted) {
    //     return null
    // }


   
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