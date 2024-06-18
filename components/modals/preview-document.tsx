"use client"

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";

import { Separator } from "../ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DocumentProps } from "@/types";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import api from "@/actions/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateDocoument } from "@/redux/documents/documentsSlice";

interface PreviewDocumentProps {
    isOpen : boolean,
    onClose : () => void,
    data : DocumentProps,
    update ?: boolean
}

export const PreviewDocument : React.FC<PreviewDocumentProps> = ({
    isOpen,
    onClose,
    data,
    update
}) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [statusStyle,setStatusStyle] = useState('')
    const [status,setStatus] = useState(data.status)

    useEffect(()=>{
        if (data.status === "Accepted") {
            setStatusStyle('bg-green-100 text-green-500 text-xs w-fit px-6 py-2 rounded-md')
        } else if (data.status === "Pending") {
            setStatusStyle('bg-amber-100 text-amber-500 text-xs w-fit px-6 py-2 rounded-md')
        } else {
            setStatusStyle('bg-red-100 text-red-500 text-xs px-6 py-2 rounded-md')
        }
    })

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }

    const handleUpdate = async () => {
        const result = await api.patch(`updateDocument`,{_id : data._id,status})
        if (result.status === 200) {
            dispatch(updateDocoument(result.data))
            toast.success("Document updated.")
            onClose();
        } else {
            toast.error("Something went worng.")
            onClose();
        }
    }


    return (
        <> 
            <Dialog open={isOpen} onOpenChange={onChange}>
                <DialogContent className="max-w-4xl overflow-y-scroll">
                    <DialogHeader>
                        <div className="flex justify-between items-center mt-4 mb-2">
                            <h3 className="text-xl font-semibold">Details</h3>
                            <div className="flex flex-col items-end gap-2">
                                <h4 className="text-lg font-semibold">Status</h4>
                                <h6 className={statusStyle}>{data.status}</h6>  
                            </div>
                        </div>
                        <Separator />
                    </DialogHeader>
                    <div>
                        <div className="flex gap-6 mb-6">
                            <div className="w-1/2">
                                <h4 className="text-lg font-semibold mb-4">Front Size</h4>
                                <div className="relative h-[200px] w-full">
                                    <Image className="rounded-lg" fill src={data.docFront} alt="" />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <h4 className="text-lg font-semibold mb-4">Back Size</h4>
                                <div className="relative h-[200px] w-full">
                                    <Image className="rounded-lg" fill src={data.docBack} alt="" />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="mt-6 flex flex-col gap-4">
                            {
                                update ?
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex items-center w-1/2">
                                        <h5 className="font-semibold w-1/2">Document Type:</h5>
                                        <h5>{data.typeName}</h5>
                                    </div>
                                    <div className="w-1/4">
                                        <Select
                                            onValueChange={(e)=>setStatus(e)}
                                            value={status}
                                        >
                                                                    
                                        <SelectTrigger>
                                            <SelectValue
                                                defaultValue={status}
                                                placeholder="Select Status"
                                            />
                                        </SelectTrigger>
                                            
                                            <SelectContent>
                                                <SelectItem value="Accepted" >
                                                    Accept
                                                </SelectItem>
                                                <SelectItem value="Declined" >
                                                    Decline
                                                </SelectItem>
                                                <SelectItem value="Pending" >
                                                    Pending
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                :
                                <div className="flex items-center w-1/2">
                                    <h5 className="font-semibold w-1/2">Document Type:</h5>
                                    <h5>{data.typeName}</h5>
                                </div>

                            }
                           
                            <div className="flex items-center w-1/2">
                                <h5 className="font-semibold w-1/2">Tenant Name:</h5>
                                <h5>{data.tenantName}</h5>
                            </div>
                            <div className="flex items-center w-1/2">
                                <h5 className="font-semibold w-1/2">Property Name:</h5>
                                <h5>{data.propertyName}</h5>
                            </div>
                            <div className="flex items-center w-1/2">
                                <h5 className="font-semibold w-1/2">Unit:</h5>
                                <h5>{data.unitName}</h5>
                            </div>
                        </div>

                        {
                            update &&
                            <div className="flex gap-4 justify-center mt-6">
                                <Button onClick={onClose} className="border border-orange-500" variant='outline'>Back</Button>
                                <Button className="bg-purple-600" onClick={handleUpdate}>Update</Button>
                            </div>
                        }
                    </div>
                </DialogContent>
            </Dialog>   
        </>
        
    )
}

 
