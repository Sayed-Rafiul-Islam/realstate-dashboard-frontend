"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {MonthlyRecordsReducerProps} from "@/types";
import { Printer } from "lucide-react";
import { MonthlyRecordsClient } from "./components/client";


const MonthlyRecordsPage = () => {

    const router = useRouter()
    const {monthlyRecords} = useSelector(({monthlyRecordsReducer} : MonthlyRecordsReducerProps) => monthlyRecordsReducer)

    const formattedRecords = monthlyRecords.map((
        {
            _id,
            month_year,
            income,
            expense,
            net,
        },index) => {
            return {
                SL : index + 1,
                _id,
                month_year,
                income : `${income} BDT`,
                expense : `${expense} BDT`,
                net
            }
    })
    

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Loss Profit By Month Report</h1>
                    <Button  className="flex gap-2 bg-purple-600"><Printer size={15} />Export</Button>
                </div>
                <Separator />
                <div>
                    <MonthlyRecordsClient data={formattedRecords} />
                </div>
            </div>
        </div>
     );
}
 
export default MonthlyRecordsPage;