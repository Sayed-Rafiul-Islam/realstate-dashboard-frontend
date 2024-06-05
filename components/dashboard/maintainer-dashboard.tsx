import { ArrowRight, Calendar, CircleCheck, DollarSign, Hammer, Home, MoreVertical, Tags, UserRound, UsersRound, Warehouse, Wrench } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { format } from "date-fns";
import BarChart from "../BarChart";
import { useRouter } from "next/navigation";
import { ExpensesReducerProps, MaintainanceRequestsReducerProps, MaintainersReducerProps, PropertiesReducerProps, RentsReducerProps, TenantInfoReducerProps, TenantsReducerProps, UnitsReducerProps } from "@/types";
import { useSelector } from "react-redux";

const MaintainerDashboard = () => {
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo

    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps)=>propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps)=>unitsReducer)
    const tenantCount = useSelector(({tenantsReducer} : TenantsReducerProps)=>tenantsReducer).tenants.length
    const {maintainers} = useSelector(({maintainersReducer} : MaintainersReducerProps)=>maintainersReducer)
    const {rents} = useSelector(({rentsReducer} : RentsReducerProps)=>rentsReducer)
    const {expenses} = useSelector(({expensesReducer} : ExpensesReducerProps)=>expensesReducer)
    const {maintainanceRequests} = useSelector(({maintainanceReducer} : MaintainanceRequestsReducerProps)=>maintainanceReducer)
    const requests = maintainanceRequests.filter(({propertyId,unitId})=> propertyId === tenant.propertyId && unitId === tenant.unitId)
    const pendingReq = requests.filter(({status})=> status === 'In Progress')
    const completedReq = requests.filter(({status})=> status === 'Complete')

    const propertyName = properties.filter(({_id}) => _id === tenant.propertyId)[0].name
    const unitName = units.filter(({_id}) => _id === tenant.unitId)[0].name

    const router = useRouter()

    const summery = [

        {
            id : 1,
            subtitle : `Total Requests`,
            title : `${requests.length}`,
            icon : <Wrench className="bg-white p-2 w-[32px] h-[32px]"  color="#2563eb" size={20} />
        },
        {
            id : 2,
            subtitle : "Pending Requests",
            title : `${pendingReq.length}`,
            icon : <Hammer className="bg-white p-2 w-[32px] h-[32px]"  color="#e11d48" size={20} />
        },
        {
            id : 2,
            subtitle : "Completed Requests",
            title : `${completedReq.length}`,
            icon : <CircleCheck className="bg-white p-2 w-[32px] h-[32px]"  color="#50C878" size={20} />
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

    console.log(chartDue)

    // const propertyColumns = [
    //     {
    //       accessorKey: "name",
    //       header: "Property Name",
    //     },
    //     {
    //       accessorKey: "unitCount",
    //       header: "Units",
    //     },
    //     {
    //       accessorKey: "available",
    //       header: "Available Units",
    //     },
    //     {
    //       accessorKey: "tenants",
    //       header: "Tenants",
    //     }
    //   ]

    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                <div className="bg-gray-100 rounded-md py-6 px-6">
                <Home className="bg-white p-2 w-[32px] h-[32px]"  color="#ff8c2e" size={20} />
                    <h5 className="text-sm text-gray-500 mt-2">{unitName}</h5>
                    <h2 className="text-2xl font-semibold mt-4">{propertyName}</h2>
                </div>
                {
                    summery.map(({id,subtitle,title,icon}) => <Summery id={id} subtitle={subtitle} title={title} icon={icon} />)
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
                        {/* <BarChart dataset1={chartPaid} dateset2={chartDue} /> */}
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
                        {/* {
                            threeRequests.map(({_id,date,propertyId,unitId,maintainerId,issue,status})=> {
                                const property = properties.filter((item) => propertyId === item._id)[0].name
                                const unit = units.filter((item) => unitId === item._id)[0].name
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
                        } */}
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
                {/* <DataTable pagination={false} columns={propertyColumns} data={properties} /> */}
                <div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default MaintainerDashboard;