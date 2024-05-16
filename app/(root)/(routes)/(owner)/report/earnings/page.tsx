"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EarningsProps, EarningsReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { EarningsClient } from "./components/client";


const RentsPage = () => {

    const router = useRouter()
    const {earnings} = useSelector(({earningsReducer} : EarningsReducerProps) => earningsReducer)

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)

    let totalAmount = 0
    earnings.map(({amount} : EarningsProps)=>{
        totalAmount = totalAmount + amount
    })

    const formattedEarnings = earnings.map((
        {
            _id,
            invoiceNo,
            propertyId,
            unitId,
            date,
            amount,
            tax,
        },index) => {
            const property = properties.filter((item)=> item._id === propertyId)[0]
            const unit = units.filter((item)=> item._id === unitId)[0]
            return {
                SL : index + 1,
                _id,
                invoiceNo,
                propertyId,
                unitId,
                isoDate : date,
                date :  format(date,"MMMM do, yyyy"),
                amount : `${amount} BDT`,
                totalAmount : `${totalAmount} BDT`,
                tax : `${tax} BDT`,
                property_unit : `${property.name}/${unit.name}`,
            }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">All Rents</h1>
                    <Button onClick={()=>router.push('/invoices/add')}  className="flex gap-2"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <EarningsClient data={formattedEarnings} />
                </div>
            </div>
        </div>
     );
}
 
export default RentsPage;