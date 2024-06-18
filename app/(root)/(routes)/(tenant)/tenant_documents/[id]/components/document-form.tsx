"use client"

import { PropertiesReducerProps, PropertyProps, UnitProps, UnitsReducerProps, TenantInfoReducerProps, DocumentProps, DocumentSettingsProps, DocumentSettingsReducerProps } from "@/types"

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
import ImageUpload from "@/components/image-upload"


type DocumentFormValues = z.infer<typeof formSchema>

interface DocumentFormProps {
    initialData: DocumentProps
}

const formSchema = z.object({
    type : z.string().min(1, {message : "Document Type Required"}),
    docFront : z.string().min(1, {message : "Document Front Side Required"}),
    docBack : z.string().min(1, {message : "Document Back Side Required"}),
})
export const DocumentForm : React.FC<DocumentFormProps> = ({
    initialData
}) => {
    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo
    const documentSettings = useSelector(({documentSettingsReducer} : DocumentSettingsReducerProps)=> documentSettingsReducer).documentSettings
    
    const [type,setType] = useState(initialData ? initialData.type._id : '')
    const dispatch = useDispatch()
    const router = useRouter()


    const title = initialData ? 'Edit Document' : 'Add Document'
    const action = initialData ? 'Save Changes' : 'Add'
    const description = initialData ? "Edit a document" : "Add a new document"
    const toastMessage = initialData ? "Document updated" : "New document added"



    const [loading, setLoading] = useState(false)
    const form = useForm<DocumentFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData ? {
            type : initialData.type ? initialData.type._id : '',
            docFront : initialData.docFront,
            docBack : initialData.docBack,
        }
        :
        {
            type : '',
            docFront : '',
            docBack : '', 
        }
    })

    
    const onSubmit = async (data : DocumentFormValues) => {
        if ( initialData ) {
                const formData = {...data,
                    _id : initialData._id, 
                    tenantName : initialData.tenantName,
                    propertyName : initialData.propertyName,
                    unitName : initialData.unitName,
                    typeName : initialData.typeName,
                    owner : initialData.owner._id,
                    tenant : initialData.tenant._id,
                    status : initialData.status
                }
                const result = await api.patch(`updateDocument`,formData)
                if (result.status === 200) {
                    dispatch(updateTenantDocument(result.data))
                    toast.success(toastMessage)
                    router.push('/tenant_documents')
                } else {
                    toast.error("Something went wrong.")
                }
            }
            else {
                const formData = {...data, 
                    tenantName : tenant.name,
                    status : "Pending",
                    tenant : tenant._id,
                    owner : tenant.owner._id
                }
                const result = await api.post(`addDocument`,formData)
                if (result.status === 200) {
                    dispatch(addTenantDocument(result.data))
                    toast.success(toastMessage)
                    router.push('/tenant_documents')
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
                            name="type"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Property <span className='text-red-500'>*</span></FormLabel>
                                    <Select
                                            disabled={loading} 
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl >
                                                <SelectTrigger>
                                                    <SelectValue 
                                                        defaultValue={field.value}
                                                        placeholder="Select Document Type"
                                                    
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent  >
                                                {documentSettings.map(({_id, title} : DocumentSettingsProps,index)=>(
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
                        <FormField
                            control={form.control}
                            name="docFront"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Frontside</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                                buttonName='Add Image'
                                                value={field.value ? [field.value] : []}
                                                onChange={(url)=>field.onChange(url)}
                                                onRemove={()=>field.onChange("")}
                                            />
                                        </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="docBack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Document Backside</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                                buttonName='Add Image'
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