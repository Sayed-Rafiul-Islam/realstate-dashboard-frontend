"use client"

import { useEffect, useState } from "react"

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { MessageProps } from "@/types"
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface ReplyModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : (reply : string) => void,
    loading : boolean,
    data : MessageProps
}

export const ReplyModal : React.FC<ReplyModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    data
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const [reply, setReply] = useState('')

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }





    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl">Reply Message</h3>
                    </div>
                </DialogTitle>
                <Separator />
            </DialogHeader>
            <div className="overflow-x-scroll px-10">
                <div className="flex py-4 border-gray-200 border-b">
                    <h2 className="font-semibold w-1/3">Name</h2>
                    <h2 className="text-gray-500">{data.name}</h2>
                </div>
                <div className="flex py-4 border-gray-200 border-b">
                    <h2 className="font-semibold w-1/3">Email</h2>
                    <h2 className="text-gray-500">{data.email}</h2>
                </div>
                <div className="flex py-4 border-gray-200 border-b">
                    <h2 className="font-semibold w-1/3">Phone</h2>
                    <h2 className="text-gray-500">{data.phone}</h2>
                </div>
                <div className="flex md:flex-row flex-col py-4 border-gray-200 border-b gap-y-4">
                    <h2 className="font-semibold w-1/3">Message</h2>
                    <h2 className="text-gray-500 w-2/3">{data.message}</h2>
                </div>
                <div className="mt-10 border-gray-200 border-b pb-8">
                    <h2 className="my-2 font-semibold">Reply</h2>
                    <Textarea value={reply} onChange={e=> setReply(e.target.value)} />
                </div>
                <div className="flex gap-4 mt-5">
                    <Button onClick={onClose} variant='outline'>Back</Button>
                    <Button onClick={()=>onConfirm(reply)} disabled={reply === '' && true}>Reply</Button>
                </div>
                
            </div>

            <div>

            </div>
        </DialogContent>
    </Dialog>
    )
}