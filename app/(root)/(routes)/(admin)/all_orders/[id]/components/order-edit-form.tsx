"use client"

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
import { OrderProps, PackageProps } from '@/types'
import Pathname from '@/components/pathname'
import { Checkbox } from '@/components/ui/checkbox'
import './order-edit-form.css'
import { useRouter } from 'next/navigation'
import api from '@/actions/api'
import { useDispatch } from 'react-redux'
import { addPackage, updatePackage } from '@/redux/packages/packagesSlice'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { updateOrder } from '@/redux/orders/ordersSlice'


type OrderFormValues = z.infer<typeof formSchema>

interface OrderEditFormProps {
    initialData: OrderProps
}

const formSchema = z.object({
    status : z.string().min(1,{message : "Status Required"}),
    dateOfPayment : z.string().min(1, {message : "Payment date required"}),
    gateway : z.string().min(1, {message : "Gateway Required"}),
    transactionId : z.string().min(1, {message : "TransactionID Required"}),
})


export const OrderEditForm : React.FC<OrderEditFormProps> = ({
    initialData
}) => {
    const [status,setStatus] = useState(initialData.status)
    const [show,setShow] = useState(initialData.status === 'Paid' ? true : false)

    const router = useRouter()
    const dispatch = useDispatch()

    const title = 'Update Order'
    const action = 'Save Changes'
    const description = "Edit order"
    const toastMessage = "Order updated"

    const [loading, setLoading] = useState(false)
    const form = useForm<OrderFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            status : initialData.status,
        }
    })

    useEffect(()=>{
        form.setValue('dateOfPayment','')
        form.setValue('gateway','')
        form.setValue('transactionId','')
        if (status === 'Paid') {
            setShow(true)
        } else {
            setShow(false)
            form.setValue('dateOfPayment','00-00-00')
            form.setValue('gateway','N/A')
            form.setValue('transactionId','N/A')
        }       
    },[status])

    const onSubmit = async (data : OrderFormValues) => {
       
            const formData = {
                ...data,
                _id : initialData._id
            }
            const result = await api.patch(`updateOrder`,formData)
            if (result.status === 200) {
                dispatch(updateOrder(result.data))
                toast.success(toastMessage)
                router.push('/all_orders')
            } else {
                toast.success("Something went wrong.")
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
                       name="status"
                       render={(item) => (
                           <FormItem>
                               <FormLabel>Payment Status <span className='text-red-500'>*</span></FormLabel>
                               <Select 
                                    disabled={loading} 
                                    onValueChange={e=> {
                                        setStatus(e)
                                        return item.field.onChange(e)
                                    }}
                                    value={item.field.value}
                                    defaultValue={item.field.value}
                                   >
                                       <FormControl>                            
                                           <SelectTrigger>
                                               <SelectValue 
                                                   defaultValue={item.field.value}
                                                   placeholder="Select Status"
                                               />
                                           </SelectTrigger>
                                       </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Pending">
                                                                Pending
                                                        </SelectItem>
                                                        <SelectItem value="Paid">
                                                                Paid
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                            /> 
                        
                        {
                            show &&
                            <FormField
                                control={form.control}
                                name="dateOfPayment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Date <span className='text-red-500'>*</span></FormLabel>
                                        <FormControl>
                                            <Input type='date' disabled={loading} placeholder='' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                        {
                            show &&
                            <FormField
                            control={form.control}
                            name="gateway"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gateway <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='text' disabled={loading} placeholder='Cash' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        }
                        {
                            show &&
                            <FormField
                            control={form.control}
                            name="transactionId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction ID <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='text' disabled={loading} placeholder='e32d3xd34rr54tft4' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        }
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form> 
        </div>
    )
}