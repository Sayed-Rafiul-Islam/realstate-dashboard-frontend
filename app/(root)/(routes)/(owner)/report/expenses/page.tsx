"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EarningsProps, EarningsReducerProps, ExpenseProps, ExpensesReducerProps, MaintainanceTypesReducerProps, OwnerExpensesReducerProps, OwnerInfoReducerProps, OwnerMaintainanceRequestsReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { ExpensesClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";


const ExpensesPage = () => {

    const router = useRouter()
    const expenses = useSelector(({ownerExpensesReducer} : OwnerExpensesReducerProps) => ownerExpensesReducer).ownerExpenses

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
 

    const [data,setData] = useState(expenses)
   

    useEffect(()=>{
        const getData = async () => {
            const {data,status} =  await api.get(`getExpense?ownerId=${owner._id}`,{validateStatus: () => true})
            if (status === 200) {
                setData(data)
            }
        }
        getData()
    },[])


    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">All Expenses</h1>
                    <Button  className="flex gap-2 bg-purple-600"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <ExpensesClient data={data} />
                </div>
            </div>
        </div>
     );
}
 
export default ExpensesPage;