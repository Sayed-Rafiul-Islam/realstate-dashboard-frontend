"use client"
import { ArrowRight, Home, UserRound, UsersRound, Warehouse } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import { useSelector } from "react-redux";
import {OrderReducersProps, PackagesReducersProps } from "@/types";
import { ThreeOrdersClient } from "@/app/(root)/(routes)/components/orders/client";
import { ThreePackagesClient } from "@/app/(root)/(routes)/components/packages/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {

    const summery = [
        {
            id : 1,
            subtitle : "Total Owner",
            title : '1',
            icon : <UsersRound className="bg-white p-2 w-[32px] h-[32px]"  color="#ff8c2e" size={20} />
        },
        {
            id : 2,
            subtitle : "Total Property",
            title : '2',
            icon : <Warehouse className="bg-white p-2 w-[32px] h-[32px]"  color="#2563eb" size={20} />
        },
        {
            id : 3,
            subtitle : "Total Unit",
            title : '4',
            icon : <Home className="bg-white p-2 w-[32px] h-[32px]"  color="#e11d48" size={20} />
        },
        {
            id : 4,
            subtitle : "Total Tenant",
            title : '7',
            icon : <UserRound className="bg-white p-2 w-[32px] h-[32px]" color="#16a34a" size={20} />
        }
    ]

    const router = useRouter()
    const {orders} = useSelector(({ordersReducer} : OrderReducersProps) => ordersReducer)
    const {packages} = useSelector(({packagesReducer} : PackagesReducersProps) => packagesReducer)
    const threeOrders = orders.slice(0,3)
    const threePackages = packages.slice(0,3)


    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                {
                    summery.map(({id,subtitle,title,icon}) => <Summery id={id} subtitle={subtitle} title={title} icon={icon} />)
                }
            </div>
            <div className="flex gap-4 mt-10 tables">
                {/* orders  */}
                <div className="w-1/2 bg-gray-100 py-10 px-4 rounded-lg">
                    <h2 className="font-semibold text-xl mb-4">Orders</h2>
                    <ThreeOrdersClient data={threeOrders} />
                    <Button onClick={()=>router.push('/allorders')} className="w-full mt-5" variant='outline'>See All <ArrowRight className="ml-4" size={15} /></Button>
                </div>
                {/* packages  */}
                <div className="w-1/2 bg-gray-100 py-10 px-4 rounded-lg">
                    <h2 className="font-semibold text-xl mb-4">Packages</h2>
                    <ThreePackagesClient data={threePackages} />
                    <Button onClick={()=>router.push('/packages')} className="w-full mt-5" variant='outline'>See All <ArrowRight className="ml-4" size={15} /></Button>
                </div>
            </div>
        </div>
     );
}
 
export default AdminDashboard;