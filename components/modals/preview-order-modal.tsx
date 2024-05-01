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

interface PreviewOrderProps {
    isOpen : boolean,
    onClose : () => void,
    loading : boolean,
    data : OrderProps
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
            setStatus('text-sm bg-green-200 text-green-500 px-4 py-2 rounded-md')
        } else if (data.status === "Pending") {
            setStatus('text-sm bg-amber-200 text-amber-500 px-4 py-2 rounded-md')
        } else {
            setStatus('text-sm bg-red-200 text-red-500 px-4 py-2 rounded-md')
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

    const columns = [
        {
          accessorKey: "date",
          header: "Date",
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
 
