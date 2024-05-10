"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InvoicesReducerProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { RecurringInvoicesClient } from "./components/client";


const RecurringSettings = () => {
    const router = useRouter()
    const {invoices} = useSelector(({invoicesReducer} : InvoicesReducerProps) => invoicesReducer)

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)



    const formattedInvoices = invoices.map((
        {
            _id,
            invoiceNo,
            prefix,
            propertyId,
            unitId,
            month,
            dueDate,
            type,
            description,
            status,
            amount,
            dateOfPayment,
            gateway,
            transactionId,
            payment
        }) => {
            const property = properties.filter((item)=> item._id === propertyId)[0]
            const unit = units.filter((item)=> item._id === unitId)[0]
            const tenant = tenants.filter((item)=> item.propertyId === property._id && item.unitId === unit._id)[0]
            return {
                _id,
                invoiceNo,
                prefix,
                property_unit : `${property.name}/${unit.name}`,
                tenant,
                month,
                dueDate :  format(dueDate,"MMMM do, yyyy"),
                type,
                description,
                status,
                amount : `BDT ${amount}`,
                dateOfPayment :  dateOfPayment && format(dateOfPayment,"MMMM do, yyyy"),
                gateway,
                transactionId,
                payment : `BDT ${payment}`
            }
           
    })

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
                    <RecurringInvoicesClient data={formattedInvoices} />
                </div>
            </div>
        </div>
     );
}
 
export default RecurringSettings;