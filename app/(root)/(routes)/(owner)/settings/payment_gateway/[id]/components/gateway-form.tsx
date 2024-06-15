"use client"

import { GatewayProps, OwnerInfoReducerProps } from "@/types"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PackageProps } from '@/types'
import Pathname from '@/components/pathname'
import { Checkbox } from '@/components/ui/checkbox'
import './gateway-form.css'
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import api from "@/actions/api"
import { addOwnerGateway, updateOwnerGateway } from "@/redux/data/owner/settings/gatewaySlice"


type GatewayFormValues = z.infer<typeof formSchema>

interface GatewayFormProps {
    initialData: GatewayProps
}

const formSchema = z.object({
    title : z.string().min(1, {message : "Title Required"}),
    mode : z.string().min(1, {message : "Mode Required"}),
    slug : z.string().min(1, {message : "Slug Required"})
})


export const GatewayForm : React.FC<GatewayFormProps> = ({
    initialData
}) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo


    const title = initialData ? 'Edit Gateway' : 'Create Gateway'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit a gateway method" : "Create a new gateway method"
    const toastMessage = initialData ? "Gateway updated" : "Gateway created"
 

    const [loading, setLoading] = useState(false)
    const form = useForm<GatewayFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            title : '',
            slug : '',
            mode : ''
        }
    })

    const onSubmit = async (data : GatewayFormValues) => {

        if (initialData) {
            const formData = {
                ...data, 
                _id : initialData._id
            }
            const result = await api.patch(`updateGateway`, formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(updateOwnerGateway(formData))
                router.push('/settings/payment_gateway')
                toast.success(toastMessage)
            } else {
                toast.error("Something went wrong.")
            }
        } else {
            const formData = {
                ...data, 
                owner : owner._id
            }
            const result = await api.post(`addGateway`, formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(addOwnerGateway(result.data))
                toast.success(toastMessage)
                router.push('/settings/payment_gateway')
            } else {
                toast.error("Something went wrong.")
            }
        }
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
                                        <Input disabled={loading} placeholder='PayPal' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='paypal ' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mode <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Live' {...field} />
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