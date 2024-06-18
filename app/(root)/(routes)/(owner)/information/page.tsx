"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DocumentsReducerProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { DocumentsClient } from "./components/client";


const DocumnetsPage = () => {
    const router = useRouter()
    const {documents} = useSelector(({documentsReducer} : DocumentsReducerProps) => documentsReducer)

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Documents</h1>
                    <Pathname />
                </div>
                <Separator />
                <div>
                    <DocumentsClient data={documents} />
                </div>
            </div>
        </div>
     );
}
 
export default DocumnetsPage;