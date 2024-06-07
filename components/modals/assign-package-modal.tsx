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
import { OwnerPackageProps, OwnerProps, PackageProps } from "@/types";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

interface AssignPackageModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : (ownerPackage : AssignPackageFormProps) => void,
    loading : boolean,
    owners : OwnerProps[],
    packages : PackageProps[]
}

export interface AssignPackageFormProps {
    owner : string,
    pack : string,
    gateway : string,
    status : boolean,
    startDate : Date,
    endDate : Date
}

export const AssignPackageModal : React.FC<AssignPackageModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    owners,
    packages
}) => {

    // /--------------------------------------------------------------

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    // ------------------------------------------------------------------

    type AssignPackageFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    owner : z.string().min(1, {message : "Owner Required"}),
    package : z.string().min(1, {message : "Package Required"}),
    type : z.string().min(1, {message : "Type Required"}),
    gateway : z.string().min(1, {message : "Gateway Required"})
})

const form = useForm<AssignPackageFormValues>({
    resolver : zodResolver(formSchema)})

    const onSubmit = async (data : AssignPackageFormValues) => {
        if (data.type === 'monthly') {
            const endDate = new Date(new Date().setDate(new Date().getDate() + 30))
            const ownerPackage = {
                owner : data.owner,
                pack : data.package,
                gateway : data.gateway,
                status : false,
                startDate : new Date(),
                endDate,
            }
            onConfirm(ownerPackage)
        } else {
            const endDate = new Date(new Date().setDate(new Date().getDate() + 365))
            const ownerPackage = {
                owner : data.owner,
                pack : data.package,
                gateway : data.gateway,
                status : false,
                startDate : new Date(),
                endDate,
            }
            onConfirm(ownerPackage)

        }
        // try {
        //     // create owner package and send to database and receive id
        //         const newOwner = {
        //           name : data.owner
        //         }
        //         // await createProduct(newproduct)
            

        //     // router.push(`/${storeId}/products`)
        //     // router.refresh()
        //     // toast.success(`${toastMessage}`)


        //     // send that id 
        //     onConfirm("2")

        // } catch (error) {
        //     toast.error("Something went wrong.")
        // } finally {
        // }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl">Assign Package</h3>
                    </div>
                </DialogTitle>
                <Separator />
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>                       
                        <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Owner"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {owners.map(({_id, user},index)=>(
                                                    <SelectItem key={index} value={_id} >
                                                        {user.email}
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
                            name="package"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package <span className='text-red-500'>*</span></FormLabel>
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
                                                        placeholder="Select Package"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {packages.map(({_id, label},index)=>(
                                                    <SelectItem key={index} value={_id} >
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
                                                    <SelectItem value="monthly" >
                                                        Monthly
                                                    </SelectItem>
                                                    <SelectItem value="yearly" >
                                                        Yearly
                                                    </SelectItem>

                                            </SelectContent>
                                        </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gateway"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gateway <span className='text-red-500'>*</span></FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Bkash" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type='submit'>
                        Assign
                    </Button>
                    <Button onClick={onClose} disabled={loading} className='ml-2' variant='outline'>
                        Back
                    </Button>
                </form>
            </Form> 
        </DialogContent>
    </Dialog>
    )
}