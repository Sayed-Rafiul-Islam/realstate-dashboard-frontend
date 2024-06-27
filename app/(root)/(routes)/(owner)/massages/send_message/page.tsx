"use client"

import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { MessagesClient } from "./components/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ComposeMessage, FormProps } from "@/components/modals/compose-message-modal";
import { useDispatch, useSelector } from "react-redux";
import { AllUsersReducerProps, OwnerInfoReducerProps, OwnerMaintainersReducerProps, OwnerMessagesReducerProps, OwnerTenantsReducerProps } from "@/types";
import api from "@/actions/api";
import { createOwnerMessage, getOwnerMessages } from "@/redux/data/owner/messagesSlice";
import toast from "react-hot-toast";


const SendMassagesPage = () => {
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    const admin = useSelector(({allUsersReducer} : AllUsersReducerProps) => allUsersReducer).allUsers
    .filter((user) => user.role === 'admin')[0]

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    const tenants = useSelector(({ownerTenantsReducer} : OwnerTenantsReducerProps) => ownerTenantsReducer).ownerTenants
    const maintainers = useSelector(({ownerMaintainersReducer} : OwnerMaintainersReducerProps) => ownerMaintainersReducer).ownerMaintainers
    const messages = useSelector(({ownerMessagesReducer} : OwnerMessagesReducerProps) => ownerMessagesReducer).ownerMessages


    const handleSend = async (data : FormProps) => {

        setLoading(true)
        const result = await api.post(`createMessage`,data ,{validateStatus: () => true})
        if ( result.status === 200) {
            dispatch(createOwnerMessage(result.data))        
            toast.success("Message sent")
        } else if (result.status === 201) {
            const sent = await api.get(`getSentMessages?id=${owner.user._id}`,{validateStatus: () => true})
            dispatch(getOwnerMessages(sent.data))
            toast.success("Message sent")
        } else {
            toast.error("Something went wrong.")
        }


       
        setLoading(false)
        setOpen(false)

    }

    return ( 
        <div className="flex-col">
            <ComposeMessage
                isOpen={open} 
                onClose={()=>setOpen(false)} 
                onConfirm={(data : FormProps) => handleSend(data)} 
                loading={loading}
                admin={admin}
                tenants={tenants}
                maintainers={maintainers}
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
        </div>
     );
}
 
export default SendMassagesPage;