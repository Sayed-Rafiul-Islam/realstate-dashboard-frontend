"use client"
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { OwnerInfoReducerProps, OwnerTenantsReducerProps, OwnerUnitsReducerProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { UnitsClient } from "./components/client";
import { useEffect, useState } from "react";
import { getOwnerUnits } from "@/redux/data/owner/unitsSlice";
import api from "@/actions/api";

const AllUnitsPage = () => {

    const tenants = useSelector(({ownerTenantsReducer} : OwnerTenantsReducerProps) => ownerTenantsReducer).ownerTenants
    const units = useSelector(({ownerUnitsReducer} : OwnerUnitsReducerProps) => ownerUnitsReducer).ownerUnits
    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    // const [data,setData] = useState(units)
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} =  await api.get(`getOwnerUnits?id=${owner._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])
           





    const formattedUnits = units.map((
        {
            _id,
            name,
            image,
            property,
            description,
            condition,
            squareFeet,
            bedrooms,
            washrooms,
            kitchens,
        },index : number) => {
            const tenant = tenants.filter((tenant) => tenant.unit._id === _id)[0]
            return {
                _id,
                serial : index + 1,
                name,
                tenant,
                propertyName : property?.name,
                rent : property?.rent,
                image,
                property,
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