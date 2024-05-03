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
import { OwnerPackageProps, PackageProps } from "@/types";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AssignPackageModalProps {
    isOpen : boolean,
    onClose : () => void,
    onConfirm : (id : string) => void,
    loading : boolean,
    owners : { 
        _id : string,
        name : string
    }[],
    packages : PackageProps[]
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
    type : z.string().min(1, {message : "Type Required"})
})

const form = useForm<AssignPackageFormValues>({
    resolver : zodResolver(formSchema)})

    const onSubmit = async (data : AssignPackageFormValues) => {
        console.log(data)
        try {
            // create owner package and send to database and receive id
                const newOwner = {
                  name : data.owner
                }
                // await createProduct(newproduct)
            

            // router.push(`/${storeId}/products`)
            // router.refresh()
            // toast.success(`${toastMessage}`)


            // send that id 
            onConfirm("2")

        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
        }
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
                                                {owners.map(({_id, name},index)=>(
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