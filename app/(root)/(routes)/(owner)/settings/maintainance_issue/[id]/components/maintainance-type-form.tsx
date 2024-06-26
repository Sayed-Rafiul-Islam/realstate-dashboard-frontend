"use client"

import { MaintainanceTypeProps, OwnerInfoReducerProps } from "@/types"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Pathname from '@/components/pathname'
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import './maintainance-type-form.css'
import { addMaintainanceType, updateMaintainanceType } from "@/redux/settings/maintainanceTypesSlice"
import { DatePickerForm } from "@/components/ui/date-picker-form"
import api from "@/actions/api"
import { addOwnerMaintainanceType, updateOwnerMaintainanceType } from "@/redux/data/owner/settings/maintainanceTypesSlice"




type MaintainanceTypeFormValues = z.infer<typeof formSchema>

interface MaintainanceTypeFormProps {
    initialData: MaintainanceTypeProps
}

const formSchema = z.object({
    type : z.string().min(1, {message : "Maintainance Type Required"}),
    maintainer : z.string().min(1, {message : "Maintainaner Type Required"}),
    date : z.string().min(1, {message : "Date Required"})
})


export const MaintainanceIssueForm : React.FC<MaintainanceTypeFormProps> = ({
    initialData
}) => {

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo

    const dispatch = useDispatch()
    const router = useRouter()
    const [date, setDate] = useState(initialData ? initialData.date : '')


    const title = initialData ? 'Edit Maintainance Type' : 'Create Maintainance Type'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit a maintainance type" : "Create a new maintainance type"
    const toastMessage = initialData ? "Maintainance type updated" : "Maintainance type created"
 

    const [loading, setLoading] = useState(false)
    const form = useForm<MaintainanceTypeFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            type : '',
            maintainer : '',
            date : ''
        }
    })

    const onSubmit = async (data : MaintainanceTypeFormValues) => {

        if (initialData) {
            const formData = {...data, _id : initialData._id,owner : owner._id}
            const result = await api.patch(`updateMaintainanceType`,formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(updateOwnerMaintainanceType(result.data))
                toast.success(toastMessage)
                router.push('/settings/maintainance_issue')
            } else {
                toast.error("Something went wrong")
            }
        } else {
            const formData = {...data, owner : owner._id}
            const result = await api.post(`createMaintainanceType`,formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(addOwnerMaintainanceType(result.data))
                toast.success(toastMessage)
                router.push('/settings/maintainance_issue')
            } else {
                toast.error("Something went wrong")
            }
            
        }  
    }

    useEffect(()=>{
        form.setValue('date',date)
    },[date])

    const [isMounted, setIsMounted] = useState(false)


    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null
    }
  
    return (
        <div className='add'>
            <div className="flex items-center justify-between heading">
                <Heading
                    title={title}
                    description={description}
                />
                <Pathname />
            </div>
            <Separator className='my-5' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maintainance Type <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Electrical problems' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maintainer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maintainer Type <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Electritian' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                    <div>
                                        <DatePickerForm initialDate = {initialData ? initialData.date : ''} label='Date' onPickDate={(date)=> setDate(date)} /> 
                                    </div>
                                       
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form> 
        </div>
    )
    
}