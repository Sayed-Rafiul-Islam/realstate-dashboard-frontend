"use client"

import { useSelector } from "react-redux";
import { MaintainanceRequestProps, TenantMaintainanceRequestsReducerProps } from "@/types";
import { MaintainanceRequestForm } from "./components/maintainance-form";

const MaintainerSettingsPage = ({
    params
} : {
    params : { id : string}
}) => {
    const requests = useSelector(({tenantMaintainanceReducer} : TenantMaintainanceRequestsReducerProps) => tenantMaintainanceReducer).tenantMaintainanceRequests

    const initialData = requests.filter((item : MaintainanceRequestProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
            <MaintainanceRequestForm initialData={initialData[0]} />
     );
}
 
export default MaintainerSettingsPage;