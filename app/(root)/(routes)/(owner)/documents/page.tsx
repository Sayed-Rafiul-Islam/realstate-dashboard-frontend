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

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)



    const formattedDocuments = documents.map((
        {
            _id,
            type,
            tenantId,
            docFront,
            docBack,
            status
        },index : number) => {
            const tenant = tenants.filter((item)=> item._id === tenantId)[0]
            const property = properties.filter((item)=> item._id === tenant.propertyId)[0]
            const unit = units.filter((item)=> item._id === tenant.unitId)[0]
            return {
                serial : index + 1,
                _id,
                type,
                tenantName : tenant.name,
                property_unit : `${property.name}/${unit.name}`,
                docFront,
                docBack,
                status
            }
           
    })

    console.log(documents)

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Documents</h1>
                    <Pathname />
                </div>
                <Separator />
                <div>
                    <DocumentsClient data={formattedDocuments} />
                </div>
            </div>
        </div>
     );
}
 
export default DocumnetsPage;