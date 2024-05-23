"use client"

import { useSelector } from "react-redux";
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GatewaysReducerProps} from "@/types";
import { GatewayClient } from "./components/client";


const gatewayPage = () => {

    const router = useRouter()
    const {gateways} = useSelector(({gatewaysReducer} : GatewaysReducerProps) => gatewaysReducer)

    const formattedGateways = gateways.map((
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
                    <Button className="flex gap-2 bg-purple-600">New Gateway</Button>
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