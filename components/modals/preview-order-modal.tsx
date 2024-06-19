"use client"

import { useEffect, useState } from "react"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";
import { OrderProps } from "@/types";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { OrdersColumnProps } from "@/app/(root)/(routes)/(admin)/all_orders/components/column";
import { format } from "date-fns";

interface PreviewOrderProps {
    isOpen : boolean,
    onClose : () => void,
    loading : boolean,
    data : OrdersColumnProps
}

export const PreviewOrder : React.FC<PreviewOrderProps> = ({
    isOpen,
    onClose,
    loading,
    data
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const [status, setStatus] = useState('')

    useEffect(()=>{
        setIsMounted(true)
        if (data.status === "Paid") {
            setStatus('text-sm bg-green-100 text-green-500 px-4 py-2 rounded-md')
        } else if (data.status === "Pending") {
            setStatus('text-sm bg-amber-100 text-amber-500 px-4 py-2 rounded-md')
        } 
        else {
            setStatus('text-sm bg-red-100 text-red-500 px-4 py-2 rounded-md')
        }
    },[])

    if (!isMounted) {
        return null
    }

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    const row = []
    row.push(data)

    const columns : ColumnDef<OrdersColumnProps>[] = data.status === "Paid" ? [
        {
          accessorKey: "date",
          header: "Date",
          cell: ({row}) => <span>{row.original.dateOfPayment && format(row.original.dateOfPayment,"MMMM do, yyyy")}</span>
        },
        {
            accessorKey: "gateway",
            header: "Gateway",
        },
        {
            accessorKey: "transactionId",
            header: "TransactionID",
        },
        {
          accessorKey: "amount",
          header: "Amount",
          cell: ({row}) => <span>{row.original.amount} BDT</span>
        }
    ]
    :
    [
        {
            accessorKey: "date",
            header: "Date",
            cell: ({row}) => <span>{format(row.original.orderDate,"MMMM do, yyyy")}</span>
          },
          {
            accessorKey: "name",
            header: "Name",
            cell: ({row}) => <span>{row.original.owner.user.firstName ? `${row.original.owner.user.firstName} ${row.original.owner.user.lastName}` : row.original.owner.user.lastName}</span>
          },
          {
            accessorKey: "label",
            header: "Package Name",
          },
          {
            header: "Type",
            cell: ({row}) => <span>{row.original.monthly ? "Monthly" : "Yearly"}</span>
          },
          {
            accessorKey: "amount",
            header: "Amount",
            cell: ({row}) => <span>{row.original.amount} BDT</span>
          }
    ]

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>
                    <div className="my-2 mt-8 flex justify-between items-center">
                        <h3 className="text-lg">Transaction Detail</h3>
                        <h3 className={status}>{data.status}</h3>
                    </div>
                </DialogTitle>
                <Separator />
            </DialogHeader>
            <div className="overflow-x-scroll">
                <DataTable pagination={false} columns={columns} data={row} />
            </div>
        </DialogContent>
    </Dialog>
    )
}
 
