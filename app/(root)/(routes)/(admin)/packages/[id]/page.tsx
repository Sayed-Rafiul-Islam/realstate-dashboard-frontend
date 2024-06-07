"use client"

import { useSelector } from "react-redux";
import { PackageEditForm } from "./components/package-edit-form";
import { PackageProps, PackagesReducersProps } from "@/types";

const PackagePage = ({
    params
} : {
    params : { id : string}
}) => {
    const {packages} = useSelector(({packagesReducer} : PackagesReducersProps) => packagesReducer)
    const initialData = packages.filter((item : PackageProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div className="mt-8">
            <PackageEditForm initialData={initialData[0]} />
        </div>
     );
}
 
export default PackagePage;