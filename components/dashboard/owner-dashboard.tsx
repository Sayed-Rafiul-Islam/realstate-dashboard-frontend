"use client"

import { ArrowRight, Calendar, DollarSign, Home, MoreVertical, UserRound, Users, UsersRound, Warehouse, Wrench } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import { useDispatch, useSelector } from "react-redux";
import { ExpensesReducerProps, OwnerMaintainanceRequestsReducerProps, OwnerMaintainersReducerProps, OwnerPropertyReducerProps, OwnerProps, OwnerTenantsReducerProps, OwnerUnitsReducerProps, PropertyProps, RentsReducerProps } from "@/types";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import BarChart from "../BarChart";
import { useEffect, useState } from "react";
import { DataTable } from "../ui/data-table";
import api from "@/actions/api";
import { getOwnerProperties } from "@/redux/data/owner/propertiesSlice";
import { getOwnerUnits } from "@/redux/data/owner/unitsSlice";
import { getOwnerMaintainanceTypes } from "@/redux/data/owner/settings/maintainanceTypesSlice";
import { getOwnerMaintainers } from "@/redux/data/owner/maintainersSlice";
import { ColumnDef } from "@tanstack/react-table";
import { getOwnerTenants } from "@/redux/data/owner/tenantsSlice";
import { getOwnerMaintainanceRequests } from "@/redux/data/owner/maintainanceRequestsSlice";
import { getOwnerExpenseTypes } from "@/redux/data/owner/settings/expenseTypesSlice";
import { getOwnerInvoiceTypes } from "@/redux/data/owner/settings/invoiceTypesSlice";
import { getOwnerGateways } from "@/redux/data/owner/settings/gatewaySlice";
import { getOwnerInvoices } from "@/redux/data/owner/invoicesSlice";

interface OwnerDashboardProps {
    owner : OwnerProps
}

const OwnerDashboard : React.FC<OwnerDashboardProps> = ({owner}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(()=>{
        const getData = async () => {
            if (owner) {
                    const properties = await api.get(`getOwnerProperties?id=${owner._id}`,{validateStatus: () => true})
                    const units = await api.get(`getOwnerUnits?id=${owner._id}`,{validateStatus: () => true})
                    const maintainers = await api.get(`getOwnerMaintainers?id=${owner._id}`,{validateStatus: () => true})
                    const maintainanceTypes = await api.get(`getMaintainaceType?id=${owner._id}`,{validateStatus: () => true})
                    const expenseTypes = await api.get(`getOwnerExpenseType?ownerId=${owner._id}`,{validateStatus: () => true})
                    const invoiceTypes = await api.get(`getOwnerInvoiceType?ownerId=${owner._id}`,{validateStatus: () => true})
                    const gateways = await api.get(`getOwnerGateway?ownerId=${owner._id}`,{validateStatus: () => true})
                    const tenants = await api.get(`getOwnerTenants?id=${owner._id}`,{validateStatus: () => true})
                    const requests = await api.get(`getOwnerRequests?ownerId=${owner._id}`,{validateStatus: () => true})
                    const invoices = await api.get(`getOwnerInvoice?ownerId=${owner._id}`,{validateStatus: () => true})

                    dispatch(getOwnerMaintainanceRequests(requests.data))
                    dispatch(getOwnerProperties(properties.data))
                    dispatch(getOwnerUnits(units.data))
                    dispatch(getOwnerTenants(tenants.data))
                    dispatch(getOwnerMaintainanceTypes(maintainanceTypes.data))
                    dispatch(getOwnerExpenseTypes(expenseTypes.data))
                    dispatch(getOwnerInvoiceTypes(invoiceTypes.data))
                    dispatch(getOwnerGateways(gateways.data))
                    dispatch(getOwnerMaintainers(maintainers.data))
                    dispatch(getOwnerInvoices(invoices.data))
                }
            }
            getData()
    },[owner])

    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps)=>ownerPropertyReducer).ownerProperties
    const units = useSelector(({ownerUnitsReducer} : OwnerUnitsReducerProps)=>ownerUnitsReducer).ownerUnits
    const maintainers = useSelector(({ownerMaintainersReducer} : OwnerMaintainersReducerProps)=>ownerMaintainersReducer).ownerMaintainers
    const tenants = useSelector(({ownerTenantsReducer} : OwnerTenantsReducerProps) => ownerTenantsReducer).ownerTenants



    const tenantCount = tenants.length
    const {rents} = useSelector(({rentsReducer} : RentsReducerProps)=>rentsReducer)
    const {expenses} = useSelector(({expensesReducer} : ExpensesReducerProps)=>expensesReducer)
    const threeRequests = useSelector(({ownerMaintainanceReducer} : OwnerMaintainanceRequestsReducerProps)=>ownerMaintainanceReducer)
    .ownerMaintainanceRequests.slice(0,3)

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

    const propertyColumns : ColumnDef<PropertyProps>[] = [
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
          cell: ({row}) => {
            const totalTenants = tenants.filter((tenant)=> tenant.property._id === row.original._id).length
            return <span>{row.original.unitCount - totalTenants}</span>
          }
        },
        {
          accessorKey: "tenants",
          header: "Tenants",
          cell: ({row}) => {
            const totalTenants = tenants.filter((tenant)=> tenant.property._id === row.original._id).length
            return <span>{totalTenants}</span>
          }
        }
      ]

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
                            threeRequests.map(({_id,date,property,unit,maintainer,issue,status})=> {

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
                                            <h5 className="text-xs text-gray-500">
                                                 in {property && property.name}/{unit && unit.name}
                                            </h5>
                                            
                                                {
                                                    maintainer ?
                                                    <p className="text-gray-400 text-xs">Assigned to <span className="text-primary">{maintainer && maintainer.name}</span> </p>
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