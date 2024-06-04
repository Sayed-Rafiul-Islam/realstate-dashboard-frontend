"use client"

import { useSelector } from "react-redux";
import { MaintainanceRequestProps, MaintainanceRequestsReducerProps, MaintainerProps, MaintainersReducerProps } from "@/types";
import { MaintainanceRequestForm } from "./components/maintainance-form";

const MaintainerSettingsPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {maintainanceRequests} = useSelector(({maintainanceReducer} : MaintainanceRequestsReducerProps) => maintainanceReducer)

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