"use client"

import { OrderProps, OrderReducersProps } from "@/types";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { OrdersClient } from "./components/client";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";

const AllOrders = () => {

    const {orders} = useSelector(({ordersReducer} : OrderReducersProps) => ordersReducer)

    const formattedOrders : OrderProps[] = orders.map((
        {
            _id,
            name,
            packageName,
            amount,
            gateway,
            date,
            status
        } : OrderProps,index : number) => ({
            serial : index + 1,
            _id,
            name,
            packageName,
            amount,
            gateway,
            date : format(date,"MMMM do, yyyy"),
            status
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