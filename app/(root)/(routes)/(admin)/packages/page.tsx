"use client"

import { PackageProps, PackagesReducersProps } from "@/types";
import { useSelector } from "react-redux";
import { PackagesClinet } from "./components/client";
import Pathname from "@/components/pathname";

const Packages = () => {

    const {packages} = useSelector(({packagesReducer} : PackagesReducersProps) => packagesReducer)

    const formattedPackages : PackageProps[] = packages.map((
        {
            _id,
            label,
            monthlyPrice,
            yearlyPrice,
            maxProperty,
            maxUnit,
            status,
            trial
        } : PackageProps,index : number) => ({
            // serial : index + 1,
            _id,
            label,
            monthlyPrice,
            yearlyPrice,
            maxProperty,
            maxUnit,
            status,
            trial
    }))

    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">All Packages</h1>
                <Pathname />
            </div>
            <PackagesClinet data={formattedPackages} />
        </div>
        
    </div>
     );
}
 
export default Packages;