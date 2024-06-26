"use client"

import { ExpenseTypeProps, OwnerInfoReducerProps } from "@/types"

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
import './expense-type-form.css'
import { addOwnerExpenseType, updateOwnerExpenseType } from "@/redux/data/owner/settings/expenseTypesSlice"
import api from "@/actions/api"


type ExpenseTypeFormValues = z.infer<typeof formSchema>

interface ExpenseTypeFormProps {
    initialData: ExpenseTypeProps
}

const formSchema = z.object({
    title : z.string().min(1, {message : "Title Required"})
})


export const ExpenseTypeForm : React.FC<ExpenseTypeFormProps> = ({
    initialData
}) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const owner = useSelector(({ownerInfoReducer} : OwnerInfoReducerProps) => ownerInfoReducer).ownerInfo


    const title = initialData ? 'Edit Expense Type' : 'Create Expense Type'
    const action = initialData ? 'Save Changes' : 'Create'
    const description = initialData ? "Edit a expense type" : "Create a new expense type"
    const toastMessage = initialData ? "Expense type updated" : "Expense type created"
 

    const [loading, setLoading] = useState(false)
    const form = useForm<ExpenseTypeFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            title : '',
        }
    })

    const onSubmit = async (data : ExpenseTypeFormValues) => {

        if (initialData) {
            const formData = {
                ...data, 
                _id : initialData._id
            }
            const result = await api.patch(`updateExpenseType`, formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(updateOwnerExpenseType(result.data))
                toast.success(toastMessage)
                router.push('/settings/expense_type')
            } else {
                toast.error("Something went wrong.")
            }
            
        } else {
            const formData = {
                ...data, 
                owner : owner._id
            }
            const result = await api.post(`addExpenseType`, formData,{validateStatus: () => true})
            if (result.status === 200) {
                dispatch(addOwnerExpenseType(result.data))
                toast.success(toastMessage)
                router.push('/settings/expense_type')
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
                                        <Input disabled={loading} placeholder='Utilities' {...field} />
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