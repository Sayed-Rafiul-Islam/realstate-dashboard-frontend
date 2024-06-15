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
import { DocumentColumn } from "@/app/(root)/(routes)/(owner)/documents/components/column";

interface PreviewDocumentProps {
    isOpen : boolean,
    onClose : () => void,
    data : DocumentColumn,
}

export const PreviewDocument : React.FC<PreviewDocumentProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const router = useRouter()

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
                        <h3 className="text-xl font-semibold">Details</h3>
                        <Separator />
                    </DialogHeader>
                    <div>
                        <div className="flex gap-6 mb-6">
                            <div className="w-1/2">
                                <h4 className="text-lg font-semibold mb-4">Front Size</h4>
                                <div className="relative h-[200px] w-full">
                                    <Image className="rounded-lg" fill src={data.docFront} alt="" />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <h4 className="text-lg font-semibold mb-4">Back Size</h4>
                                <div className="relative h-[200px] w-full">
                                    <Image className="rounded-lg" fill src={data.docBack} alt="" />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="mt-6 flex flex-col gap-4">
                            <div className="flex items-center w-1/2">
                                <h5 className="font-semibold w-1/2">Document Type:</h5>
                                <h5>{data.type}</h5>
                            </div>
                            <div className="flex items-center w-1/2">
                                <h5 className="font-semibold w-1/2">Tenant Name:</h5>
                                <h5>{data.tenantName}</h5>
                            </div>
                            <div className="flex items-center w-1/2">
                                <h5 className="font-semibold w-1/2">Property Name:</h5>
                                <h5>{data.property_unit.split("/")[0]}</h5>
                            </div>
                            <div className="flex items-center w-1/2">
                                <h5 className="font-semibold w-1/2">Unit:</h5>
                                <h5>{data.property_unit.split("/")[1]}</h5>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>   
        </>
        
    )
}
 
