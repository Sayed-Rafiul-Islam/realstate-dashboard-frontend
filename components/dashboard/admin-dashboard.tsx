"use client"
import { ArrowRight, Calendar, Home, UserRound, Warehouse } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import { useSelector } from "react-redux";
import {OrderProps, OrderReducersProps, OwnersReducerProps, PackagesReducersProps, PropertiesReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { useRouter } from "next/navigation";
import DoughnutChart from "../DoughnutChart";
import { DataTable } from "../ui/data-table";
import { CellAction } from "@/app/(root)/(routes)/(admin)/packages/components/cell-action";
import { orderColumns } from "@/app/(root)/(routes)/(admin)/all_orders/components/column";
import { format } from "date-fns";

const AdminDashboard = () => {

    const ownerCount = useSelector(({ownersReducer} : OwnersReducerProps) => ownersReducer).owners.length
    const propertyCount = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer).properties.length
    const unitCount = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer).units.length
    const tenantCount = useSelector(({tenantsReducer} : TenantsReducerProps) => tenantsReducer).tenants.length

    const summery = [
        {
            id : 1,
            subtitle : "Total Owner",
            title : `${ownerCount}`,
            icon : <UserRound color="#22c55e" size={20} />,
            color : 'green'
        },
        {
            id : 2,
            subtitle : "Total Property",
            title : `${propertyCount}`,
            icon : <Warehouse color="#f97316" size={20} />,
            color : 'orange'
        },
        {
            id : 3,
            subtitle : "Total Unit",
            title : `${unitCount}`,
            icon : <Home color="#f59e0b" size={20} />,
            color : 'amber'
        },
        {
            id : 4,
            subtitle : "Total Tenant",
            title : `${tenantCount}`,
            icon : <UserRound color="#6366f1" size={20} />,
            color : 'indigo'
        }
    ]

    const packageColumn = [
        {
            accessorKey: "label",
            header: "Name",
          },
          {
            accessorKey: "monthlyPrice",
            header: "Monthly Price",
          },
          {
            accessorKey: "yearlyPrice",
            header: "Yearly Price",
          },
          {
            id: "actions",
            cell: ({row} : any) => <CellAction data={row.original} />,
          },
    ]

    const router = useRouter()
    const orders = useSelector(({ordersReducer} : OrderReducersProps) => ordersReducer).orders.slice(0,3)
    const formattedOrders = orders.map((
        {
            _id,
            name,
            packageName,
            amount,
            gateway,
            date,
            status,
            transactionId
        } : OrderProps,index : number) => ({
            serial : index + 1,
            _id,
            name,
            packageName,
            amount,
            gateway,
            date : format(date,"MMMM do, yyyy"),
            status,
            transactionId
    }))
    const packages = useSelector(({packagesReducer} : PackagesReducersProps) => packagesReducer).packages.slice(0,3)


    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                {
                    summery.map(({id,subtitle,title,icon,color}) => <Summery key={id} color={color} id={id} subtitle={subtitle} title={title} icon={icon} />)
                }
            </div>

            <div className="admin-section-1 mt-10 gap-5">

                {/* chart  */}
                <div className="shadow-md p-2 admin-chart">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Total Order</h3>
                        <div className="flex gap-2 text-gray-500">
                            <Calendar className="cursor-pointer" size={15} />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold">{orders.length}</h3>

                    <div className="relative overflow-x-scroll">
                        <DoughnutChart orders={orders} />
                    </div>
                </div>

                {/* packages table */}
                <div className="shadow-md p-2 packages-table-wrapper">
                    <div className="flex justify-between items-center gap-2 mb-4">
                        <h3 className="text-xl font-semibold">Packages</h3>
                        <button 
                            onClick={()=>router.push('/packages')} 
                            className="flex gap-2 items-center w-fit text-sm text-blue-500"
                        >
                            View All <ArrowRight size={15} />
                        </button>
                    </div>
                    <DataTable pagination={false} columns={packageColumn} data={packages} />
                </div>

            </div>


            {/* orders table */}

            <div className="shadow-md my-10 p-4 orders-table-wrapper">
                <div className="flex justify-between items-center gap-2 mb-4">
                    <h3 className="text-xl font-semibold">Orders</h3>
                    <button 
                        onClick={()=>router.push('/all_orders')} 
                        className="flex gap-2 items-center w-fit text-sm text-blue-500"
                    >
                        View All <ArrowRight size={15} />
                    </button>
                </div>
                <DataTable pagination={false} columns={orderColumns} data={formattedOrders} />
            </div>
        </div>
     );
}
 
export default AdminDashboard;