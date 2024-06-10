"use client"

import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps, MaintainanceTypesReducerProps, InvoiceTypesReducerProps, MaintainerInfoReducerProps } from "@/types"

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
import './invoice-form.css'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { addInvoice, updateInvoice } from "@/redux/invoices/invoicesSlice"

interface InvoiceFormProps {

}

const formSchema = z.object({

    prefix : z.string().min(1, {message : "Prefix Required"}),
    type : z.string().min(1, {message : "Invoice Type Required"}),
    issue : z.string().min(1, {message : "Month Required"}),
    propertyId : z.string().min(1, {message : "Property Name Required"}),
    unitId : z.string().min(1, {message : "Unit Name Required"}),
    amount : z.coerce.number().min(1, { message : "Amount Required"}),
    dueDate : z.string().min(1, {message : "Due Date Required"}),
    description : z.string().optional(),
    status : z.string().min(1),
    dateOfPayment : z.string(),
    gateway : z.string(),
    transactionId : z.string(),
})

type InvoiceFormValues = z.infer<typeof formSchema>




export const InvoiceForm : React.FC<InvoiceFormProps> = () => {

    const maintainer = useSelector(({maintainerInfoReducer} : MaintainerInfoReducerProps)=> maintainerInfoReducer).maintainerInfo
    const {maintainanceTypes} = useSelector(({maintainanceTypesReducer} : MaintainanceTypesReducerProps) => maintainanceTypesReducer)
    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const {invoiceTypes} = useSelector(({invoiceTypesReducer} : InvoiceTypesReducerProps) => invoiceTypesReducer)
    const [propertyId,setPropertyId] = useState('')
    
    const [thisUnits,setThisUnits] = useState<UnitProps[]>()
    
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(()=>{
        const temp = units.filter((item)=> item.property._id === propertyId)
        setThisUnits(temp)
        form.setValue('unitId', '')       
    },[propertyId])




    const title = 'Create Invoice'
    const action = 'Create'
    const description = "Add a new invoice"
    const toastMessage = "New invoice created"



    const [loading, setLoading] = useState(false)

    const form = useForm<InvoiceFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            description : '',
            status : "Pending",
            gateway : '',
            transactionId : '',
            dateOfPayment : '00-00-00'
        }
    })

    
    const onSubmit = async (data : InvoiceFormValues) => {
            const formData = {...data,
                _id : '7', 
                invoiceNo : `CW${Math.round(new Date().getTime()*Math.random()/1000000)}`,
                by : {
                    role : 'maintainer',
                    id : maintainer.user._id
                },
                month : ''
            
            }

            console.log(formData)
            dispatch(addInvoice(formData))
            toast.success(toastMessage)
            router.push('/maintainer_invoices')
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
                        name="issue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Issue <span className='text-red-500'>*</span></FormLabel>
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
                                                    placeholder="Select Issue"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {maintainanceTypes.map(({_id,type})=>(
                                                    <SelectItem key={_id} value={_id} >
                                                        {type}
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
                        name="propertyId"
                        render={(item) => (
                            <FormItem>
                                <FormLabel>Property <span className='text-red-500'>*</span></FormLabel>
                                <Select
                                        disabled={loading} 
                                        onValueChange={e=> {
                                            setPropertyId(e)
                                            item.formState.validatingFields.unitId
                                            
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
                                                <div >
                                                <SelectItem key={index} value={_id} >
                                                    {name}
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
                        name="unitId"
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