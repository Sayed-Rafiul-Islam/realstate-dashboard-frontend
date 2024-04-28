"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface OrdersClientProps {
    data : OrderProps[]
}

import { ColumnDef } from "@tanstack/react-table"
// import { CellAction } from "./cell-action"

import { useEffect, useState } from "react"
import Link from "next/link"

import toast, { Toaster } from "react-hot-toast"
import { OrderProps, PackageProps } from "@/types"
import { CellAction } from "./cell-action"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { OrdersDataTable } from "@/components/ui/orders-data-table"
import { Button } from "@/components/ui/button"
// import { SellRecords } from "@/components/ui/sellrecords-table"

export const OrdersClient : React.FC<OrdersClientProps> = ({data}) => {




    const [orders, setOrders] = useState(data)
    const [filter, setFilter] = useState("All")

    useEffect(()=>{
        if (filter === "All") {
            setOrders(data)
        } else {
            const temp = data.filter(({status})=> status === filter)
            setOrders(temp)
        }   

    },[filter,data])


    

    
    // const handleDelete = async (id : number) => {
    //     const res = await fetch(`https://pos.inspiredinteriorbd.com/api/sellRecords?sell_id=${id}`, {
    //       method : "DELETE"
    //     })
    //     const status = res.status
    //     if (status === 200) {
    //         toast.success(`Row removed permenantly !`)
    //         const updatedTable = records.filter(({sell_id}) => id !== sell_id)
    //         setRecords(updatedTable)
    //       setUpdate(!update)  
    //     }
    // }


    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

 

    return (
        <>
            <div className="flex gap-2 flex-wrap">
              <Button className={`${filter === "All" && "bg-indigo-200 text-indigo-600 border border-indigo-600"}`} onClick={()=>setFilter('All')} variant='outline'>All</Button>
              <Button className={`${filter === "Paid" && "bg-green-200 text-green-600 border border-green-600"}`} onClick={()=>setFilter('Paid')} variant='outline'>Paid</Button>
              <Button className={`${filter === "Pending" && "bg-amber-200 text-amber-600 border border-amber-600"}`} onClick={()=>setFilter('Pending')} variant='outline'>Pending</Button>
              <Button className={`${filter === "Canceled" && "bg-red-200 text-red-600 border border-red-600"}`} onClick={()=>setFilter('Canceled')} variant='outline'>Canceled</Button>
            </div>
            <OrdersDataTable columns={columns} data={orders} />
            <Toaster />
        </>
    )
}