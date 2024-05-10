"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExpensesReducerProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { ExpensesClient } from "./components/client";


const ExpensesPage = () => {
    const router = useRouter()
    const {expenses} = useSelector(({expensesReducer} : ExpensesReducerProps) => expensesReducer)

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)



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
                property_unit : `${property.name}/${unit.name}`,
                type,
                description,
                amount : `BDT ${amount}`,
            }
           
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Expenses</h1>
                    <Pathname />
                </div>
                <Separator />
                <div className="flex justify-end"> 
                    <Button onClick={()=>router.push('/expenses/add')}  className="">New Expense</Button>
                </div>
                <div>
                    <ExpensesClient data={formattedExpenses} />
                </div>
            </div>
        </div>
     );
}
 
export default ExpensesPage;