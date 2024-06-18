"use client"

import { useDispatch, useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OwnerInfoReducerProps, OwnerInvoicesReducerProps, OwnerPropertyReducerProps, OwnerUnitsReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { RentsClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getOwnerUnits } from "@/redux/data/owner/unitsSlice";
import { getOwnerProperties } from "@/redux/data/owner/propertiesSlice";


const RentsPage = () => {
    
    const {rents} = useSelector(({rentsReducer} : RentsReducerProps)=>rentsReducer)   
    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    // const [data,setData] = useState(rents)
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} =  await api.get(`getRents?ownerId=${owner._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])
           

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Rents</h1>
                    <Button onClick={()=>{}}  className="flex gap-2 bg-purple-600"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <RentsClient data={rents} />
                </div>
            </div>
        </div>
     );
}
 
export default RentsPage;