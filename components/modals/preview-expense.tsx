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
import { ArrowLeft, Printer } from "lucide-react";
import { Separator } from "../ui/separator";
import {  ExpenseProps, InvoiceProps, OwnerTenantsReducerProps, RentProps } from "@/types";
import { DataTable } from "../ui/data-table";
import Image from "next/image";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";

interface PreviewExpenseProps {
    isOpen : boolean,
    onClose : () => void,
    data : ExpenseProps,
}

export const PreviewExpense : React.FC<PreviewExpenseProps> = ({
    isOpen,
    onClose,
    data
}) => {
    
    const pathname = usePathname().split("/")[1]
    const router = useRouter()

    const [print,setPrint] = useState(false)

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }


    return (
        <> 
            <Dialog open={isOpen} onOpenChange={onChange}>
                <DialogContent className="max-w-4xl overflow-y-scroll">
                    <DialogHeader>
                        <div className="flex justify-between items-end mt-6 mb-2">
                            <h3 className="text-xl font-semibold">Details</h3>
                            <Link target="_blank" href={`/invoices/${data._id}/print`} className="flex items-center gap-2 bg-purple-600 text-white py-2 px-5 rounded-md hover:bg-transparent border border-purple-600 hover:text-purple-600 transition-all"><Printer size={15} /> Print</Link>
                        </div>
                        <Separator />
                    </DialogHeader>
                    <div>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h4 className="font-semibold mb-2">Expense</h4>
                                    <h6 className="text-xs">{data.name}</h6>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-end">
                                    <h4 className="font-semibold mb-2">Status</h4>
                                    <h6 className='bg-green-100 text-green-500 text-xs w-fit px-6 py-2 rounded-md'>
                                        Paid
                                    </h6>
                                </div>
                                <div className="flex flex-col items-end">
                                    <h4 className="font-semibold mb-2">Pay To</h4>
                                    <div className="flex flex-col gap-1 items-end">
                                        <h6 className="text-xs">{data.maintainerName}</h6>
                                        <h6 className="text-xs">{data.maintainer && data.maintainer.type.maintainer}</h6>
                                        <h6 className="text-xs">{data.maintainer && data.maintainer.address}</h6>
                                    </div>
                                </div>
                            </div>
                        
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Details</h4>
                            <div className="mt-4">
                                <Separator />
                                <div className="grid grid-cols-4 text-center text-sm my-2">
                                    <h4>Type</h4>
                                    <h4>Description</h4>
                                    <h4>Date</h4>
                                    <h4>Amount</h4>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-4 text-center text-sm my-2">
                                    <h4>{data.typeName}</h4>
                                    <h4>{data.description === '' ? 'N/A' : data.description}</h4>
                                    <h4>{format(data.date,"MMMM do, yyyy")}</h4>
                                    <h4>{data.amount}</h4>
                                </div>
                                <Separator />
                                <h4 className="text-end pr-16 mt-2">Total : {data.amount}</h4>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center mt-6">
                            <Button onClick={onClose} className="border border-orange-500" variant='outline'>Back</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>   
        </>
        
    )
}
 
