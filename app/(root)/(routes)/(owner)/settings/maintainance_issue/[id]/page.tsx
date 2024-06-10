"use client"

import { useSelector } from "react-redux";
import { MaintainanceTypeProps, MaintainanceTypesReducerProps, OwnerMaintainanceTypesReducerProps} from "@/types";
import { MaintainanceIssueForm } from "./components/maintainance-type-form";

const MaintainanceIssueFormPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {ownerMaintainanceTypes} = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer)

    const initialData = ownerMaintainanceTypes.filter((item : MaintainanceTypeProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div>
            <div className="flex-1 pt-6 space-y-4">
                <MaintainanceIssueForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default MaintainanceIssueFormPage;