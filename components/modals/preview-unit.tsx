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
import { OrderProps } from "@/types";
import { DataTable } from "../ui/data-table";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UnitColumn } from "@/app/(root)/(routes)/(owner)/properties/all_units/components/column";

interface PreviewUnitProps {
    isOpen : boolean,
    onClose : () => void,
    data : UnitColumn,
}

export const PreviewUnit : React.FC<PreviewUnitProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const router = useRouter()

    const [statusStyle,setStatusStyle] = useState('')
    // useEffect(()=>{
    //     if (data.status === "Paid") {
    //         setStatusStyle('bg-green-100 text-green-500 text-xs w-fit px-6 py-2 rounded-md')
    //     } else if (data.status === "Pending") {
    //         setStatusStyle('bg-amber-100 text-amber-500 text-xs w-fit px-6 py-2 rounded-md')
    //     } else {
    //         setStatusStyle('bg-red-100 text-red-500 text-xs px-6 py-2 rounded-md')
    //     }
    // })

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
                            <h3 className="text-xl font-semibold">Unit Details</h3>
                        </div>
                        <Separator />
                    </DialogHeader>
                    <div>

                        <div className="w-5/6 mx-auto">
                            <div className="relative h-[300px] w-full">
                                <Image src={data.image} fill alt="unit" />
                            </div>

                            <div>
                                <div className="flex justify-between border-b border-gray-200 p-4">
                                    <h5 className="text-xs">Property Name:</h5>
                                    <h6 className="text-xs font-semibold">{data.propertyName}</h6>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 p-4">
                                    <h5 className="text-xs">Unit Name:</h5>
                                    <h6 className="text-xs font-semibold">{data.name}</h6>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 p-4">
                                    <h5 className="text-xs">Tenant Name:</h5>
                                    <h6 className="text-xs font-semibold">{data.tenant ? data.tenant.name : "N/A"}</h6>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 p-4">
                                    <h5 className="text-xs">Rent:</h5>
                                    <h6 className="text-xs font-semibold">{data.rent} BDT</h6>
                                </div>
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
 
