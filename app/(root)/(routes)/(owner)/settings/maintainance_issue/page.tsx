"use client"

import { useDispatch, useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {MaintainanceTypesReducerProps, OwnerInfoReducerProps, OwnerMaintainanceTypesReducerProps} from "@/types";
import { format } from "date-fns";
import { MaintainanceIssueClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getOwnerMaintainanceTypes } from "@/redux/data/owner/settings/maintainanceTypesSlice";


const MaintainanceIssuePage = () => {
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()
    const {ownerMaintainanceTypes} = useSelector(({ownerMaintainanceTypesReducer} : OwnerMaintainanceTypesReducerProps) => ownerMaintainanceTypesReducer)

    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    // const [data,setData] = useState(ownerMaintainanceTypes)

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} = await api.get(`getMaintainaceType?id=${owner._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])

   

    const formattedTypes = ownerMaintainanceTypes.map((
        {
            _id,
            type,
            maintainer,
            date,
        },index) => {
            return {
                SL : index + 1,
                _id,
                maintainer,
                type,
                date : format(date,"MMMM do, yyyy")
            }
    })

    
    if (!isMounted) {
        return null
    }

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Maintainance Issue</h1>
                    <Button onClick={()=>router.push('/settings/maintainance_issue/add')} className="flex gap-2 bg-purple-600">New Request</Button>
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