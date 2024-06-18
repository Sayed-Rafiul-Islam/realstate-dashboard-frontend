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
import { DocumentSettingsProps } from "@/types";

interface PreviewDocumentSettingsProps {
    isOpen : boolean,
    onClose : () => void,
    data : DocumentSettingsProps,
}

export const PreviewDocumentSettings : React.FC<PreviewDocumentSettingsProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const router = useRouter()

    const onChange = (open:boolean) => {
        if(!open) {
            onClose();
        }
    }


    return (
        <> 
            <Dialog open={isOpen} onOpenChange={onChange}>
                <DialogContent className="max-w-2xl overflow-y-scroll">
                    <DialogHeader>
                            <div className="flex justify-between mt-8">
                                <div className="flex flex-col items-center gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">Document Type</h4>
                                        <h6 className="text-lg font-bold">{data.title}</h6>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-end">
                                        <h4 className="font-semibold mb-2">Status</h4>
                                        {
                                            data.status ?
                                            <h6 className='bg-indigo-100 text-indigo-500 text-xs w-fit px-6 py-2 rounded-md'>Active</h6>
                                        :
                                            <h6 className='bg-red-100 text-red-500 text-xs w-fit px-6 py-2 rounded-md'>Inactive</h6>
                                        }
                                    </div>
                                </div>
                            </div>
                        <Separator />
                    </DialogHeader>
         
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-lg">Details :</h3>
                            <h5 className="text-gray-500 text-xs">{data.details}</h5>
                        </div>

                </DialogContent>
            </Dialog>   
        </>
        
    )
}
 
