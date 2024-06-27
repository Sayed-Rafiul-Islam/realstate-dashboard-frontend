import { redirect } from "next/navigation";

const messagePage = () => {
    redirect('/maintainer_messages/inbox')

}
 
export default messagePage;