"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { OwnerGatewaysReducerProps, OwnerInfoReducerProps} from "@/types";
import { GatewayClient } from "./components/client";
import { useEffect, useState } from "react";
import api from "@/actions/api";


const gatewayPage = () => {

    const router = useRouter()
    const gateways = useSelector(({ownerGatewaysReducer} : OwnerGatewaysReducerProps) => ownerGatewaysReducer).ownerGateways

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const [data,setData] = useState(gateways)

    // useEffect(()=>{
    //     const getData = async () => {
    //         const {data,status} = await api.get(`getOwnerGateway?ownerId=${owner._id}`,{validateStatus: () => true})
    //         if (status === 200) {
    //             setData(data)
    //         }
    //     }
    //     getData()
    // },[])

    const formattedGateways = data.map((
        {
            _id,
            title,
            slug,
            mode
        },index) =>({
            SL : index + 1,
            _id,
            title,
            slug,
            mode
        }))

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex gap-2 justify-between items-center">
                    <h1 className="font-bold text-xl">Payment Gateway</h1>
                    <Button className="flex gap-2 bg-purple-600" onClick={()=>router.push(`/settings/payment_gateway/add`)}>New Gateway</Button>
                </div>
                <Separator />
                <div>
                    <GatewayClient data={formattedGateways} />
                </div>
            </div>
        </div>
     );
}
 
export default gatewayPage;