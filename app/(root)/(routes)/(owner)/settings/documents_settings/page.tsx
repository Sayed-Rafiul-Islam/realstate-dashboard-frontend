"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DocumentSettingsReducerProps, OwnerExpenseTypesReducerProps, OwnerInfoReducerProps } from "@/types";
import { DocumentSettingsClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";


const DocumentSettingsPage = () => {

    const router = useRouter()
    const documentSettings = useSelector(({documentSettingsReducer} : DocumentSettingsReducerProps) => documentSettingsReducer).documentSettings

    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    // const [data,setData] = useState(documentSettings)
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} = await api.get(`getOwnerDocumentSettings?ownerId=${owner._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])
    

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Document Settings</h1>
                    <Button  className="flex gap-2 bg-purple-600" onClick={()=>router.push('/settings/documents_settings/add')}>New Settings</Button>
                </div>
                <Separator />
                <div>
                    <DocumentSettingsClient data={documentSettings} />
                </div>
            </div>
        </div>
     );
}
 
export default DocumentSettingsPage;