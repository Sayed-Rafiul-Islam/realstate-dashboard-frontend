import { redirect } from "next/navigation";

const messagePage = () => {
    redirect('/messages/inbox')

}
 
export default messagePage;