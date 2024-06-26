"use client"
import { ArrowRight, Calendar, CircleCheck, DollarSign, Hammer, Home, MoreVertical, Tags, UserRound, Users, UsersRound, Warehouse, WarehouseIcon, Wrench } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import { DataTable } from "../ui/data-table";
import { format } from "date-fns";
import BarChart from "../BarChart";
import { useRouter } from "next/navigation";
import { ExpensesReducerProps, InvoiceProps, TenantInvoicesReducerProps, TenantMaintainanceRequestsReducerProps, TenantProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getTenantMaintainanceRequests } from "@/redux/data/tenant/maintainanceRequestsSlice";
import { getOwnerMaintainanceTypes } from "@/redux/data/owner/settings/maintainanceTypesSlice";
import { getTenantInvoices } from "@/redux/data/tenant/invoicesSlice";
import { getOwnerInvoiceTypes } from "@/redux/data/owner/settings/invoiceTypesSlice";
import { getTenantRents } from "@/redux/data/tenant/rentsSlice";
import { getDocumentSettings } from "@/redux/data/owner/settings/documentSettingsSlice";
import { getTenantDocuments } from "@/redux/documents/tenantDocumentsSlice";
import { getMaintainerReceivedMessages } from "@/redux/data/maintainer/messagesSlice";
import { getTenantMessages, getTenantReceivedMessages } from "@/redux/data/tenant/messagesSlice";

interface TenantDashboardProps {
    tenant : TenantProps
}


const TenantDashboard : React.FC<TenantDashboardProps> = ({tenant}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(()=>{
        const getData = async () => {

            if (tenant) {
               
                    const requests = await api.get(`getTenantRequests?propertyId=${tenant.property._id}&unitId=${tenant.unit._id}`,{validateStatus: () => true})
                    const maintainanceTypes = await api.get(`getMaintainaceType?id=${tenant.owner._id}`,{validateStatus: () => true})
                    const invoices = await api.get(`getTenantInvoices?property=${tenant.property._id}&unit=${tenant.unit._id}`,{validateStatus: () => true})
                    const invoiceTypes = await api.get(`getOwnerInvoiceType?ownerId=${tenant.owner._id}`,{validateStatus: () => true})
                    const documentSettings = await api.get(`getOwnerDocumentSettings?ownerId=${tenant.owner._id}`,{validateStatus: () => true})
                    const rents = await api.get(`geTenantRents?tenantId=${tenant._id}`,{validateStatus: () => true})
                    const documents = await api.get(`getTenantDocument?tenantId=${tenant._id}`,{validateStatus: () => true})
                    const messages = await api.get(`getMessages?id=${tenant.user._id}`,{validateStatus: () => true})
                    const sent = await api.get(`getSentMessages?id=${tenant.user._id}`,{validateStatus: () => true})


                    dispatch(getTenantMaintainanceRequests(requests.data))
                    dispatch(getOwnerMaintainanceTypes(maintainanceTypes.data))
                    dispatch(getTenantInvoices(invoices.data))
                    dispatch(getOwnerInvoiceTypes(invoiceTypes.data))
                    dispatch(getDocumentSettings(documentSettings.data))
                    dispatch(getTenantRents(rents.data))
                    dispatch(getTenantDocuments(documents.data))
                    dispatch(getTenantReceivedMessages(messages.data))
                    dispatch(getTenantMessages(sent.data))

           
                }
            }
            getData()
    },[tenant])



    const requests = useSelector(({tenantMaintainanceReducer} : TenantMaintainanceRequestsReducerProps)=>tenantMaintainanceReducer).tenantMaintainanceRequests
    // const {expenses} = useSelector(({expensesReducer} : ExpensesReducerProps)=>expensesReducer)
    const invoices = useSelector(({tenantInvoicesReducer} : TenantInvoicesReducerProps)=>tenantInvoicesReducer).tenantInvoices.slice(0,5)
    // const thisExpenses = expenses.filter(({propertyId,unitId})=> propertyId === tenant.property._id && unitId === tenant.unit._id)


    const summery = [
        {
            id : 0,
            subtitle : "Unit",
            title : `${tenant.unit.name}`,
            icon : <Home color="#f97316" size={20} />,
            color : 'orange'
        },
        {
            id : 1,
            subtitle : "Family Members",
            title : `${tenant.familyMembers}`,
            icon : <Users color="#FFCA4B" size={20} />,
            color : 'amber'
        },
        {
            id : 2,
            subtitle : "Maintainance",
            title : `${requests.length}`,
            icon : <UsersRound color="#704BFF" size={20} />,
            color : 'indigo'
        }
    ]

    
    let totalExpenses = 0
    let othersChart = [
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

    // thisExpenses.map(({amount,date,type}) =>{
    //     totalExpenses = totalExpenses + amount
    //     const monthNum = date.split("-")[1]

    //     if (type !== '3') {
    //         othersChart.map(({month},index)=>{
    //             if (month === monthNum) {
    //                 othersChart[index].amount = othersChart[index].amount + amount
    //             }
    //         })
    //     }
        
    // })


    let totalRent = 0
    let rentChart = [
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

    // thisExpenses.map(({amount,type,date}) =>{
    //     if (type === '3') {
    //         totalRent = totalRent + amount
    //         const monthNum = date.split("-")[1]

    //         rentChart.map(({month},index)=>{
    //             if (month === monthNum) {
    //                 rentChart[index].amount = rentChart[index].amount + amount
    //             }
    //         })
    //     }
    // })



    const invoiceColumn : ColumnDef<InvoiceProps>[] = [
        {
            accessorKey: "dueDate",
            header: "Due Date",
            cell: ({row}) => <span>{row.original.dueDate ? format(row.original.dueDate,"MMMM do, yyyy") : 'N/A'}</span>
          },
          {
            accessorKey: "invoiceNo",
            header: "Invoice No",
          },
          {
            accessorKey: "typeName",
            header: "Invoice Type",
          },
          {
            accessorKey: "property_unit",
            header: "Property/Unit",
            cell: ({row}) => <span>{row.original.propertyName}/{row.original.unitName}</span>
          },
          {
            accessorKey: "amount",
            header: "Amount",
            cell: ({row}) => <span>{row.original.amount} BDT</span>
          },
          {
            accessorKey: "status",
            header: "Status",
            cell: ({row}) => {
              if (row.original.status === "Paid") {
                  return <p className="text-green-600 bg-green-100 px-4 py-2 rounded-lg">Paid</p> 
              }
              else if (row.original.status === "Pending") {
                  return <p className="text-amber-600 bg-amber-100 px-4 py-2 rounded-lg">Pending</p> 
              } else {
                  return <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">Due</p> 
              }
            }        
          }
      ]

    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                <div className="border-2 border-gray-300 rounded-3xl py-6 px-6 flex items-center justify-evenly">
                    <div className="text-center">
                        <h5 className="text-sm font-semibold mt-2">Property</h5>
                        <h2 className={`text-xl font-bold mt-4 text-green-500`}>{tenant.property.name}</h2>
                    </div>
                    <div className={`bg-green-100 flex justify-center items-center w-[40px] h-[40px] rounded-xl`}>
                        <Warehouse color="#22c55e" size={20} />
                    </div>
                </div>
                {
                    summery.map(({id,subtitle,title,icon,color}) => <Summery key={id} color={color} id={id} subtitle={subtitle} title={title} icon={icon} />)
                }
            </div>

            <div className="tenant-section-1 mt-10 gap-5 w-full">
                <div className="shadow-md p-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Expenses</h3>
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
                                <h5 className="text-gray-500 text-sm">Total Expenses</h5>
                                <h5 className="font-semibold">{totalExpenses} BDT</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-green-100 w-fit p-2 rounded-full">
                                <DollarSign className="text-green-500" size={15} />
                            </div>
                            <div>
                                <h5 className="text-gray-500 text-sm">Appartment Rent</h5>
                                <h5 className="font-semibold">{tenant.property.rent} BDT</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-red-100 w-fit p-2 rounded-full">
                                <DollarSign className="text-red-500" size={15} />
                            </div>
                            <div>
                                <h5 className="text-gray-500 text-sm">Other Expenses</h5>
                                <h5 className="font-semibold">{totalExpenses - totalRent} BDT</h5>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-x-scroll">
                        <BarChart 
                            dataset1={rentChart} 
                            dateset2={othersChart} 
                            min={0}
                            max={30000}
                            stepSize={5000}
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
                            onClick={()=>router.push('/tenant_requests/all_maintainance_requests')} 
                            className="flex gap-2 items-center w-fit text-sm text-blue-500"
                        >
                            View All <ArrowRight size={15} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {
                            requests.slice(0,3).map(({_id,date,property,unit,maintainer,issue,status,propertyName,unitName})=> {


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
                                            <h5 className="text-xs text-gray-500"> in {propertyName}/{unitName}</h5>
                                            
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
                    <h3 className="text-xl font-semibold">Invoices</h3>
                    <button 
                            onClick={()=>router.push('/tenant_invoices')} 
                            className="flex gap-2 items-center w-fit text-sm text-blue-500"
                        >
                            View All <ArrowRight size={15} />
                    </button>
                </div>
                <DataTable pagination={false} columns={invoiceColumn} data={invoices} />
                <div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default TenantDashboard;