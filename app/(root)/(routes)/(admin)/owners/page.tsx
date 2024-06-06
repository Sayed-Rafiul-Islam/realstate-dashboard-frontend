"use client"

import { OwnerProps, OwnersReducerProps } from "@/types";
import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { OwnersClient } from "./components/client";

const OwnerPackages = () => {

    const {owners} = useSelector(({ownersReducer} : OwnersReducerProps) => ownersReducer)

    const formattedOwners : OwnerProps[] = owners.map((
        {
            _id,
            name,
            email,
            contactNo,
            status,
            userId
        } : OwnerProps,index : number) => ({
            serial : index + 1,
            _id,
            name,
            email,
            contactNo,
            status,
            userId
    }))



    // console.log(ownerPackages)

    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">Owners</h1>
                <Pathname />
            </div>
            <Separator />              
                <OwnersClient data={formattedOwners} />
        </div>
        
    </div>
     );
}
 
export default OwnerPackages;