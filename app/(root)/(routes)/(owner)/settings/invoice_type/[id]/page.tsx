"use client"

import { useSelector } from "react-redux";
import { ExpenseTypeProps, OwnerInvoiceTypesReducerProps} from "@/types";
import { InvoiceTypeForm } from "./components/invoice-type-form";

const InvoiceTypeFormPage = ({
    params
} : {
    params : { id : string}
}) => {
    const invoiceTypes = useSelector(({ownerInvoiceTypesReducer} : OwnerInvoiceTypesReducerProps) => ownerInvoiceTypesReducer).ownerInvoiceTypes

    const initialData = invoiceTypes.filter((item : ExpenseTypeProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div>
            <div className="flex-1 pt-6 space-y-4">
                <InvoiceTypeForm initialData={initialData[0]} />
            </div>
        </div>
     );
}
 
export default InvoiceTypeFormPage;