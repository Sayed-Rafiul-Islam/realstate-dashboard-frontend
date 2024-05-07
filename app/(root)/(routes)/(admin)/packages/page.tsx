"use client"

import { PackageProps, PackagesReducersProps } from "@/types";
import { useSelector } from "react-redux";
import { PackagesClient } from "./components/client";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const Packages = () => {

    const router = useRouter()
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
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Packages</h1>
                    <Pathname />
                </div>
                <Separator />
                <div className="flex justify-end"> 
                    <Button onClick={()=>router.push('/packages/add')} className="">Add Package</Button>
                </div>
                <PackagesClient data={formattedPackages} />
            </div>
        </div>
     );
}
 
export default Packages;