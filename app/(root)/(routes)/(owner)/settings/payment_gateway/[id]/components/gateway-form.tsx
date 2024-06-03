"use client"

import { GatewayProps } from "@/types"

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
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { addGateway, updateGateway } from "@/redux/settings/gatewaySlice"


type GatewayFormValues = z.infer<typeof formSchema>

interface GatewayFormProps {
    initialData: GatewayProps
}

const formSchema = z.object({
    title : z.string().min(1, {message : "Title Required"}),
    mode : z.string().min(1, {message : "Mode Required"}),
    slug : z.string().min(1, {message : "Slug Required"}),
    // slug : z.coerce.number().min(1),
    // yearlyPrice : z.coerce.number().min(1),
    // maxProperty : z.coerce.number().min(1),
    // maxUnit : z.coerce.number().min(1),
    // status : z.boolean().default(false),
    // trial : z.boolean().default(false),
})


export const GatewayForm : React.FC<GatewayFormProps> = ({
    initialData
}) => {

    const dispatch = useDispatch()
    const router = useRouter()


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
            const formData = {...data, _id : initialData._id}
            dispatch(updateGateway(formData))
        } else {
            const formData = {...data, _id : '10'}
            dispatch(addGateway(formData))
        }
        toast.success(toastMessage)
        router.push('/settings/payment_gateway')
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