"use client"

interface OwnerPackagesClientProps {
    data : OwnerPackageProps[]
}


import { useEffect, useState } from "react"


import toast, { Toaster } from "react-hot-toast"
import { OwnerPackageProps, OwnerProps, OwnersReducerProps, PackagesReducersProps } from "@/types"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { AssignPackageFormProps, AssignPackageModal } from "@/components/modals/assign-package-modal"
import api from "@/actions/api"
import { useRouter } from "next/navigation"
import { addAllOwnerPackage } from "@/redux/ownerPackages/ownerPackagesSlice"

export const OwnerPackagesClient : React.FC<OwnerPackagesClientProps> = ({data}) => {

    // ---------------------------------------------------------------------------------------------
    // anti hydration

    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const {packages} = useSelector(({packagesReducer} : PackagesReducersProps) => packagesReducer)
    const {owners} = useSelector(({ownersReducer} : OwnersReducerProps) => ownersReducer)

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }

    const handleAssign = async (data : AssignPackageFormProps) => {
        const result = await api.post(`assignOwnerPackage`,data, {validateStatus: () => true})
        if (result.status === 200) {
            dispatch(addAllOwnerPackage(result.data))
            toast.success("Package Assigned")
        } else {
            toast.error('Something went wrong.')
        }
        setOpen(false)
    }
    return (
        <>
            <AssignPackageModal
            isOpen={open} 
            onClose={()=>setOpen(false)} 
            onConfirm={(ownerPackage : AssignPackageFormProps) => handleAssign(ownerPackage)} 
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