"use client"

import { InvoiceTypeProps } from "@/types"

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
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import './invoice-type-form.css'
import { addInvoiceType, updateInvoiceType } from "@/redux/data/owner/settings/invoiceTypesSlice"



type InvoiceTypeFormValues = z.infer<typeof formSchema>

interface InvoiceTypeFormProps {
    initialData: InvoiceTypeProps
}

const formSchema = z.object({
    title : z.string().min(1, {message : "Title Required"}),
    tax : z.coerce.number().min(0, {message : "Tax Required"}),
})


export const InvoiceTypeForm : React.FC<InvoiceTypeFormProps> = ({
    initialData
}) => {

    const dispatch = useDispatch()
    const router = useRouter()


    const title = initialData ? 'Edit Invoice Type' : 'Create Invoice Type'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit a invoice type" : "Create a new invoice type"
    const toastMessage = initialData ? "Invoice type updated" : "Invoice type created"
 

    const [loading, setLoading] = useState(false)
    const form = useForm<InvoiceTypeFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            title : '',
            tax : 0
        }
    })

    const onSubmit = async (data : InvoiceTypeFormValues) => {

        if (initialData) {
            const formData = {...data, _id : initialData._id}
            dispatch(updateInvoiceType(formData))
        } else {
            const formData = {...data, _id : '10'}
            dispatch(addInvoiceType(formData))
        }
        toast.success(toastMessage)
        router.push('/settings/invoice_type')
    }

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
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Utilities' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tax"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tax (in BDT)<span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder='1200' {...field} />
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