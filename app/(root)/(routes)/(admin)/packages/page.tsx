// "use client"

import { PackageProps } from "@/types";
import { useSelector } from "react-redux";
import { PackagesClinet } from "./components/client";

const Packages = () => {

    // const res = await fetch(`https://pos.inspiredinteriorbd.com/api/sellRecords`,{cache : "no-store", mode : 'no-cors'})
    // const records = await res.json()

    const packages = [
        {
            _id : "1",
            label : "Standard",
            monthlyPrice : 9.99,
            yearlyPrice : 99.99,
            maxProperty : 4,
            maxUnit : 8,
            status : true,
            trial : false
        },
        {
            _id : "2",
            label : "Free",
            monthlyPrice : 9.99,
            yearlyPrice : 99.99,
            maxProperty : 4,
            maxUnit : 8,
            status : true,
            trial : false
        },
        {
            _id : "3",
            label : "Standard",
            monthlyPrice : 9.99,
            yearlyPrice : 99.99,
            maxProperty : 4,
            maxUnit : 8,
            status : true,
            trial : false
        }
    ]


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
            <PackagesClinet data={formattedPackages} />
        </div>
        
    </div>
     );
}
 
export default Packages;