"use client"

import { useSelector } from "react-redux";
import {TenantDocumentProps, TenantDocumentsReducerProps } from "@/types";

import { DocumentForm } from "./components/documant-form";

const DocumentPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {tenantDocuments} = useSelector(({tenantDocumentsReducer} : TenantDocumentsReducerProps) => tenantDocumentsReducer)

    
    const initialData = tenantDocuments.filter((item : TenantDocumentProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    console.log(initialData)
    return ( 
        <div>
            <div className="flex-1 p-8 pt-6 space-y-4">
                <DocumentForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default DocumentPage;