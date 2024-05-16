"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EarningsProps, EarningsReducerProps, ExpenseProps, ExpensesReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { ExpensesClient } from "./components/client";


const ExpensesPage = () => {

    const router = useRouter()
    const {expenses} = useSelector(({expensesReducer} : ExpensesReducerProps) => expensesReducer)

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    let totalAmount = 0
    expenses.map(({amount} : ExpenseProps)=>{
        totalAmount = totalAmount + amount
    })


    const formattedExpenses = expenses.map((
        {
            _id,
            name,
            propertyId,
            unitId,
            type,
            amount,
            description
        }) => {
            const property = properties.filter((item)=> item._id === propertyId)[0]
            const unit = units.filter((item)=> item._id === unitId)[0]
            return {
                _id,
                name,
                propertyId,
                unitId,
                property_unit : `${property.name}/${unit.name}`,
                type,
                description,
                amount : `BDT ${amount}`,
                total : `${totalAmount} BDT`
            }
           
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">All Expenses</h1>
                    <Button onClick={()=>router.push('/invoices/add')}  className="flex gap-2"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <ExpensesClient data={formattedExpenses} />
                </div>
            </div>
        </div>
     );
}
 
export default ExpensesPage;