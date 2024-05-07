interface PropertiesProps {
    data : PropertyProps[]
}

import { PropertyProps } from "@/types";
import PropertyCard from "./property-card";
import './property-card.css'

const Properties : React.FC<PropertiesProps> = ({data}) => {

    return ( 
        <div className="cards">
            {
                data.map((property) => 
                    <PropertyCard data={property} />
                )
            }
        </div>
     );
}
 
export default Properties;