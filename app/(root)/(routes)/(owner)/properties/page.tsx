import Pathname from "@/components/pathname";
import { redirect } from "next/navigation";

const PropertiesPage = () => {

    redirect('/properties/all_properties')
    return ( 
        null
     );
}
 
export default PropertiesPage;