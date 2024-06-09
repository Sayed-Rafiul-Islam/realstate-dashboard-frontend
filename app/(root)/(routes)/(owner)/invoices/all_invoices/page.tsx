"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GatewaysReducerProps, InvoiceTypesReducerProps, InvoicesReducerProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { InvoicesClient } from "./components/client";


const InvoicesPage = () => {
    const router = useRouter()
    const {invoices} = useSelector(({invoicesReducer} : InvoicesReducerProps) => invoicesReducer)

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)
    const {invoiceTypes} = useSelector(({invoiceTypesReducer} : InvoiceTypesReducerProps) => invoiceTypesReducer)
    const {gateways} = useSelector(({gatewaysReducer} : GatewaysReducerProps) => gatewaysReducer)



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
        }) => {
            const property = properties.filter((item)=> item._id === propertyId)[0]
            const unit = units.filter((item)=> item._id === unitId)[0]
            const tenant = tenants.filter((item)=> item.property._id === property._id && item.unit._id === unit._id)[0]
            const invoiceType = invoiceTypes.filter((item)=> item._id === type)[0]
            const gatewayName = gateways.filter((item)=> item._id === gateway)[0]
            return {
                _id,
                invoiceNo,
                prefix,
                property_unit : `${property.name}/${unit.name}`,
                tenant,
                month,
                dueDate :  format(dueDate,"MMMM do, yyyy"),
                type : invoiceType.title,
                description,
                status,
                amount : `BDT ${amount}`,
                dateOfPayment :  dateOfPayment !== '00-00-00' ? format(dateOfPayment,"MMMM do, yyyy") : 'N/A',
                gateway : gatewayName ? gatewayName.title : 'N/A',
                transactionId,
                payment : `BDT ${amount}`
            }
           
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Invoices</h1>
                    <Pathname />
                </div>
                <Separator />
                <div className="flex justify-end"> 
                    <Button onClick={()=>router.push('/invoices/add')}  className="bg-purple-600">New Invoice</Button>
                </div>
                <div>
                    <InvoicesClient data={formattedInvoices} />
                </div>
            </div>
        </div>
     );
}
 
export default InvoicesPage;