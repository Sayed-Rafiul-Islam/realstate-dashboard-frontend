"use client"
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { PropertiesReducerProps, UnitsReducerProps } from "@/types";
import { useSelector } from "react-redux";
import { UnitColumn } from "./components/column";
import { UnitsClient } from "./components/client";

const AllUnitsPage = () => {

    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)

    const formattedUnits : UnitColumn[] = units.map((
        {
            _id,
            propertyId,
            name,
            tenant,
            rent

        },index : number) => {
            const propertyName  = properties.filter(({_id}) =>_id === propertyId)[0].name
            return {
                _id,
                serial : index + 1,
                name,
                tenant,
                propertyName,
                rent
            }
        })

        console.log(formattedUnits)
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Units</h1>
                    <Pathname />
                </div>
                <Separator />              
                <UnitsClient data={formattedUnits} />
                
            </div>
        </div>
     );
}
 
export default AllUnitsPage;