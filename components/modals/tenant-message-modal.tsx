"use client"

import { useEffect, useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select'
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { MaintainerProps, OwnerInfoReducerProps, OwnerPackageProps, OwnerProps, PackageProps, TenantInfoReducerProps, TenantProps, UserProps } from "@/types";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useSelector } from "react-redux";

interface TenantMessageModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : (data : FormProps) => void,
    loading : boolean,

}

export interface FormProps {
    fromName : string | undefined,
    fromRole : string,
    toName : string | undefined,
    toRole : string,
    body : string,
    status : boolean,
    read : boolean,
    date : Date,
    from : string,
    to : string,
    all ?: boolean
}

export const TenantMessageModal : React.FC<TenantMessageModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {

    const tenant = useSelector(({tenantInfoReducer} : TenantInfoReducerProps)=> tenantInfoReducer).tenantInfo

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    type FormValue = z.infer<typeof formSchema>

    const formSchema = z.object({
        body : z.string().min(1, {message : "Message Required"}),
    })



// ------------------------------------------------------------

    const form = useForm<FormValue>({
    resolver : zodResolver(formSchema)})

    const onSubmit = async (data : FormValue) => {
        const formData = {
            body : data.body,   
            fromName : tenant.name,
            fromRole : 'tenant',
            toName :  tenant.owner.user.firstName ? `${tenant.owner.user.firstName} ${tenant.owner.user.lastName}` : tenant.owner.user.lastName,
            toRole : 'owner',
            status : false,
            read : false,
            date : new Date(),
            from : tenant.user._id,
            to : tenant.owner.user._id,
        }

        onConfirm(formData)
    }
            
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl">Compose Message</h3>
                    </div>
                    
                </DialogTitle>
                <Separator />
            </DialogHeader>

            <div>
               <div>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full mt-6'>                      
                                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>                       

                                        <div className="col-span-3">
                                            <h4 className="font-bold">To:</h4>
                                            <h4 className="text-sm">Name: <span className="font-bold">{
                                                                            tenant.owner.user.firstName ? 
                                                                                `${tenant.owner.user.firstName} ${tenant.owner.user.lastName}`
                                                                                :
                                                                                tenant.owner.user.lastName
                                                                        }</span></h4>
                                            <h4 className="text-sm">Email: <span className="font-bold">{tenant.owner.user.email}</span></h4>
                                            <h4 className="text-sm">Contact No: <span className="font-bold">{tenant.owner.user.contactNo}</span></h4>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="body"
                                            render={({ field }) => (
                                                <FormItem className="col-span-3">
                                                    <FormLabel>Message <span className='text-red-500'>*</span></FormLabel>
                                                    <FormControl>
                                                        <Textarea  disabled={loading} placeholder='Write your message...' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex gap-2 col-span-3">
                                            <Button disabled={loading} className='' type='submit'>
                                                Send
                                            </Button>
                                            <Button type="button" onClick={onClose} disabled={loading} className='' variant='outline'>
                                                Back
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form> 
                        </div> 
                </div>
            </div>
           
        </DialogContent>
    </Dialog>
    )
}