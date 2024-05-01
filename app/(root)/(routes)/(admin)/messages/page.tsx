"use client"

import { MessageProps, MessagesReducerProps, OwnerPackageProps } from "@/types";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { MessagesClient } from "./components/client";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";

const Messages = () => {

    const {messages} = useSelector(({messagesReducer} : MessagesReducerProps) => messagesReducer)


    const formattedMessages : MessageProps[] = messages.map((
        {
            _id,
            name,
            email,
            phone,
            message,
            status,
        } : MessageProps,index : number) => ({
            serial : index + 1,
            _id,
            name,
            email,
            phone,
            message,
            status,
    }))

    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">Messages</h1>
                <Pathname />
            </div>
            <Separator />              
                <MessagesClient data={formattedMessages} />
        </div>
        
    </div>
     );
}
 
export default Messages;