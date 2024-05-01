"use client"

import { OwnerPackageProps, OwnerPackagesReducersProps } from "@/types";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { OwnerPAckagesClient } from "./components/client";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const OwnerPackages = () => {

    const {ownerPackages} = useSelector(({ownerPackagesReducer} : OwnerPackagesReducersProps) => ownerPackagesReducer)


    const formattedOwnerPackages : OwnerPackageProps[] = ownerPackages.map((
        {
            _id,
            name,
            email,
            packageName,
            gateway,
            startDate,
            endDate,
            paymentStatus,
            status
        } : OwnerPackageProps,index : number) => ({
            serial : index + 1,
            _id,
            name,
            email,
            packageName,
            gateway,
            startDate : format(startDate,"MMMM do, yyyy"),
            endDate : format(endDate,"MMMM do, yyyy"),
            paymentStatus,
            status
    }))


    // console.log(ownerPackages)

    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">My Profile</h1>
                <Pathname />
            </div>
            <Separator />              
                <OwnerPAckagesClient data={formattedOwnerPackages} />
        </div>
        
    </div>
     );
}
 
export default OwnerPackages;