"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PropertiesReducerProps, RentsReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { RentsClient } from "./components/client";


const RentsPage = () => {

    const {rents} = useSelector(({rentsReducer} : RentsReducerProps) => rentsReducer)
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    const thisTenantRents = rents.filter(({propertyId,unitId})=>propertyId === tenant.propertyId && unitId === tenant.unitId)

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)

    const formattedRents = thisTenantRents.map((
        {
            _id,
            dueDate,
            invoiceNo,
            propertyId,
            unitId,
            month,
            year,
            amount,
            status,
            description,
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
                propertyId,
                unitId,
                property_unit : `${property.name}/${unit.name}`,
                tenant,
                month_year : `${month} ${year}`,
                dueDate :  format(dueDate,"MMMM do, yyyy"),
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
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Rents</h1>
                    <Button onClick={()=>{}}  className="flex gap-2 bg-purple-600"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <RentsClient data={formattedRents} />
                </div>
            </div>
        </div>
     );
}
 
export default RentsPage;