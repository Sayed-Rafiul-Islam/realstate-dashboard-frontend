"use client"

import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps, TenantDocumentProps, TenantInfoReducerProps } from "@/types"

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
import './document-form.css'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { useDispatch, useSelector } from "react-redux"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

import api from "@/actions/api"
import { useRouter } from "next/navigation"
import { addMaintainanceRequest, updateMaintainanceRequest } from "@/redux/maintainanceRequests/maintainanceRequestsSlice"

import PdfUpload from "@/components/pdf-upload"
import { addNotification } from "@/redux/report/notificationsSlice"
import Link from "next/link"
import { addTenantDocument, updateTenantDocument } from "@/redux/documents/tenantDocumentsSlice"


type DocumentFormValues = z.infer<typeof formSchema>

interface DocumentFormProps {
    initialData: TenantDocumentProps
}

const formSchema = z.object({

    propertyId : z.string().min(1, {message : "Property Name Required"}),
    unitId : z.string().min(1, {message : "Unit Name Required"}),
    tenantName : z.string().min(1, {message : "Tenant Name Required"}),
    document : z.string().min(1, {message : "Document Required"}),
})
export const DocumentForm : React.FC<DocumentFormProps> = ({
    initialData
}) => {


    const {properties} = useSelector(({propertiesReducer} : PropertiesReducerProps) => propertiesReducer)
    const {units} = useSelector(({unitsReducer} : UnitsReducerProps) => unitsReducer)
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    
    const [propertyId,setPropertyId] = useState(initialData ? initialData.propertyId : '')
    const dispatch = useDispatch()

    const [thisUnits,setThisUnits] = useState<UnitProps[]>()

    // const [types, setTypes] = useState<string[]>([''])
    const router = useRouter()

    useEffect(()=>{
        const temp = units.filter((item)=> item.property._id === propertyId)
        setThisUnits(temp)
        form.setValue('unitId', '')       

    },[propertyId])


    const title = initialData ? 'Edit Document' : 'Add Document'
    const action = initialData ? 'Save Changes' : 'Add'
    const description = initialData ? "Edit a document" : "Add a new document"
    const toastMessage = initialData ? "Document updated" : "New document added"



    const [loading, setLoading] = useState(false)
    const form = useForm<DocumentFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            propertyId : '',
            unitId : '',
            tenantName : '',
            document : ''
        }
    })

    
    const onSubmit = async (data : DocumentFormValues) => {
        if ( initialData ) {
                   const formData = {...data,
                    _id : initialData._id, 
                    type : initialData.type,
                    tenantId : initialData.tenantId,
                    docFront : initialData.docFront,
                    docBack : initialData.docBack,
                    status : initialData.status
                }
                dispatch(updateTenantDocument(formData))
            }
            else {
                const formData = {...data, 
                    _id : '10',
                    type : '',
                    tenantId : tenant._id,
                    docFront : '',
                    docBack : '',
                    status : ''
            }
                dispatch(addTenantDocument(formData))
           }
           toast.success(toastMessage)
           router.push('/tenant_documents')
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
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/'>Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="hover:text-indigo-500 transition-all">
                            <Link prefetch href='/tenant_documents'>Documents</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            { !initialData ? 'Add' : "Edit"}
                        </BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Separator className='my-5' />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
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
                                                    <div key={_id}>
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
                            name="tenantName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tenant Name <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type='text' disabled={loading} placeholder='John Doe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="document"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attachment</FormLabel>
                                    <FormControl>
                                        <PdfUpload
                                                buttonName='Add Attachment'
                                                value={field.value ? [field.value] : []}
                                                onChange={(url)=>field.onChange(url)}
                                                onRemove={()=>field.onChange("")}
                                            />
                                        </FormControl>
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