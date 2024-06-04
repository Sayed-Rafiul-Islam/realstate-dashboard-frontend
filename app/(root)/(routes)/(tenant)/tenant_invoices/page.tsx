"use client"

import { useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GatewaysReducerProps, InvoiceTypesReducerProps, InvoicesReducerProps, PropertiesReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { InvoicesClient } from "./components/client";
import Link from "next/link";


const TenantInvoicesPage = () => {
    const router = useRouter()
    const {invoices} = useSelector(({invoicesReducer} : InvoicesReducerProps) => invoicesReducer)
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)
    const {invoiceTypes} = useSelector(({invoiceTypesReducer} : InvoiceTypesReducerProps) => invoiceTypesReducer)
    const {gateways} = useSelector(({gatewaysReducer} : GatewaysReducerProps) => gatewaysReducer)
    


    const thisTenantInvoices = invoices.filter(({propertyId,unitId})=>propertyId === tenant.propertyId && unitId === tenant.unitId)



    const formattedInvoices = thisTenantInvoices.map((
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
            const tenant = tenants.filter((item)=> item.propertyId === property._id && item.unitId === unit._id)[0]
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
                typeId : type,
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
            <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/'>Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            Invoices
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Invoices</h1>
                </div>
                <Separator />
                <div>
                    <InvoicesClient data={formattedInvoices} />
                </div>
            </div>
        </div>
     );
}
 
export default TenantInvoicesPage;