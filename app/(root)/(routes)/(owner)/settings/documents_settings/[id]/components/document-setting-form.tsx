"use client"

import { DocumentSettingsProps, ExpenseTypeProps, OwnerInfoReducerProps } from "@/types"

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
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import './document-settings-form.css'
import { addOwnerExpenseType, updateOwnerExpenseType } from "@/redux/data/owner/settings/expenseTypesSlice"
import api from "@/actions/api"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { addDocumentSettings, updateDocumentSettings } from "@/redux/data/owner/settings/documentSettingsSlice"


type DocumentSettingsFormValues = z.infer<typeof formSchema>

interface DocumentSettingsFormProps {
    initialData: DocumentSettingsProps
}

const formSchema = z.object({
    title : z.string().min(1, {message : "Title Required"}),
    status : z.boolean().default(false),
    details : z.string().min(1, {message : "Details Required"})
})


export const DocumentSettingsForm : React.FC<DocumentSettingsFormProps> = ({
    initialData
}) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo


    const title = initialData ? 'Edit Document Settings' : 'Add Document Settings'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit a document settings" : "Create a new document settings"
    const toastMessage = initialData ? "Document settings updated" : "Document settings created"
 

    const [loading, setLoading] = useState(false)
    const form = useForm<DocumentSettingsFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            title : '',
            status : false,
            details : ''
        }
    })

    const onSubmit = async (data : DocumentSettingsFormValues) => {

        if (initialData) {
            const formData = {
                ...data, 
                _id : initialData._id
            }
            const result = await api.patch(`updateDocumentSettings`, formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(updateDocumentSettings(result.data))
                toast.success(toastMessage)
                router.push('/settings/documents_settings')
            } else {
                toast.error("Something went wrong.")
            }
            
        } else {
            const formData = {
                ...data, 
                owner : owner._id
            }
            const result = await api.post(`addDocumentSettings`, formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(addDocumentSettings(result.data))
                toast.success(toastMessage)
                router.push('/settings/documents_settings')
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
                                        <Input disabled={loading} placeholder='NID' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel>Details <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea  disabled={loading} placeholder='Write details' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className='flex flex-row rounded-md border p-4 items-start space-x-3 space-y-0'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Active <span className='text-red-500'>*</span>
                                        </FormLabel>
                                        <FormDescription>
                                            This config will be available to tenants.
                                        </FormDescription>
                                    </div>
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