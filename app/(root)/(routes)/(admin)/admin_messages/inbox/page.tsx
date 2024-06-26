"use client"

import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { MessagesClient } from "./components/client";
import { useSelector } from "react-redux";
import { AdminMessagesReducerProps } from "@/types";


const Inbox = () => {
    const messages = useSelector(({adminMessagesReducer} : AdminMessagesReducerProps) => adminMessagesReducer).adminReceivedMessages

    console.log(messages)

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