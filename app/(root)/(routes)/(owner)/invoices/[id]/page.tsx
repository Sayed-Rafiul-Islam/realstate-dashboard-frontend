"use client"

import { useSelector } from "react-redux";
import { InvoiceForm } from "./components/invoice-form";
import { InvoiceProps, InvoicesReducerProps, OwnerInvoicesReducerProps } from "@/types";


const PackagePage = ({
    params
} : {
    params : { id : string}
}) => {

    const invoices = useSelector(({ownerInvoicesReducer} : OwnerInvoicesReducerProps) => ownerInvoicesReducer).ownerInvoices

    const initialData = invoices.filter((item : InvoiceProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })[0]
    
    return ( 
        <div>
            <div className="flex-1 p-8 pt-6 space-y-4">
                <InvoiceForm initialData={initialData} />
            </div>
        </div>
     );
}
 
export default PackagePage;