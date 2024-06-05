import { SummryItemProps } from "@/types";


const Summery : React.FC<SummryItemProps> = ({id,title,subtitle,icon}) => {
    return ( 
        <div className="bg-gray-100 rounded-md py-6 px-6">
            {icon}
            <h5 className="text-sm text-gray-500 mt-2">{subtitle}</h5>
            <h2 className="text-4xl font-semibold mt-4">{title}</h2>
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
//         "issue" : "",
//         "cost" : 2500,
//             "responsibility" : "Owner"
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
//         "issue" : "",
//         "cost" : 3200,
//             "responsibility" : "Tenant"
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
//         "issue" : "",
//         "cost" : 5200,
//             "responsibility" : "Owner"
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
//             "responsibility" : "Tenant"
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
//             "responsibility" : "Owner"
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
//             "responsibility" : "Tenant"
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
//             "responsibility" : "Owner"
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
//             "responsibility" : "Tenant"
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
//             "responsibility" : "Owner"
//     }
// ]