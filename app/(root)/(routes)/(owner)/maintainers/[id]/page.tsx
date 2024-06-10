"use client"

import { useSelector } from "react-redux";
import { MaintainerProps, MaintainersReducerProps, OwnerMaintainersReducerProps } from "@/types";
import { MaintainerForm } from "./components/maintainer-form";

const MaintainerSettingsPage = ({
    params
} : {
    params : { id : string}
}) => {
    const maintainers = useSelector(({ownerMaintainersReducer} : OwnerMaintainersReducerProps) => ownerMaintainersReducer).ownerMaintainers

    const initialData = maintainers.filter((item : MaintainerProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
            <MaintainerForm initialData={initialData[0]} />
     );
}
 
export default MaintainerSettingsPage;