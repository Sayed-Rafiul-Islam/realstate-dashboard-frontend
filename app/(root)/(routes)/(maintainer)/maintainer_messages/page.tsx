"use client"

import Pathname from "@/components/pathname";
import { Separator } from "@/components/ui/separator";


const MassagesPage = () => {

    

    return ( 
        <div className="flex-col">
            <div className="flex-1 py-8 pt-6 space-y-4">
                <Pathname />
                <div className="flex md:flex-row flex-col-reverse gap-2 justify-between md:items-center">
                    <h1 className="font-bold text-xl">All Massages</h1>
                    {/* <Button onClick={()=>router.push('/invoices/add')}  className="flex gap-2"><Printer size={15} />Export</Button> */}
                </div>
                <Separator />
                <div>
                    {/* <RentsClient data={formattedRents} /> */}
                </div>
            </div>
        </div>
     );
}
 
export default MassagesPage;