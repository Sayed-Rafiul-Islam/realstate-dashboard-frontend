"use client"
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { UnitsReducerProps } from "@/types";
import { useSelector } from "react-redux";
import { UnitsClient } from "./components/client";

const AllUnitsPage = () => {

    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    const formattedUnits = units.map((
        {
            _id,
            name,
            image,
            property,
            tenant,
            description,
            condition,
            squareFeet,
            bedrooms,
            washrooms,
            kitchens,
        },index : number) => {
            return {
                _id,
                serial : index + 1,
                name,
                propertyName : property?.name,
                rent : property?.rent,
                image,
                property,
                tenant,
                description,
                condition,
                squareFeet,
                bedrooms,
                washrooms,
                kitchens,
            }
        })

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Units</h1>
                </div>
                <Separator />              
                <UnitsClient data={formattedUnits} />
                
            </div>
        </div>
     );
}
 
export default AllUnitsPage;