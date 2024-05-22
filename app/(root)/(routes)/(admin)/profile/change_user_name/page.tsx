"use client"

import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { PasswordModal } from "@/components/modals/password-modal";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

type UserValue = z.infer<typeof formSchema>

const formSchema = z.object({
    userName : z.string(),
})

const ChangePasswordPage = () => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setOpen(true)
    },[])

    const checkPass = async (password : string) => {
        setLoading(true)
        console.log(password)
        setLoading(false)
        setOpen(false)
    }

    
    const form = useForm<UserValue>({
        resolver : zodResolver(formSchema),
        // defaultValues : {

        // } 
    })

    const onSubmit = async ({userName} : UserValue) => {
            toast.success("User Name Updated")
            form.setValue('userName','')
    }

   


    // console.log(ChangePasswordPage)

    return ( 
        <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-y-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                <h1 className="font-bold text-xl">Chnage User Name</h1>
                <Pathname />
            </div>
            <Separator />   
            <PasswordModal
            isOpen={open} 
            onConfirm={(password)=>{checkPass(password)}}
            loading={loading}
            />   

             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid grid-cols-1 md:w-1/2'>
                        <FormField

                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New User Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder='John Doe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />                    
                    </div>
                    <Button className='ml-auto' type='submit'>
                        Update User Name
                    </Button>
                </form>
            </Form>     

        </div>
        
    </div>
     );
}
 
export default ChangePasswordPage;