"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EarningsProps, EarningsReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { EarningsClient } from "./components/client";


const OccupancyPage = () => {

    const router = useRouter()

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const formattedProperties = properties.map((
        {
            _id,
            name,
            unitCount,
            description,
            address,
            coverImage,
            deposit,
            lateFee,
            rent,
            rentType,
            city,
            state,
            country,
            postCode,
        },index) => {
            return {
                SL : index + 1,
                _id,
                name,
                unitCount,
                description,
                address,
                coverImage,
                deposit,
                lateFee,
                rent,
                rentType,
                city,
                state,
                country,
                postCode,
            }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">All Occupancy</h1>
                    <Button  className="flex gap-2 bg-purple-600"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <EarningsClient data={formattedProperties} />
                </div>
            </div>
        </div>
     );
}
 
export default OccupancyPage;