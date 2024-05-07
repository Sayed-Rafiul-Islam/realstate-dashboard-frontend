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
import { TenantColumn } from "@/app/(root)/(routes)/(owner)/tenants/components/column";
import Image from "next/image";
import { format } from "date-fns";

interface PreviewOrderProps {
    isOpen : boolean,
    onClose : () => void,
    data : TenantColumn
}

export const PreviewTenant : React.FC<PreviewOrderProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-4xl overflow-y-scroll">
            <DialogHeader>
                    <div className="flex flex-col items-center justify-center gap-2 mx-auto mb-2">
                        <div className="relative w-[150px] h-[150px]">
                            <Image className="rounded-full" src={data.image} alt="image" fill />
                        </div>
                        <div className="text-center">
                            <h3 className="text-4xl font-semibold">{data.name}</h3>
                            <h4>{data.email}</h4>
                            <h4>{data.phone}</h4>
                        </div>
                    </div>
                    <Separator />
            </DialogHeader>
            <div className="lg:mx-40 md:mx-20 mx-5 md:text-md text-xs font-semibold">
                <div className="flex justify-between py-2">
                    <h4>Property Name</h4>
                    <h4>{data.propertyName ? data.propertyName : 'N/A'}</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>Unit Name</h4>
                    <h4>{data.unitName ? data.unitName : 'N/A'}</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>Monthly Rent</h4>
                    <h4>{data.monthlyRent ? data.monthlyRent : 'N/A'}</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>Due</h4>
                    <h4 className={data.due === 0 ? '' : 'text-red-500'}>{data.due ? `$ ${data.due}` : 'N/A'}</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>NID</h4>
                    <h4>{data.NID}</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>Age</h4>
                    <h4>{data.age} Years</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>Occupation</h4>
                    <h4>{data.occupation}</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>Family Members</h4>
                    <h4>{data.familyMember}</h4>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                    <h4>Start Date</h4>
                    <h4>{ format(data.startDate,"MMMM do, yyyy")}</h4>
                </div>
                
            </div>
        </DialogContent>
    </Dialog>
    )
}
 
