"use client"
import { InvoiceForm } from "./components/invoice-form";
const InvoiceIdPage = () => {
    return ( 
        <div>
            <div className="flex-1 p-8 pt-6 space-y-4">
                <InvoiceForm />
            </div>
        </div>
     );
}
 
export default InvoiceIdPage;