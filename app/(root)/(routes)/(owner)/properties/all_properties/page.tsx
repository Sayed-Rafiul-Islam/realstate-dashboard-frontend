"use client"

import { PropertiesReducerProps } from "@/types";
import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Properties from "@/app/(root)/(routes)/(owner)/properties/all_properties/components/properties";
import { useRouter } from "next/navigation";


const AllPropertiesPage = () => {
    const router = useRouter()

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Packages</h1>
                    <Button onClick={()=>router.push('/properties/add')}  className="bg-purple-600">Add New Property</Button>
                </div>
                <Separator />
                <div>
                    <Properties data={properties} />
                </div>
            </div>
        </div>
     );
}
 
export default AllPropertiesPage;