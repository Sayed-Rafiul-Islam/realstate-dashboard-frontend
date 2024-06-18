"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {MonthlyRecordsReducerProps, OwnerExpensesReducerProps, OwnerInfoReducerProps, RentsReducerProps} from "@/types";
import { Printer } from "lucide-react";
import { MonthlyRecordsClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";

interface RecordsProps {
    month_year : string,
    income : number,
    expense : number
}


const MonthlyRecordsPage = () => {

    const router = useRouter()
    const [records,setRecords] = useState<RecordsProps[]>([])
    const rents = useSelector(({rentsReducer} : RentsReducerProps) => rentsReducer).rents
    const expenses = useSelector(({ownerExpensesReducer} : OwnerExpensesReducerProps) => ownerExpensesReducer).ownerExpenses

    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
 

    // const [rents,setRents] = useState(data1)
    // const [expenses,setExpenses] = useState(data2)
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const rents = await api.get(`getRents?ownerId=${owner._id}`,{validateStatus: () => true})
    //         const expenses = await api.get(`getExpense?ownerId=${owner._id}`,{validateStatus: () => true})
    //         if (rents.status === 200 && expenses.status === 200) {
    //             setRents(rents.data)
    //             setExpenses(expenses.data)
    //         }
    //     }
    //     getData()
    // },[])

    useEffect(()=>{

        let monthly : RecordsProps[] = []
        rents.map((rent)=>{
            const month = rent.dateOfPayment.split("-")[1]
            const year = rent.dateOfPayment.split("-")[0]
            const month_year = month+'/'+year
            const index = monthly.findIndex(item => month_year === item.month_year)
            if (index === -1) {
                const data = {
                    month_year,
                    income : rent.amount,
                    expense : 0
                }

                monthly.push(data)
            } else {
                monthly[index].income = monthly[index].income + rent.amount
            }
            
        })

        expenses.map((expense)=>{
            const month = expense.date.split("-")[1]
            const year = expense.date.split("-")[0]
            const month_year = month+'/'+year
            const index = monthly.findIndex(item => month_year === item.month_year)
            if (index === -1) {
                const data = {
                    month_year,
                    income : 0,
                    expense : expense.amount
                }

                monthly.push(data)
            } else {
                monthly[index].expense = monthly[index].expense + expense.amount
            }
            
        })

        setRecords(monthly)
        
    },[expenses,rents])


    const formattedRecords = records.map((
        {
            month_year,
            income,
            expense,
        },index) => {
            const m = month_year.split("/")[0]
            let month
            const year = month_year.split("/")[1]

            if (m === "01") {month = "January"}
            else if (m === '02') {month = "February"}
            else if (m === '03') {month = "March"}
            else if (m === '04') {month = "April"}
            else if (m === '05') {month = "May"}
            else if (m === '06') {month = "June"}
            else if (m === '07') {month = "July"}
            else if (m === '08') {month = "August"}
            else if (m === '09') {month = "September"}
            else if (m === '10') {month = "October"}
            else if (m === '11') {month = "November"}
            else if (m === '12') {month = "December"}

            return {
                SL : index + 1,
                month_year : month + " " + year,
                income,
                expense,
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