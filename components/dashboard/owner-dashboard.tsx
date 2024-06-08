"use client"

import { ArrowRight, Calendar, DollarSign, Home, MoreVertical, UserRound, Users, UsersRound, Warehouse, Wrench } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import { useSelector } from "react-redux";
import { ExpensesReducerProps, MaintainanceRequestsReducerProps, MaintainersReducerProps, PropertiesReducerProps, RentsReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import BarChart from "../BarChart";
import { useEffect, useState } from "react";
import { DataTable } from "../ui/data-table";


const OwnerDashboard = () => {

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps)=>propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps)=>unitsReducer)
    const tenantCount = useSelector(({tenantsReducer} : TenantsReducerProps)=>tenantsReducer).tenants.length
    const {maintainers} = useSelector(({maintainersReducer} : MaintainersReducerProps)=>maintainersReducer)
    const {rents} = useSelector(({rentsReducer} : RentsReducerProps)=>rentsReducer)
    const {expenses} = useSelector(({expensesReducer} : ExpensesReducerProps)=>expensesReducer)
    const threeRequests = useSelector(({maintainanceReducer} : MaintainanceRequestsReducerProps)=>maintainanceReducer).maintainanceRequests.slice(0,3)

    const router = useRouter()

    const summery = [
        {
            id : 1,
            subtitle : "Total Property",
            title : `${properties.length}`,
            icon : <Warehouse color="#22c55e" size={20} />,
            color : 'green'
        },
        {
            id : 2,
            subtitle : "Total Units",
            title : `${units.length}`,
            icon : <Home color="#f97316" size={20} />,
            color : 'orange'
        },
        {
            id : 3,
            subtitle : "Total Tenants",
            title : `${tenantCount}`,
            icon : <Users color="#f59e0b" size={20} />,
            color : 'amber'
        },
        {
            id : 4,
            subtitle : "Total Maintainers",
            title : `${maintainers.length}`,
            icon : <Wrench color="#6366f1" size={20} />,
            color : 'indigo'
        }
    ]

    let totalRent = 0
    let chartRents = [
        {
            month : '01',
            amount : 0,
        },
        {
            month : '02',
            amount : 0,
        },
        {
            month : '03',
            amount : 0,
        },
        {
            month : '04',
            amount : 0,
        },
        {
            month : '05',
            amount : 0,
        },
        {
            month : '06',
            amount : 0,
        },
        {
            month : '07',
            amount : 0,
        },
        {
            month : '08',
            amount : 0,
        },
        {
            month : '09',
            amount : 0,
        },
        {
            month : '10',
            amount : 0,
        },
        {
            month : '11',
            amount : 0,
        },
        {
            month : '12',
            amount : 0,
        },
    ]

    rents.map(({payment,dateOfPayment}) =>{
        totalRent = totalRent + payment
        const monthNum = dateOfPayment.split("-")[1]

        chartRents.map(({month},index)=>{
            if (month === monthNum) {
                chartRents[index].amount = chartRents[index].amount + payment
            }
        })
    })



    let totalExpenses = 0
    let chartExpenses = [
        {
            month : '01',
            amount : 0,
        },
        {
            month : '02',
            amount : 0,
        },
        {
            month : '03',
            amount : 0,
        },
        {
            month : '04',
            amount : 0,
        },
        {
            month : '05',
            amount : 0,
        },
        {
            month : '06',
            amount : 0,
        },
        {
            month : '07',
            amount : 0,
        },
        {
            month : '08',
            amount : 0,
        },
        {
            month : '09',
            amount : 0,
        },
        {
            month : '10',
            amount : 0,
        },
        {
            month : '11',
            amount : 0,
        },
        {
            month : '12',
            amount : 0,
        },
    ]

    expenses.map(({amount,date}) =>{
        totalExpenses = totalExpenses + amount

        const monthNum = date.split("-")[1]

        chartRents.map(({month},index)=>{
            if (month === monthNum) {
                chartExpenses[index].amount = chartExpenses[index].amount + amount
            }
        })
    })

    const propertyColumns = [
        {
          accessorKey: "name",
          header: "Property Name",
        },
        {
          accessorKey: "unitCount",
          header: "Units",
        },
        {
          accessorKey: "available",
          header: "Available Units",
        },
        {
          accessorKey: "tenants",
          header: "Tenants",
        }
      ]


        // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }


    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                {
                    summery.map(({id,subtitle,title,icon,color}) => <Summery key={id} color={color} id={id} subtitle={subtitle} title={title} icon={icon} />)
                }
            </div>

            <div className="owner-section-1 mt-10 gap-5 w-full">
                <div className="shadow-md p-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Revenue</h3>
                        <div className="flex gap-2 text-gray-500">
                            <Calendar className="cursor-pointer" size={15} />
                            <MoreVertical className="cursor-pointer" size={15} />
                        </div>
                    </div>
                    <div className="gap-2 my-4 chart-legends">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-100 w-fit p-2 rounded-full">
                                <DollarSign className="text-primary" size={15} />
                            </div>
                            <div>
                                <h5 className="text-gray-500">Total Revenue</h5>
                                <h5 className="font-semibold">{totalRent - totalExpenses} BDT</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-green-100 w-fit p-2 rounded-full">
                                <DollarSign className="text-green-500" size={15} />
                            </div>
                            <div>
                                <h5 className="text-gray-500">Total Rent</h5>
                                <h5 className="font-semibold">{totalRent} BDT</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-red-100 w-fit p-2 rounded-full">
                                <DollarSign className="text-red-500" size={15} />
                            </div>
                            <div>
                                <h5 className="text-gray-500">Total Expense</h5>
                                <h5 className="font-semibold">{totalExpenses} BDT</h5>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-x-scroll">
                        <BarChart 
                            dataset1={chartRents} 
                            dateset2={chartExpenses}
                            min={0}
                            max={100000} 
                            stepSize={20000}
                        />
                    </div>

                </div>

                <div className="shadow-md p-2">
                    <div className="flex md:flex-row flex-col justify-between md:items-center gap-2 mb-4">
                        <div>
                            <h3 className="text-xl font-semibold">Maintainance Requests</h3>
                            <p className="text-gray-500 text-xs">Total 44,559 Tickets</p>
                        </div>
                        <button 
                            onClick={()=>router.push('/maintainance_requests/all_maintainance_requests')} 
                            className="flex gap-2 items-center w-fit text-sm text-blue-500"
                        >
                            View All <ArrowRight size={15} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {
                            threeRequests.map(({_id,date,propertyId,unitId,maintainerId,issue,status})=> {
                                const property = properties.filter((item) => propertyId === item._id)[0]?.name
                                const unit = units.filter((item) => unitId === item._id)[0]?.name
                                const maintainer = maintainers.filter((item) => maintainerId === item._id)[0]?.name

                                let statusStyle = ''
                                let border = ''

                                if ( status === 'Complete') {
                                    statusStyle = 'text-indigo-600 text-xs bg-indigo-100 px-4 py-2 rounded-lg'
                                    border = 'border-l-4 border-indigo-500'
                                } else if ( status === 'Incomplete' ) {
                                    statusStyle = 'text-red-600 bg-red-100 px-4 py-2 rounded-lg text-xs'
                                    border = 'border-l-4 border-red-500'
                                } else {
                                    statusStyle = 'text-amber-600 bg-amber-100 px-3 py-2 rounded-lg text-xs'
                                    border = 'border-l-4 border-amber-500'
                                }
                                return (
                                    <div key={_id} className={`${border} flex md:flex-row flex-col md:items-center justify-between rounded-md px-2 py-1`}>
                                        <div>
                                            <h4 className="font-semibold">{format(date,"MMMM do, yyyy")}</h4>
                                            <h5 className="text-xs text-gray-500">{issue}</h5>
                                            <h5 className="text-xs text-gray-500"> in {property}/{unit}</h5>
                                            
                                                {
                                                    maintainer ?
                                                    <p className="text-gray-400 text-xs">Assigned to <span className="text-primary">{maintainer}</span> </p>
                                                    :
                                                    <p className="text-gray-400 text-xs">Not assigned <span className="text-red-500">yet</span> </p>
                                                }
                                           
                                        </div>
                                        <h4 className={`${statusStyle} md:my-0 my-2 w-fit`}>{status}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>

            <div className="shadow-md my-10 p-4">
                <div className="flex md:flex-row flex-col justify-between md:items-center gap-2 mb-4">
                    <h3 className="text-xl font-semibold">My Properties</h3>
                    <Button 
                        onClick={()=>router.push('/properties/all_properties')} 
                        variant='outline' 
                        className="flex gap-2 items-center w-fit"
                    >
                        View All <ArrowRight size={15} />
                    </Button>
                </div>
                <DataTable pagination={false} columns={propertyColumns} data={properties} />
                <div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default OwnerDashboard;