"use client"

import { useSelector } from "react-redux";
import { ExpenseTypeProps, OwnerExpenseTypesReducerProps} from "@/types";
import { ExpenseTypeForm } from "./components/expense-type-form";

const ExpenseTypeFormPage = ({
    params
} : {
    params : { id : string}
}) => {
    const expenseTypes = useSelector(({OwnerExpenseTypesReducer} : OwnerExpenseTypesReducerProps) => OwnerExpenseTypesReducer).ownerExpenseTypes

    const initialData = expenseTypes.filter((item : ExpenseTypeProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div>
            <div className="flex-1 pt-6 space-y-4">
                <ExpenseTypeForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default ExpenseTypeFormPage;