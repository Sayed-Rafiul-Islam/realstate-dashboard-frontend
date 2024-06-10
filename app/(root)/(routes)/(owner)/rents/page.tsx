"use client"

import { useDispatch, useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OwnerInfoReducerProps, OwnerPropertyReducerProps, OwnerUnitsReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { RentsClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getOwnerUnits } from "@/redux/data/owner/unitsSlice";
import { getOwnerProperties } from "@/redux/data/owner/propertiesSlice";


const RentsPage = () => {
    
        const router = useRouter()
        const dispatch = useDispatch()
    const [isMounted, setIsMounted] = useState(false)

    const {rents} = useSelector(({rentsReducer} : RentsReducerProps) => rentsReducer)
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo


    useEffect(()=>{
        const getData = async () => {
            if (owner) {
                    const {data,status} = await api.get(`getOwnerProperties?id=${owner._id}`,{validateStatus: () => true})
                    const result = await api.get(`getOwnerUnits?id=${owner._id}`,{validateStatus: () => true})
                    dispatch(getOwnerUnits(result.data))
                    dispatch(getOwnerProperties(data))
                }
                setIsMounted(true)
            }
            getData()
    },[])
    const units = useSelector(({ownerUnitsReducer} : OwnerUnitsReducerProps) => ownerUnitsReducer).ownerUnits
    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties
    const {tenants} = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer)

    const formattedRents = rents.map((
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
             
            // console.log(properties)
            const property = properties.filter((item)=> item._id === unitId)[0]
            const unit = units.filter((item)=> item._id === unitId)[0]
            const tenant = tenants.filter((item)=> item.property?._id === propertyId && item.unit._id === unitId)[0]
            return {
                _id,
                invoiceNo,
                propertyId,
                unitId,
                property_unit : `${property?.name}/${unit?.name}`,
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