"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {MaintainanceTypesReducerProps} from "@/types";
import { format } from "date-fns";
import { MaintainanceIssueClient } from "./components/client";


const MaintainanceIssuePage = () => {

    const router = useRouter()

    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)

    const formattedTypes = maintainanceTypes.map((
        {
            _id,
            type,
            date,
        },index) => {
            return {
                SL : index + 1,
                _id,
                type,
                date : format(date,"MMMM do, yyyy")
            }
    })

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Maintainance Issue</h1>
                    <Button  className="flex gap-2">New Request</Button>
                </div>
                <Separator />
                <div>
                    <MaintainanceIssueClient data={formattedTypes} />
                </div>
            </div>
        </div>
     );
}
 
export default MaintainanceIssuePage;