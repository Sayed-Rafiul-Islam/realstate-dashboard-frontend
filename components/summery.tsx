import { SummryItemProps } from "@/types";


const Summery : React.FC<SummryItemProps> = ({id,title,subtitle,icon,color}) => {
    return ( 
        <div className="border-2 border-gray-300 rounded-3xl py-6 px-6 flex items-center justify-evenly">
            <div className="text-center">
                <h5 className="text-sm font-semibold mt-2">{subtitle}</h5>
                <h2 className={`text-2xl font-bold mt-4 text-${color}-500`}>{title}</h2>
            </div>
            <div className={`bg-${color}-100 flex justify-center items-center w-[40px] h-[40px] rounded-xl`}>
                {icon}
            </div>
        </div>
     );
}
 
export default Summery;


// [
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "2",
//         "status" : "Incomplete",
//         "paymentStatus" : "Paid",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "Electrical Problem",
//         "cost" : 2500,
//         "responsibility" : "Owner",
//         "invoiceId" : "1"
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "4",
//         "status" : "Complete",
//         "paymentStatus" : "Due",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "Water Problem",
//         "cost" : 3200,
//         "responsibility" : "Tenant",
//         "invoiceId" : "2"
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "1",
//         "status" : "In Progress",
//         "paymentStatus" : "Pending",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "Gas Problem",
//         "cost" : 5200,
//         "responsibility" : "Owner",
//         "invoiceId" : "4"
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "4",
//         "status" : "Incomplete",
//         "paymentStatus" : "Paid",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "",
//         "cost" : 200,
//         "responsibility" : "Tenant",
//         "invoiceId" : ""
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "5",
//         "status" : "Complete",
//         "paymentStatus" : "Due",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "",
//         "cost" : 1200,
//         "responsibility" : "Owner",
//         "invoiceId" : ""
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "3",
//         "status" : "In Progress",
//         "paymentStatus" : "Due",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "",
//         "cost" : 1500,
//         "responsibility" : "Tenant",
//         "invoiceId" : ""
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "2",
//         "status" : "In Progress",
//         "paymentStatus" : "Paid",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "",
//         "cost" : 4000,
//         "responsibility" : "Owner",
//         "invoiceId" : ""
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "1",
//         "status" : "Incomplete",
//         "paymentStatus" : "Paid",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "",
//         "cost" : 1300,
//         "responsibility" : "Tenant",
//         "invoiceId" : ""
//     },
//     {
        
//         "propertyId" : "1",
//         "unitId" : "3",
//         "type" : "5",
//         "status" : "Incomplete",
//         "paymentStatus" : "Pending",
//         "details" : "onek jhamela",
//         "attachment" : "https://res.cloudinary.com/dw0fuijfs/image/upload/v1717410196/aat8meeh82v15uick7vw.pdf",
//         "date" : "2024-05-24T13:46:15.523+00:00",
//         "requestNo" : "CW720824",
//         "maintainerId" : "1",
//         "issue" : "",
//         "cost" : 1800,
//         "responsibility" : "Owner",
//         "invoiceId" : ""
//     }
// ]