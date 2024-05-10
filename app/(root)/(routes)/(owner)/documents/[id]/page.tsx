"use client"

import { useSelector } from "react-redux";
import { PackageEditForm } from "./components/package-edit-form";
import { PackageProps, PackagesReducersProps, PropertiesReducerProps, PropertyProps, UnitsReducerProps } from "@/types";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";

const DocumentPage = ({
    params
} : {
    params : { id : string}
}) => {
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const initialData = properties.filter((item : PropertyProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div>
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">Edit Document</h1>
                    <Pathname />
                </div>
                <Separator />
            <PackageEditForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default DocumentPage;