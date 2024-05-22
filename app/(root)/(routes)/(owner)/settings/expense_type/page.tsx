"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExpenseTypesReducerProps, ExpensesReducerProps } from "@/types";
import { ExpenseTypesClient } from "./components/client";


const ExpenseTypePage = () => {

    const router = useRouter()
    const {expenseTypes} = useSelector(({expenseTypesReducer} : ExpenseTypesReducerProps) => expenseTypesReducer)

    console.log(expenseTypes)
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
                    <Button  className="flex gap-2">New Type</Button>
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