"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GatewaysReducerProps, InvoiceTypesReducerProps, InvoicesReducerProps, OwnerInfoReducerProps, OwnerInvoicesReducerProps, OwnerOrderReducersProps, PackagesReducersProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { format } from "date-fns";
import { MyOrdersClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Link from "next/link";
import { MyOrdersColumnProps } from "./components/column";


const OrderPackagePage = () => {

    const orders = useSelector(({ownerOrdersReducer} : OwnerOrderReducersProps) => ownerOrdersReducer).ownerOrders
    .filter((order) => order.status === "Pending")

    const formattedOrders = orders.map((
        {
            _id,
            owner,
            pack,
            monthly,
            status,
            orderDate,
            dateOfPayment,
            gateway,
            transactionId
        } ,index : number) => ({
            serial : index + 1,
            _id,
            owner,
            pack,
            label : pack.label,
            monthly,
            amount : monthly ? pack.monthlyPrice : pack.yearlyPrice,
            orderDate,
            dateOfPayment,
            gateway,
            status,
            transactionId
    }))

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
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/'>Dashboard</Link>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/owner_packages'>Packages</Link>
                        </BreadcrumbItem>
                        
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage >
                                My Orders
                            </BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">My Orders</h1>
                </div>
                <Separator />
                <div>
                    <MyOrdersClient data={formattedOrders} />
                </div>
            </div>
        </div>
     );
}
 
export default OrderPackagePage;