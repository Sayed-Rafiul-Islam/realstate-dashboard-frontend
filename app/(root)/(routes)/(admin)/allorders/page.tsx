"use client"

import { OrderProps, OrderReducersProps } from "@/types";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { OrdersClient } from "./components/client";

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
            <OrdersClient data={formattedOrders} />
        </div>
        
    </div>
     );
}
 
export default AllOrders;