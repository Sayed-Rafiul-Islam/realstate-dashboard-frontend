"use client"

import { useSelector } from "react-redux";
import { DocumentSettingsProps, DocumentSettingsReducerProps} from "@/types";
import { DocumentSettingsForm } from "./components/document-setting-form";

const DocumentSettingsFormPage = ({
    params
} : {
    params : { id : string}
}) => {
    const documentSettings = useSelector(({documentSettingsReducer} : DocumentSettingsReducerProps) => documentSettingsReducer).documentSettings

    const initialData = documentSettings.filter((item : DocumentSettingsProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div>
            <div className="flex-1 pt-6 space-y-4">
                <DocumentSettingsForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default DocumentSettingsFormPage;