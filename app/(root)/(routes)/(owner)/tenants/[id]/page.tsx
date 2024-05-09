"use client"

import { useSelector } from "react-redux";
import { TenantProps, TenantsReducerProps } from "@/types";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { TenantForm } from "./components/tenant-form";

const PackagePage = ({
    params
} : {
    params : { id : string}
}) => {
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)

    const initialData = tenants.filter((item : TenantProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
            <TenantForm initialData={initialData[0]} />
     );
}
 
export default PackagePage;