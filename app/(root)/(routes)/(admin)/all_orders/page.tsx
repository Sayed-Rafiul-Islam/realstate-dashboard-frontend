"use client"

import { OrderProps, OrderReducersProps } from "@/types";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { OrdersClient } from "./components/client";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";

const AllOrders = () => {

    const {orders} : {orders : OrderProps[]}  = useSelector(({ordersReducer} : OrderReducersProps) => ordersReducer)

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


    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">All Orders</h1>
                <Pathname />
            </div>
            <Separator />
            <OrdersClient data={formattedOrders} />
        </div>
        
    </div>
     );
}
 
export default AllOrders;