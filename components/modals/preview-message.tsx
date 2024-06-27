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
import { ArrowLeft, Forward, Printer } from "lucide-react";
import { Separator } from "../ui/separator";
import {  InvoiceProps, MessageProps, OwnerTenantsReducerProps } from "@/types";
import { DataTable } from "../ui/data-table";
import Image from "next/image";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ReplyModal } from "./reply-modal";
import api from "@/actions/api";
import { FormProps } from "./compose-message-modal";

interface PreviewMessageProps {
    isOpen : boolean,
    onClose : () => void,
    data : MessageProps,
    onReply : (data : FormProps) => void
}

export const PreviewMessage : React.FC<PreviewMessageProps> = ({
    isOpen,
    onClose,
    data,
    onReply
}) => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    const handleReply = async (body : string) => {
        const formData = {
            body,   
            fromName : data.toName,
            fromRole : data.toRole,
            toName : data.fromName,
            toRole : data.fromRole,
            status : false,
            read : false,
            date : new Date(),
            from : data.to._id,
            to : data.from._id,
        }
        onReply(formData)
        setOpen(false)
    }


    return (
        <> 
            <ReplyModal 
                isOpen={open}
                onClose={()=>setOpen(false)}
                onConfirm={(body : string)=>{handleReply(body)}}
                loading={loading}
                data={data}
            />
            <Dialog open={isOpen} onOpenChange={onChange}>
                <DialogContent className="max-w-4xl overflow-y-scroll">
                    <DialogHeader>
                        <div className="flex justify-between items-center mt-6 mb-2">
                            <h3 className="text-xl font-semibold">Message</h3>
                            <Button onClick={()=>setOpen(true)} className="flex items-center gap-2"><Forward size={20} /> Reply</Button>
                        </div>
                        <Separator />
                    </DialogHeader>
                    <div>
                        {
                            <div className="flex justify-between">
                                <div>
                                    <h4>From</h4>
                                    <h4 className="font-semibold">{data.fromName} [{data.fromRole}]</h4>
                                </div>
                                <div className="flex flex-col items-end">
                                    <h4>To</h4>
                                    <h4 className="font-semibold">{data.toName} [{data.toRole}]</h4>
                                </div>
                            </div>
                        }

                        <div className="mt-4 w-full shadow-lg p-4">
                            <p>{data.body}</p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <h6 className="text-xs">{format(data.date,"MMMM do, yyyy")}</h6>
                            {/* <h6 className="text-xs">{data.read ? "Read" : "Not Viewed"}</h6> */}
                        </div>
                        </div>
                </DialogContent>
            </Dialog>   
        </>
        
    )
}
 
