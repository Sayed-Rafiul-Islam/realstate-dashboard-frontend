import { ArrowRight, Calendar, CircleCheck, DollarSign, Hammer, Home, MoreVertical, Tags, UserRound, UsersRound, Warehouse, Wrench } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { GatewaysReducerProps, InvoiceTypesReducerProps, InvoicesReducerProps, MaintainanceRequestsReducerProps, MaintainanceTypesReducerProps, MaintainerInfoReducerProps, MaintainerMaintainanceRequestsReducerProps, MaintainerProps, MaintainersReducerProps, PropertiesReducerProps, PropertyProps, RentsReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../BarChart";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { useEffect, useState } from "react";
import api from "@/actions/api";
import { getMaintainerMaintainanceRequests } from "@/redux/data/maintainer/maintainanceRequestsSlice";
import { getOwnerMaintainanceTypes } from "@/redux/data/maintainer/settings/maintainanceTypesSlice";

export interface InvoiceColumn {
    _id : string,
    property : string,
    unit : string,
    issue : string,
    cost : string,
    invoiceNo : string
}

interface MaintainerDashboardProps {
    maintainer : MaintainerProps
}

const MaintainerDashboard : React.FC<MaintainerDashboardProps> = ({maintainer}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(()=>{
        const getData = async () => {
            if (maintainer) {
               
                    const requests = await api.get(`getMaintainerRequests?maintainerId=${maintainer._id}`,{validateStatus: () => true})
                    const maintainanceTypes = await api.get(`getMaintainaceType?id=${maintainer.owner._id}`,{validateStatus: () => true})
                    // const properties = await api.get(`getOwnerProperties?id=${owner._id}`,{validateStatus: () => true})
                    // const units = await api.get(`getOwnerUnits?id=${owner._id}`,{validateStatus: () => true})
                    // const maintainers = await api.get(`getOwnerMaintainers?id=${owner._id}`,{validateStatus: () => true})
                    // const maintainanceTypes = await api.get(`getMaintainaceType?id=${owner._id}`,{validateStatus: () => true})
                    // const tenants = await api.get(`getOwnerTenants?id=${owner._id}`,{validateStatus: () => true})

                    dispatch(getMaintainerMaintainanceRequests(requests.data))
                    dispatch(getOwnerMaintainanceTypes(maintainanceTypes.data))

                    // dispatch(getOwnerProperties(properties.data))
                    // dispatch(getOwnerUnits(units.data))
                    // dispatch(getOwnerTenants(tenants.data))
                    // dispatch(getOwnerMaintainanceTypes(maintainanceTypes.data))
                    // dispatch(getOwnerMaintainers(maintainers.data))

                }
            }
            getData()
    },[maintainer])



  

    const requests = useSelector(({maintainerMaintainanceReducer} : MaintainerMaintainanceRequestsReducerProps)=>maintainerMaintainanceReducer).maintainerMaintainanceRequests
    const pendingReq = requests.filter(({status})=> status === 'In Progress')
    const completedReq = requests.filter(({status})=> status === 'Complete')


    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps)=>propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps)=>unitsReducer)

    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)
    const {invoices} = useSelector(({invoicesReducer} : InvoicesReducerProps)=>invoicesReducer)


    // let data : {propertyId : string, unitId : string, invoiceIds : {id : string}[]}[] = []
    // requests.filter(({propertyId,unitId})=> {
    //     const index = data.findIndex(item => propertyId === item.propertyId && unitId === item.unitId)
    //     if (index === -1) {
    //         let invoiceIds : {id : string}[] = []
    //         invoices.filter((item)=> {
    //             if (item.propertyId === propertyId && item.unitId === unitId) {
    //                 const invocieIndex = invoiceIds.findIndex(({id}) => item._id === id)
    //                 if (invocieIndex === -1) {
    //                     invoiceIds.push({id : item._id})
    //                 }
                    
    //             }
    //         })
    //         data.push({propertyId,unitId,invoiceIds})
    //     }
    // })

    // const thisInvoices = invoices.filter((item)=>{
    //     const temp = data.filter(({invoiceIds})=>{
    //         const i = invoiceIds.filter(({id})=>id === item._id)
    //         return i[0]
    //     })

    //     return temp[0]
    // }).slice(0,5)


   

    // let totalProperty : {propertyId : string}[] = []

    // requests.map(({propertyId})=>{
    //     const index = totalProperty.findIndex(item => propertyId === item.propertyId)
    //     if (index === -1) {
    //         totalProperty.push({propertyId})
    //     }
    // })

    const summery = [
        {
            id : 1,
            subtitle : `Total Requests`,
            title : `${requests.length}`,
            icon : <Wrench color="#FFA500" size={20} />,
            color : 'orange'
        },
        {
            id : 2,
            subtitle : "Pending Requests",
            title : `${pendingReq.length}`,
            icon : <Hammer color="#FFBF00" size={20} />,
            color : 'amber'
        },
        {
            id : 2,
            subtitle : "Completed Requests",
            title : `${completedReq.length}`,
            icon : <CircleCheck color="#4f46e5" size={20} />,
            color : 'indigo'
        }
    ]

 

    
    let totalCost = 0
    let chartDue = [
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

    requests.map(({cost,date,paymentStatus}) =>{
        totalCost = totalCost + cost
        const monthNum = date.split("-")[1]

        if (paymentStatus !== "Paid") {
            chartDue.map(({month},index)=>{
                if (month === monthNum) {
                    chartDue[index].amount = chartDue[index].amount + cost
                }
            })
        }
    })


    let totalPaid = 0
    let chartPaid = [
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

    requests.map(({cost,paymentStatus,date}) =>{
        if (paymentStatus === 'Paid') {
            totalPaid = totalPaid + cost
            const monthNum = date.split("-")[1]

            chartPaid.map(({month},index)=>{
                if (month === monthNum) {
                    chartPaid[index].amount = chartPaid[index].amount + cost
                }
            })
        }
    })

    
  
    


    const thisInvoices = invoices.filter(({by}) => by.id === '662774a250924ade5f6ce70b')

    const formattedInvoices = thisInvoices.map((
        {
            _id,
            invoiceNo,
            propertyId,
            issue,
            unitId,
            amount,
        }) => {
            const property = properties.filter((item)=> item._id === propertyId)[0]
            const unit = units.filter((item)=> item._id === unitId)[0]
            const maintainanceIssue = maintainanceTypes.filter((item)=> item._id === issue)[0]
            return {
                _id,
                property : property && property.name,
                unit : unit && unit.name,
                issue : maintainanceIssue?.type,
                cost : `BDT ${amount}`,
                invoiceNo,
            }
           
    })


    const invoiceColumn : ColumnDef<InvoiceColumn>[] = [
        {
          accessorKey: "property",
          header: "Property",
        },
        {
          accessorKey: "unit",
          header: "Unit",
        },
        {
          accessorKey: "issue",
          header: "Issue",
        },
        {
          accessorKey: "cost",
          header: "Cost",
        },
        {
          accessorKey: "invoiceNo",
          header: "Invoice No",
        }
      ]


    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                <div className="border-2 border-gray-300 rounded-3xl py-6 px-6 flex items-center justify-evenly">
                    <div className="text-center">
                        <h5 className="text-sm font-semibold mt-2">property</h5>
                        <h2 className={`text-xl font-bold mt-4 text-green-500`}>{maintainer.property.name}</h2>
                    </div>
                    <div className={`bg-green-100 flex justify-center items-center w-[40px] h-[40px] rounded-xl`}>
                        <Home  color="#50C878" size={20} />
                    </div>
                </div>
                {
                    summery.map(({id,subtitle,title,icon,color}) => <Summery key={id} id={id} subtitle={subtitle} title={title} icon={icon} color={color} />)
                }
            </div>

            <div className="owner-section-1 mt-10 gap-5 w-full">
                <div className="shadow-md p-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Maintainace Cost</h3>
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
                                <h5 className="text-gray-500">Total Cost</h5>
                                <h5 className="font-semibold">{totalCost} BDT</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-green-100 w-fit p-2 rounded-full">
                                <DollarSign className="text-green-500" size={15} />
                            </div>
                            <div>
                                <h5 className="text-gray-500">Paid</h5>
                                <h5 className="font-semibold">{totalPaid} BDT</h5>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-red-100 w-fit p-2 rounded-full">
                                <DollarSign className="text-red-500" size={15} />
                            </div>
                            <div>
                                <h5 className="text-gray-500">Due</h5>
                                <h5 className="font-semibold">{totalCost - totalPaid} BDT</h5>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-x-scroll">
                        <BarChart min={0} max={50000} stepSize={10000} dataset1={chartPaid} dateset2={chartDue} />
                    </div>

                </div>

                <div className="shadow-md p-2">
                    <div className="flex md:flex-row flex-col justify-between md:items-center gap-2 mb-4">
                        <div>
                            <h3 className="text-xl font-semibold">Maintainance Requests</h3>
                            <p className="text-gray-500 text-xs">Total 44,559 Tickets</p>
                        </div>
                        <button 
                            onClick={()=>router.push('/maintainer_requests')} 
                            className="flex gap-2 items-center w-fit text-sm text-blue-500"
                        >
                            View All <ArrowRight size={15} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {
                            requests.slice(0,3).map(({_id,date,property,unit,issue,status})=> {

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
                                            <h5 className="text-xs text-gray-500"> in {property && property.name}/{unit && unit.name}</h5>
                                            
                                                {
                                                    maintainer ?
                                                    <p className="text-gray-400 text-xs">Assigned to <span className="text-primary">{maintainer.name}</span> </p>
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
                        onClick={()=>router.push('/maintainer_invoices')} 
                        className="flex gap-2 items-center w-fit text-sm text-blue-500"
                    >
                        View All <ArrowRight size={15} />
                    </button>
                </div>
                    <DataTable pagination={false} columns={invoiceColumn} data={formattedInvoices} />
                <div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default MaintainerDashboard;