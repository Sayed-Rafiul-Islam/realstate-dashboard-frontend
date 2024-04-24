import { Home, UserRound, UsersRound, Warehouse } from "lucide-react";
import Summery from "../summery";
import './dashboard.css'

const AdminDashboard = () => {

    const summery = [
        {
            id : 1,
            subtitle : "Total Owner",
            title : '1',
            icon : <UsersRound className="bg-white p-2 w-[32px] h-[32px]"  color="#ff8c2e" size={20} />
        },
        {
            id : 2,
            subtitle : "Total Property",
            title : '2',
            icon : <Warehouse className="bg-white p-2 w-[32px] h-[32px]"  color="#2563eb" size={20} />
        },
        {
            id : 3,
            subtitle : "Total Unit",
            title : '4',
            icon : <Home className="bg-white p-2 w-[32px] h-[32px]"  color="#e11d48" size={20} />
        },
        {
            id : 4,
            subtitle : "Total Tenant",
            title : '7',
            icon : <UserRound className="bg-white p-2 w-[32px] h-[32px]" color="#16a34a" size={20} />
        }
    ]

    // console.log(typeof(summery[0].icon))
    return ( 
        <div>
            {/* summery */}
            <div className="summery">
                {
                    summery.map(({id,subtitle,title,icon}) => <Summery id={id} subtitle={subtitle} title={title} icon={icon} />)
                }
            </div>
        </div>
     );
}
 
export default AdminDashboard;