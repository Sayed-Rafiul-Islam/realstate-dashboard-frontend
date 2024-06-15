"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OwnerInvoiceTypesReducerProps} from "@/types";
import { InvoiceTypesClient } from "./components/client";


const InvoiceTypePage = () => {

    const router = useRouter()
    const invoiceTypes = useSelector(({ownerInvoiceTypesReducer} : OwnerInvoiceTypesReducerProps) => ownerInvoiceTypesReducer).ownerInvoiceTypes

    const formattedTypes = invoiceTypes.map((
        {
            _id,
            title,
            tax,
        },index) => {
            return {
                SL : index + 1,
                _id,
                title,
                tax : `${tax} BDT`,
            }
    })
    

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Invoice Type</h1>
                    <Button  className="flex gap-2 bg-purple-600" onClick={()=>router.push('/settings/invoice_type/add')}>New Type</Button>
                </div>
                <Separator />
                <div>
                    <InvoiceTypesClient data={formattedTypes} />
                </div>
            </div>
        </div>
     );
}
 
export default InvoiceTypePage;