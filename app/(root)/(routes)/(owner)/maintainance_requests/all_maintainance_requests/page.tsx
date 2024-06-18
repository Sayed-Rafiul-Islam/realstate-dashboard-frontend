"use client"
import Pathname from "@/components/pathname";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OwnerInfoReducerProps, OwnerMaintainanceRequestsReducerProps, TenantInfoReducerProps } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MaintainanceClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";



const AllRequests = () => {
    const router = useRouter()
    const requests = useSelector(({ownerMaintainanceReducer} : OwnerMaintainanceRequestsReducerProps) => ownerMaintainanceReducer).ownerMaintainanceRequests
    // const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    // const [data,setData] = useState(requests)
   

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} = await api.get(`getOwnerRequests?ownerId=${owner._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])

    
    const formattedRequests = requests.map((
        {
            _id,
            propertyName,
            unitName,
            property,
            unit,
            date,
            requestNo,
            type,
            maintainer,
            issue,
            status,
            paymentStatus,
            details,
            cost,
            attachment,
            invoice,
            owner,
        }) => ({
                _id,
                propertyName,
                unitName,
                property_unit : `${propertyName}/${unitName}`,
                property,
                unit,
                date,
                requestNo,
                type,
                maintainer,
                issue,
                status,
                paymentStatus,
                details,
                cost,
                attachment,
                invoice,
                owner   
    }))

   
    return ( 
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex justify-between md:flex-row flex-col gap-2"> 
                    <h1 className="font-bold text-xl">Maintainance Requests</h1>
                    <Button className="lg:w-1/4 md:w-1/5 w-2/3 bg-purple-500" onClick={()=>router.push('/maintainance_requests/add')}>New Request</Button>
                </div>
                <Separator />

                <MaintainanceClient data={formattedRequests} />
                
            </div>
        </div>
     );
}
 
export default AllRequests;