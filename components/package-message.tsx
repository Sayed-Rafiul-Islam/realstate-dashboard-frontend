"use client"
import { OwnerInfoReducerProps } from "@/types";
import { format } from "date-fns";
import { BadgeInfo } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const PackageMessage = () => {

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const [message,setMessage] = useState('')

    useEffect(()=>{
        if(!owner.activePackage) {
            setMessage("No active package")
        } else {
            if (owner.endDate) {
                // owner.endDate = '2024-06-25T07:17:00.552Z'
                // console.log(owner.endDate)
                // const x : any = new Date('2024-06-25T07:17:00.552Z'.split("T")[0])
                const x : any = new Date(owner.endDate?.split("T")[0])
                const y : any = new Date(new Date().toISOString().split("T")[0])
                const diff = (x-y) / (1000 * 60 * 60 * 24)

                if (diff < 8) {
                    setMessage(`Re-new or update package before ${format(x,"MMMM do, yyyy")} otherwise all data will be lost`)
                } else {
                    setMessage('')
                }
            }
        }
    },[])
    return ( 
        <p className="absolute right-2 bottom-10 opacity-70">
            {
                message !== '' && 
                <span className="bg-red-500 text-white flex items-center gap-2 p-2 text-xs"><BadgeInfo size={15} /> {message}</span>
            }
        </p>
     );
}
 
export default PackageMessage;