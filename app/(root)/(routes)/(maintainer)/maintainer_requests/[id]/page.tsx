"use client"

import { useSelector } from "react-redux";
import { MaintainanceRequestProps, MaintainanceRequestsReducerProps, MaintainerMaintainanceRequestsReducerProps, MaintainerProps, MaintainersReducerProps } from "@/types";
import { MaintainanceRequestForm } from "./components/maintainance-form";

const MaintainerSettingsPage = ({
    params
} : {
    params : { id : string}
}) => {
    const maintainanceRequests = useSelector(({maintainerMaintainanceReducer} : MaintainerMaintainanceRequestsReducerProps) => maintainerMaintainanceReducer).maintainerMaintainanceRequests

    const initialData = maintainanceRequests.filter((item : MaintainanceRequestProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
            <MaintainanceRequestForm initialData={initialData[0]} />
     );
}
 
export default MaintainerSettingsPage;