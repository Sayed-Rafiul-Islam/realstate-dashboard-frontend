"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GatewaysReducerProps, InvoiceTypesReducerProps, InvoicesReducerProps, OwnerInfoReducerProps, OwnerInvoicesReducerProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { InvoicesClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";


const InvoicesPage = () => {
    const router = useRouter()
    const invoices = useSelector(({ownerInvoicesReducer} : OwnerInvoicesReducerProps) => ownerInvoicesReducer).ownerInvoices
    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
 

    // const [data,setData] = useState(invoices)
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} =  await api.get(`getOwnerInvoice?ownerId=${owner._id}`,{validateStatus: () => true})    
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])

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
                    <InvoicesClient data={invoices} />
                </div>
            </div>
        </div>
     );
}
 
export default InvoicesPage;