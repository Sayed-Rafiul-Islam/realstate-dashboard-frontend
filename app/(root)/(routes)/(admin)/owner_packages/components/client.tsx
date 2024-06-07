"use client"

interface OwnerPackagesClientProps {
    data : OwnerPackageProps[]
}


import { useEffect, useState } from "react"


import { Toaster } from "react-hot-toast"
import { OwnerPackageProps, PackagesReducersProps } from "@/types"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { addOwnerPackage } from "@/redux/ownerPackages/ownerPackagesSlice"
import { useDispatch, useSelector } from "react-redux"
import { AssignPackageModal } from "@/components/modals/assign-package-modal"

export const OwnerPackagesClient : React.FC<OwnerPackagesClientProps> = ({data}) => {

    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useDispatch()
    const {packages} = useSelector(({packagesReducer} : PackagesReducersProps) => packagesReducer)
    // const {packages} = useSelector(({packagesReducer} : PackagesReducersProps) => packagesReducer)
    const owners = [
        {
            _id : "1",
            name : "Beru"
        },
        {
            _id : "2",
            name : "Igris"
        },
        {
            _id : "3",
            name : "Levi"
        }
    ]

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    const handleAssign = async (id : string) => {

        console.log(id)

        
        const temp = 
            {
                _id : "4",
                name : "nigga",
                email : "ragib@gmail.com",
                packageName : "Standard",
                gateway : "Cash",
                startDate : "2024-02-04T00:00:00.000Z",
                endDate : "2025-02-04T00:00:00.000Z",
                paymentStatus : "Canceled",
                status : false
            }

        // get the owner package by this id from DB and send it to redux 

        dispatch(addOwnerPackage(temp))
        setOpen(false)

        
        
    }
    return (
        <>
            <AssignPackageModal
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={(id : string) => handleAssign(id)} 
            loading={loading}
            owners={owners}
            packages={packages}
             />
            <div className="flex justify-end mb-4">
                <Button onClick={()=>setOpen(true)} className="">Assign Package</Button>
            </div>
            <DataTable pagination={true} searchKey="email" columns={columns} data={data} />
        </>
    )
}