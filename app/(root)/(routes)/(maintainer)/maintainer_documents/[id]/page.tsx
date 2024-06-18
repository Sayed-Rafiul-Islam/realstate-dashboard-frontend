"use client"

import { useSelector } from "react-redux";
import { DocumentProps, MaintainerDocumentsReducerProps } from "@/types";

import { DocumentForm } from "./components/document-form";

const DocumentPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {maintainerDocuments} = useSelector(({maintainerDocumentsReducer} : MaintainerDocumentsReducerProps) => maintainerDocumentsReducer)

    console.log(maintainerDocuments)
    
    const initialData = maintainerDocuments.filter((item)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    return ( 
        <div>
            <div className="flex-1 p-8 pt-6 space-y-4">
                <DocumentForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default DocumentPage;