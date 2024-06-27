import { redirect } from "next/navigation";

const messagePage = () => {
    redirect('/tenant_messages/inbox')

}
 
export default messagePage;