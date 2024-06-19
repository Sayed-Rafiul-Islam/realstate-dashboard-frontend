"use client"

import { useSelector } from "react-redux";
import { OrderEditForm } from "./components/order-edit-form";
import { OrderProps, OrderReducersProps, PackageProps, PackagesReducersProps } from "@/types";

const PackagePage = ({
    params
} : {
    params : { id : string}
}) => {
    const {orders}  = useSelector(({ordersReducer} : OrderReducersProps) => ordersReducer)
    const initialData = orders.filter((item : OrderProps)  =>{
        if (item._id === params.id) {
            return item
        } 
    })
    
    return ( 
        <div className="mt-8">
            <OrderEditForm initialData={initialData[0]} />
        </div>
     );
}
 
export default PackagePage;