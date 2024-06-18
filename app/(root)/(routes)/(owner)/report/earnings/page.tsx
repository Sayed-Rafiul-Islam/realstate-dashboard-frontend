"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EarningsProps, EarningsReducerProps, OwnerExpensesReducerProps, OwnerInfoReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { EarningsClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";


const EarningsPage = () => {

    const rents = useSelector(({rentsReducer} : RentsReducerProps) => rentsReducer).rents
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
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Earning Report</h1>
                    <Button className="flex gap-2 bg-purple-600"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <EarningsClient data={rents} />
                </div>
            </div>
        </div>
     );
}
 
export default EarningsPage;