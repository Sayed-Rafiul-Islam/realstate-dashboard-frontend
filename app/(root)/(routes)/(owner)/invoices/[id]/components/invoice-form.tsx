"use client"

import { PropertyProps, UnitProps,  InvoiceProps, OwnerInvoiceTypesReducerProps, OwnerGatewaysReducerProps, OwnerPropertyReducerProps, OwnerUnitsReducerProps, OwnerInfoReducerProps } from "@/types"

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
import Pathname from '@/components/pathname'
import './invoice-form.css'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import api from "@/actions/api"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { updateInvoice } from "@/redux/invoices/invoicesSlice"
import { addOwnerInvoice, updateOwnerInvoice } from "@/redux/data/owner/invoicesSlice"
import { addRent, removeRent, updateRent } from "@/redux/data/owner/rentsSlice"




interface InvoiceFormProps {
    initialData: InvoiceProps
}

const formSchema = z.object({

    prefix : z.string().min(1, {message : "Prefix Required"}),
    property : z.string().min(1, {message : "Property Name Required"}),
    unit : z.string().min(1, {message : "Unit Name Required"}),
    type : z.string().min(1, {message : "Invoice Type Required"}),
    month : z.string().min(1, {message : "Month Required"}),
    year : z.coerce.number().min(4, {message : "Year Required"}),
    amount : z.coerce.number().min(1, { message : "Amount Required"}),
    dueDate : z.string().min(1, {message : "Due Date Required"}),
    status : z.string().min(1, {message : "Status Required"}),
    dateOfPayment : z.string().min(1, {message : "Payment Date Required"}),
    gateway : z.string().min(1, {message : "Gateway Required"}),
    transactionId : z.string().min(1, {message : "TransactionID Required"}),
    description : z.string().optional(),
})

type InvoiceFormValues = z.infer<typeof formSchema>




export const InvoiceForm : React.FC<InvoiceFormProps> = ({
    initialData
}) => {

    const months = [
        {
            label : "January",
            value : '01'
        },
        {
            label : "February",
            value : '02'
        },
        {
            label : "March",
            value : '03'
        },
        {
            label : "April",
            value : '04'
        },
        {
            label : "May",
            value : '05'
        },
        {
            label : "June",
            value : '06'
        },
        {
            label : "July",
            value : '07'
        },
        {
            label : "August",
            value : '08'
        },
        {
            label : "September",
            value : '09'
        },
        {
            label : "October",
            value : '10'
        },
        {
            label : "November",
            value : '11'
        },
        {
            label : "December",
            value : '12'
        }
    ]
    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo
    const properties = useSelector(({ownerPropertyReducer} : OwnerPropertyReducerProps) => ownerPropertyReducer).ownerProperties
    const units = useSelector(({ownerUnitsReducer} : OwnerUnitsReducerProps) => ownerUnitsReducer).ownerUnits
    const invoiceTypes = useSelector(({ownerInvoiceTypesReducer} : OwnerInvoiceTypesReducerProps) => ownerInvoiceTypesReducer).ownerInvoiceTypes
    const gateways = useSelector(({ownerGatewaysReducer} : OwnerGatewaysReducerProps) => ownerGatewaysReducer).ownerGateways
    
    
    const [propertyId,setPropertyId] = useState(initialData ? initialData.property._id : '')
    const [status,setStatus] = useState(initialData ? initialData.status : '')
    const [show,setShow] = useState(initialData ? (initialData.status === 'Paid' ? true : false) : false)
    
    const [thisUnits,setThisUnits] = useState<UnitProps[]>()
    
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(()=>{
        const temp = units.filter((item)=> item.property._id === propertyId)
        setThisUnits(temp)
        if (initialData?.unit) {
            form.setValue('unit', initialData.unit._id)  
        } else {
            form.setValue('unit', '')  
        }
              
    },[propertyId])




    const title = initialData ? 'Edit Invoice' : 'Create Invoice'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit invoice info" : "Add a new invoice"
    const toastMessage = initialData ? "Invoice updated" : "New invoice created"



    const [loading, setLoading] = useState(false)

    const form = useForm<InvoiceFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData ? {
            prefix : initialData.prefix,
            property : initialData.property._id,
            unit : initialData.unit._id,
            type : initialData.type._id,
            month : initialData.month,
            year : initialData.year,
            amount : initialData.amount,
            dueDate : initialData?.dueDate ? initialData.dueDate : '',
            status : initialData.status,
            dateOfPayment : initialData.dateOfPayment,
            gateway : initialData.gateway,
            transactionId : initialData.transactionId,
            description : initialData.description,
        }
        :
        {
            prefix : '',
            property : '',
            unit : '',
            type : '',
            month : '',
            year : 2020,
            amount : 0,
            dueDate : '',
            status : '',
            dateOfPayment : '',
            gateway : '',
            transactionId : '',
            description : '',
        }
    })

    useEffect(()=>{
        form.setValue('dateOfPayment','')
        form.setValue('gateway','')
        form.setValue('transactionId','')
        form.setValue('dueDate','')
        if (status === 'Paid') {
            setShow(true)
            form.setValue('dueDate','00-00-00')
        } else {
            setShow(false)
            form.setValue('dateOfPayment','00-00-00')
            form.setValue('gateway','N/A')
            form.setValue('transactionId','N/A')
        }       
    },[status])

    
    const onSubmit = async (data : InvoiceFormValues) => {
        if ( initialData ) {
            const formData = {
                ...data,
                _id : initialData._id, 
                invoiceNo : initialData.invoiceNo,
                owner : initialData.owner._id
            }
            const result = await api.patch(`updateInvoice`, formData,{validateStatus: () => true})
            console.log(formData)

            if (result.status === 200) {
                dispatch(updateOwnerInvoice(result.data))
                toast.success(toastMessage)
                router.push('/invoices')
            } else if (result.status === 404) {
                toast.error("Tenant not found.")
            } else if (result.status === 201) {
                if (result.data.newRent) {
                    dispatch(addRent(result.data.newRent))
                    toast.success("Invoice updated and rent added.")
                } else {
                    dispatch(updateRent(result.data.updatedRent))
                    toast.success("Invoice and rent updated.")
                }
                dispatch(updateOwnerInvoice(result.data.updatedInvoice))
                router.push('/invoices')
            } else if (result.status === 202) {
                dispatch(updateOwnerInvoice(result.data.updatedInvoice))
                dispatch(removeRent(result.data.rent))
                toast.success("Invoice updated and rent removed.")
                router.push('/invoices')
            }
            
            else {
                toast.error("Something went wrong")
            }   
           }
        else {            
            const formData = {
                ...data,
                invoiceNo : `CW${Math.round(new Date().getTime()*Math.random()/1000000)}`,
                owner : owner._id
            }
            const result = await api.post(`createInvoice`, formData,{validateStatus: () => true})

            if (result.status === 200) {
                if (result.data)
                dispatch(addOwnerInvoice(result.data))
                toast.success(toastMessage)
                router.push('/invoices')
            } else if (result.status === 201) {
                dispatch(addRent(result.data.newRent))
                dispatch(addOwnerInvoice(result.data.newInvoice))
                toast.success(toastMessage)
                toast.success("Rent Added")

            } else if (result.status === 404) {
                toast.error("Tenant not found.")
            }
            
            else {
                toast.error("Something went wrong")
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
        <div className='add mt-5'>
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
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    <FormField
                        control={form.control}
                        name="prefix"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prefix <span className='text-red-500'>*</span></FormLabel>
                                <FormControl>
                                    <Input type='text' disabled={loading} placeholder='INV' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type <span className='text-red-500'>*</span></FormLabel>
                                <Select 
                                        disabled={loading} 
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>                            
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select Type"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {invoiceTypes.map(({_id,title})=>(
                                                <div key={_id}>
                                                    <SelectItem  value={_id} >
                                                        {title}
                                                    </SelectItem>
                                                </div>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                         
                    <FormField
                        control={form.control}
                        name="month"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Month <span className='text-red-500'>*</span></FormLabel>
                                <Select 
                                        disabled={loading} 
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>                            
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select Month"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {months.map(({value,label})=>(
                                               
                                                    <SelectItem key={value} value={value} >
                                                        {label}
                                                    </SelectItem>
                                                
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Year<span className='text-red-500'>*</span></FormLabel>
                                <FormControl>
                                    <Input type='number' disabled={loading} placeholder='2024' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="property"
                        render={(item) => (
                            <FormItem>
                                <FormLabel>Property <span className='text-red-500'>*</span></FormLabel>
                                <Select
                                        disabled={loading} 
                                        onValueChange={e=> {
                                            setPropertyId(e)
                                            item.formState.validatingFields.unit
                                            
                                            return item.field.onChange(e)
                                        }}
                                        value={item.field.value}
                                        defaultValue={item.field.value}
                                        
                                        
                                    >
                                        <FormControl >
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={item.field.value}
                                                    placeholder="Select Property"
                                                
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent  >
                                            {properties.map(({_id, name} : PropertyProps,index)=>(
                                              
                                                <SelectItem key={index} value={_id} >
                                                    {name}
                                                </SelectItem>
                                              
                                            ))}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />  
                         
                            
                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit <span className='text-red-500'>*</span></FormLabel>
                                <Select 
                                        disabled={loading} 
                                        onValueChange={field.onChange}
                                        value={thisUnits?.length === 0 ? '' : field.value}
                                        defaultValue={thisUnits?.length === 0 ? '' : field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue 
                                                    defaultValue={field.value}
                                                    placeholder="Select Unit"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                thisUnits
                                                ? thisUnits.map(({_id, name} : UnitProps,index)=>(
                                                    <SelectItem key={index} value={_id} >
                                                        {name}
                                                    </SelectItem>
                                                ))
                                                :
                                                <SelectItem value="">
                                                        Select Unit
                                                </SelectItem>
                                            }
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount (in BDT)<span className='text-red-500'>*</span></FormLabel>
                                <FormControl>
                                    <Input type='number' disabled={loading} placeholder='2000' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                  

                    
                    <FormField
                       control={form.control}
                       name="status"
                       render={(item) => (
                           <FormItem>
                               <FormLabel>Status <span className='text-red-500'>*</span></FormLabel>
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
                                           <SelectItem value="Paid" >
                                               Paid
                                           </SelectItem>
                                           <SelectItem value="Due" >
                                               Due
                                           </SelectItem>
                                           <SelectItem value="Pending" >
                                               Pending
                                           </SelectItem>
                                       </SelectContent>
                                   </Select>
                               <FormMessage />
                           </FormItem>
                       )}
                    />

                    {
                        !show && 
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date <span className='text-red-500'>*</span></FormLabel>
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
                            name="dateOfPayment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Payment <span className='text-red-500'>*</span></FormLabel>
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
                                    <Select 
                                            disabled={loading} 
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>                            
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                        placeholder="Select Gateway"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {gateways.map(({_id,title})=>(
                                                    <SelectItem key={_id} value={_id} >
                                                        {title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                        <Input type='text' disabled={loading} placeholder='2354dweaw4qw34' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea  disabled={loading} placeholder='Optional' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    </div>
                    <Button disabled={loading} className='ml-auto bg-purple-500' type='submit'>
                        {action}
                    </Button>
                </form>
            </Form> 
        </div>
    )
}