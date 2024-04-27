"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface PackageClientProps {
    data : PackageProps[]
}

import { ColumnDef } from "@tanstack/react-table"
// import { CellAction } from "./cell-action"

import { useEffect, useState } from "react"
import Link from "next/link"

import toast, { Toaster } from "react-hot-toast"
import { PackageProps } from "@/types"
import { CellAction } from "./cell-action"
import { columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
// import { SellRecords } from "@/components/ui/sellrecords-table"

export const PackagesClinet : React.FC<PackageClientProps> = ({data}) => {


    // const [records, setRecords] = useState(data)
    // const [update,setUpdate ] = useState(false)


    // const handleDelete = async (id : number) => {
    //     const res = await fetch(`https://pos.inspiredinteriorbd.com/api/sellRecords?sell_id=${id}`, {
    //       method : "DELETE"
    //     })
    //     const status = res.status
    //     if (status === 200) {
    //         toast.success(`Row removed permenantly !`)
    //         const updatedTable = records.filter(({sell_id}) => id !== sell_id)
    //         setRecords(updatedTable)
    //       setUpdate(!update)  
    //     }
    // }


 

    return (
        <>
            <DataTable searchKey="label" columns={columns} data={data} />
            <Toaster />
        </>
    )
}