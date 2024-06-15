"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InvoicesReducerProps, OwnerInvoicesReducerProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { RecurringInvoicesClient } from "./components/client";


const RecurringSettings = () => {
    const router = useRouter()
    const invoices = useSelector(({ownerInvoicesReducer} : OwnerInvoicesReducerProps) => ownerInvoicesReducer).ownerInvoices

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">Recurring Invoice Settings</h1>
                    <Pathname />
                </div>
                <Separator />
                <div className="flex justify-end"> 
                    <Button onClick={()=>router.push('/invoices/add')}  className="">New Recurring Invoice</Button>
                </div>
                <div>
                    <RecurringInvoicesClient data={invoices} />
                </div>
            </div>
        </div>
     );
}
 
export default RecurringSettings;