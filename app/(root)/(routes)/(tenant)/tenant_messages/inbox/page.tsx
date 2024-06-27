"use client"

import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { MessagesClient } from "./components/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ComposeMessage, FormProps } from "@/components/modals/compose-message-modal";
import { useDispatch, useSelector } from "react-redux";
import { AllUsersReducerProps, OwnerMaintainersReducerProps, OwnerMessagesReducerProps, OwnerTenantsReducerProps, TenantMessagesReducerProps } from "@/types";
import api from "@/actions/api";
import { createOwnerMessage } from "@/redux/data/owner/messagesSlice";
import toast from "react-hot-toast";


const Inbox = () => {

    const messages = useSelector(({tenantMessagesReducer} : TenantMessagesReducerProps) => tenantMessagesReducer).tenantReceivedMessages

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">Inbox</h1>
                </div>
                <Separator />
                <div>
                    <MessagesClient data={messages} />
                </div>
            </div>
        </div>
     );
}
 
export default Inbox;