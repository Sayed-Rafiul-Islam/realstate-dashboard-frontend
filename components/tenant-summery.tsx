import { SummryItemProps, TenantSummryItemProps } from "@/types";


const TenantSummery : React.FC<TenantSummryItemProps> = ({id,title,subtitle,icon}) => {
    return ( 
        <div className="bg-gray-100 rounded-md py-6 pl-6">
            {icon}
            <h5 className="text-sm text-gray-500 mt-2">{subtitle}</h5>
            <h2 className="text-4xl font-semibold mt-4">{title}</h2>
        </div>
     );
}
 
export default TenantSummery;