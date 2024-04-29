// "use client"

// import { useEffect, useState } from "react"

// import { Modal } from "@/components/ui/modal"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { Label } from "../ui/label"
// import { Input } from "../ui/input"

// interface PackageModalProps {
//     isOpen : boolean,
//     onClose : () => void,
//     onConfirm : () => void
// }

// export const PackageModal : React.FC<PackageModalProps> = ({
//     isOpen,
//     onClose,
//     onConfirm,
// }) => {
//     const [isMounted, setIsMounted] = useState(false)
//     const [label, setLabel] = useState('')

//     useEffect(()=>{
//         setIsMounted(true)
//     },[])

//     if (!isMounted) {
//         return null
//     }



//     return (
//         <Modal 
//             title="Add Package"
//             description=""
//             isOpen={isOpen}
//             onClose={onClose}
//         >   
//             <Separator />
//             <div>
//                 <div>
//                     <Label htmlFor="label">Label</Label>
//                     <Input type="text" value={} />
//                 </div>
//                 <div className="pt-6 space-x-2 flex items-center w-full">
//                     <Button  variant='outline' onClick={onClose}>
//                         Back
//                     </Button>
//                     <Button onClick={onConfirm}>
//                         Add Package
//                     </Button>
//                 </div>
//             </div>
//         </Modal>
//     )
// }