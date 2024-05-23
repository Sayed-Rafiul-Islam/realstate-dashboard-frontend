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
import {Printer } from "lucide-react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaintainanceRequestColumn } from "@/app/(root)/(routes)/(owner)/maintainance_requests/all_maintainance_requests/components/column";

interface PreviewRequestProps {
    isOpen : boolean,
    onClose : () => void,
    data : MaintainanceRequestColumn,
}

export const PreviewRequest : React.FC<PreviewRequestProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const router = useRouter()
    const [statusStyle,setStatusStyle] = useState('')
    useEffect(()=>{
        if (data.status === "Complete") {
            setStatusStyle('bg-green-100 text-green-500 text-xs w-fit px-3 py-2 rounded-md')
        } else if (data.status === "In Progress") {
            setStatusStyle('bg-amber-100 text-amber-500 text-xs w-fit px-3 py-2 rounded-md')
        } else {
            setStatusStyle('bg-red-100 text-red-500 text-xs px-3 py-2 rounded-md')
        }
    })

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }


    return (
        <> 
            <Dialog open={isOpen} onOpenChange={onChange}>
                <DialogContent className="max-w-3xl overflow-y-scroll">
                    <DialogHeader>
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xl font-semibold">Details</h3>
                        </div>
                        <Separator />
                    </DialogHeader>
                    <div>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h4 className="font-semibold mb-2">Issue</h4>
                                    <h6 className="text-xs">{data.issue}</h6>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Property</h4>
                                    <h6 className="text-xs">{data.property_unit.split("/")[0]}</h6>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-end">
                                    <h4 className="font-semibold mb-2">Status</h4>
                                    <h6 className={statusStyle}>
                                        {data.status}
                                    </h6>
                                </div>
                                <div className="flex flex-col items-end">
                                    <h4 className="font-semibold mb-2">Pay To</h4>
                                    <h6 className="text-xs">{data.property_unit.split("/")[1]}</h6>
                                </div>
                            </div>
                        
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Details</h4>
                            <div className="mt-4 border border-gray-200 px-2 py-4 rounded-md">
                                <h6 className="text-xs">{data.details}</h6>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <h5 className="text-xs font-semibold">Amount Type:</h5>
                                <h6 className="text-xs">BDT {data.cost}</h6>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center mt-6">
                            <Button onClick={onClose} className="border border-orange-500" variant='outline'>Back</Button>
                            <Button className="bg-purple-600" onClick={()=>router.push(`/maintainance_requests/${data._id}`)}>Update</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>   
        </>
        
    )
}
 
