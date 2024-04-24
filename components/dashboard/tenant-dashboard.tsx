import { DollarSign, Home, Tags, UserRound, UsersRound, Warehouse } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'
import TenantSummery from "../tenant-summery";

const TenantDashboard = () => {

    const summery = [
        {
            id : 1,
            title : 'The Ivy Residences',
            subtitle : "Unit 2",
            icon : <Home className="bg-white p-2 w-[32px] h-[32px]"  color="#ff8c2e" size={20} />
        },
        {
            id : 2,
            title : "$ 5.00",
            subtitle : "Current Rate",
            icon : <DollarSign className="bg-white p-2 w-[32px] h-[32px]"  color="#2563eb" size={20} />
        },
        {
            id : 3,
            title : "0",
            subtitle : "Total Tickets",
            icon : <Tags className="bg-white p-2 w-[32px] h-[32px]"  color="#e11d48" size={20} />
        }
    ]

    // console.log(typeof(summery[0].icon))
    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                {
                    summery.map(({id,title,subtitle,icon})=><Summery id={id} title={title} subtitle={subtitle} icon={icon} /> )
                }
            </div>
        </div>
     );
}
 
export default TenantDashboard;