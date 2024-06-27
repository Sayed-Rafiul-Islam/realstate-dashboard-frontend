"use client"

import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { MessagesClient } from "./components/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ComposeMessage, FormProps } from "@/components/modals/compose-message-modal";
import { useDispatch, useSelector } from "react-redux";
import { AdminMessagesReducerProps, AllUsersReducerProps, OwnerMaintainersReducerProps, OwnerMessagesReducerProps, OwnerTenantsReducerProps, OwnersReducerProps } from "@/types";
import api from "@/actions/api";
import { createOwnerMessage, getOwnerMessages } from "@/redux/data/owner/messagesSlice";
import toast, { Toaster } from "react-hot-toast";
import { AdminMessageModal } from "@/components/modals/admin-message-modal";
import { createAdminMessage, getAdminMessages } from "@/redux/data/admin/messagesSlice";


const SendMassagesPage = () => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const owners = useSelector(({ownersReducer} : OwnersReducerProps) => ownersReducer).owners

    const admin = useSelector(({allUsersReducer} : AllUsersReducerProps) => allUsersReducer).allUsers
    .filter((user) => user.role === 'admin')[0]

    const messages = useSelector(({adminMessagesReducer} : AdminMessagesReducerProps) => adminMessagesReducer).adminMessages


    const handleSend = async (data : FormProps) => {

        setLoading(true)
        const result = await api.post(`createAdminMessage`,data ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(createAdminMessage(result.data))        
            toast.success("Message sent")
        } else if (result.status === 201) {
            const sent = await api.get(`getSentMessages?id=${admin._id}`,{validateStatus: () => true})
            dispatch(getAdminMessages(sent.data))
            toast.success("Message sent")
        } else {
            toast.error("Something went wrong.")
        }

        setLoading(false)
        setOpen(false)

    }

    return ( 
        <div className="flex-col">
            <AdminMessageModal
                isOpen={open} 
                onClose={()=>setOpen(false)} 
                onConfirm={(data : FormProps) => handleSend(data)} 
                loading={loading}
                owners={owners}
                admin={admin}
            />
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Massages</h1>
                    <Button onClick={()=>setOpen(true)}  className="flex gap-2">Compose Message</Button>
                </div>
                <Separator />
                <div>
                    <MessagesClient data={messages} />
                </div>
            </div>
            <Toaster />
        </div>
     );
}
 
export default SendMassagesPage;