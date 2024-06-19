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
import { ArrowLeft, Check, CheckCircle, Printer } from "lucide-react";
import { Separator } from "../ui/separator";
import {  ExpenseProps, InvoiceProps, OwnerInfoReducerProps, OwnerTenantsReducerProps, PackageProps, RentProps } from "@/types";
import { DataTable } from "../ui/data-table";
import Image from "next/image";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AlertModal1 } from "./alert-modal-1";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import api from "@/actions/api";
import toast from "react-hot-toast";
import { addOwnerOrder } from "@/redux/data/owner/ordersSlice";

interface PreviewPackageProps {
    isOpen : boolean,
    onClose : () => void,
    data : PackageProps,
}

export const PreviewPackage : React.FC<PreviewPackageProps> = ({
    isOpen,
    onClose,
    data
}) => {
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [yearly, setYearly] = useState(false)

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    const onOpenAlert = () => {
        onClose()
        setOpen(true)
    }
    const onOrder = async () => {
        const order = {
            orderDate : new Date(),
            monthly : !yearly,
            status : "Pending",
            owner : owner._id,
            pack : data._id

        }
        const result = await api.post(`addOrder`,order)
        if (result.status === 200) {
            dispatch(addOwnerOrder(result.data))
            toast.success("Order placed successfully.")
        } else {
            toast.success("Something went wrong.")
        }
        setOpen(false)
        onClose();
    }

    const description = <p>You want to order <b className="text-green-500">{data.label}</b> package.</p>


    return (
        <> 
            <AlertModal1
                onOpen={open} 
                onClose={()=>setOpen(false)} 
                onConfirm={onOrder} 
                description={description}
                title="Are you sure?"
            />
            <Dialog open={isOpen} onOpenChange={onChange}>
                <DialogContent className="max-w-xs overflow-y-scroll pl-10">
                    <DialogHeader className="">
                        <h3 className="text-xl font-semibold">{data.label}</h3>
                        <div className="flex items-center space-x-2">
                            <Switch onClick={()=>setYearly(!yearly)} className="h-[25px] w-[40px]" id="yearly" />
                            <Label htmlFor="yearly">Yearly</Label>
                        </div>
                        
                        <Separator />
                    </DialogHeader>
                    <div className="mt-4">
                        <div className="flex items-baseline">
                            <h2 className="text-3xl font-semibold">BDT {yearly ? data.yearlyPrice : data.monthlyPrice}</h2>
                            <h4 className="text-xs">{yearly ? "/yearly" : "/monthly"}</h4>
                        </div>

                        <h4 className="font-semibold my-4">What's included</h4>
                        <div className="flex flex-col gap-3">
                            <h6 className="flex gap-2 items-center text-xs text-gray-500">
                                <Check className="bg-indigo-100 rounded-full text-indigo-700 p-0.5" size={15}/>
                                Add {data.maxProperty} Propperties
                            </h6>
                            <h6 className="flex gap-2 items-center text-xs text-gray-500">
                                <Check className="bg-indigo-100 rounded-full text-indigo-700 p-0.5" size={15}/>
                                Add {data.maxUnit} Units
                            </h6>
                            <h6 className="flex gap-2 items-center text-xs text-gray-500">
                                <Check className="bg-indigo-100 rounded-full text-indigo-700 p-0.5" size={15}/>
                                Add {data.maxMaintainer} Maintainers
                            </h6>
                            {/* <h6 className="flex gap-2 items-center text-xs text-gray-500">
                                <Check className="bg-indigo-100 rounded-full text-indigo-700 p-0.5" size={15}/>
                                Add {data.maxInvoice} Invoices
                            </h6> */}
                        </div>

                        <Button onClick={onOpenAlert} className="mt-8">Order Package</Button>
                    </div>
                </DialogContent>
            </Dialog>   
        </>
        
    )
}
 
