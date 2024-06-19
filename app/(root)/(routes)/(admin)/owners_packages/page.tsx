"use client"

import { AllOwnerPackagesReducersProps, OwnerPackageProps, OwnerPackagesReducersProps } from "@/types";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { OwnerPackagesClient } from "./components/client";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";

const OwnerPackages = () => {

    const {allOwnerPackages} = useSelector(({allOwnerPackagesReducer} : AllOwnerPackagesReducersProps) => allOwnerPackagesReducer)

    const formattedOwnerPackages = allOwnerPackages.map((
        {
            _id,
            owner,
            pack,
            gateway,
            startDate,
            endDate,
            status
        } : OwnerPackageProps,index : number) => ({
            serial : index + 1,
            _id,
            owner,
            pack,
            gateway,
            startDate : format(startDate,"MMMM do, yyyy"),
            endDate : format(endDate,"MMMM do, yyyy"),
            status
    }))

    console.log(formattedOwnerPackages)

    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">Owner Packages</h1>
                <Pathname />
            </div>
            <Separator />              
                <OwnerPackagesClient data={formattedOwnerPackages} />
        </div>
        
    </div>
     );
}
 
export default OwnerPackages;