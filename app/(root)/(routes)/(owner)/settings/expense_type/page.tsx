"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OwnerExpenseTypesReducerProps, OwnerInfoReducerProps } from "@/types";
import { ExpenseTypesClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";


const ExpenseTypePage = () => {

    const router = useRouter()
    const expenseTypes = useSelector(({OwnerExpenseTypesReducer} : OwnerExpenseTypesReducerProps) => OwnerExpenseTypesReducer).ownerExpenseTypes


    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
 

    // const [data,setData] = useState(expenseTypes)
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} = await api.get(`getOwnerExpenseType?ownerId=${owner._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])
    
    const formattedExpenseTypes = expenseTypes.map((
        {
            _id,
            title,
        },index) => ({
            SL : index + 1,
            _id,
            title         
        }))

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Expense Type</h1>
                    <Button  className="flex gap-2 bg-purple-600" onClick={()=>router.push('/settings/expense_type/add')}>New Type</Button>
                </div>
                <Separator />
                <div>
                    <ExpenseTypesClient data={formattedExpenseTypes} />
                </div>
            </div>
        </div>
     );
}
 
export default ExpenseTypePage;