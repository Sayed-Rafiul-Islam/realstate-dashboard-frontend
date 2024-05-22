"use client"

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, plugins, Tooltip, Filler, ScriptableContext } from 'chart.js';
import './bar-chart.css'
ChartJS.register(CategoryScale,LinearScale,LineElement,PointElement,Filler,Tooltip);

interface BarChartProps {
    rents : {
        month : string,
        amount : number
    }[],
    expenses : {
        month : string,
        amount : number
    }[],
}

const BarChart : React.FC<BarChartProps> = ({rents,expenses}) => {

    
    let revenue = [
        {
            month : '01',
            amount : 0,
        },
        {
            month : '02',
            amount : 0,
        },
        {
            month : '03',
            amount : 0,
        },
        {
            month : '04',
            amount : 0,
        },
        {
            month : '05',
            amount : 0,
        },
        {
            month : '06',
            amount : 0,
        },
        {
            month : '07',
            amount : 0,
        },
        {
            month : '08',
            amount : 0,
        },
        {
            month : '09',
            amount : 0,
        },
        {
            month : '10',
            amount : 0,
        },
        {
            month : '11',
            amount : 0,
        },
        {
            month : '12',
            amount : 0,
        },
    ]

    revenue.map(({amount},index) =>{
        revenue[index].amount = rents[index].amount - expenses[index].amount
    })



    const data = {
        labels : ['Jan', 'Feb',"Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets : [
            {
                label : "Revenue",
                data : revenue.map(({amount})=> amount),
                borderColor : 'rgba(99,102,241)',
                pointBorderColor : "rgba(99,102,241)",
                // pointBorderWidth : 4,
                tension : 0.5,
                fill : "start",
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(99,102,241,1)");
                    gradient.addColorStop(1, "rgba(99,102,241,0.1)");
                    return gradient;
                  },
            },
            {
                label : "Rents",
                data : rents.map(({amount})=> amount),
                borderColor : 'rgba(50,205,50)',
                pointBorderColor : "rgba(50,205,50)",
                // pointBorderWidth : 4,
                tension : 0.5,
                // fill : "start",
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(50,205,50,1)");
                    gradient.addColorStop(1, "rgba(50,205,50,0.1)");
                    return gradient;
                  },
            },
            {
                label : "Expenses",
                data : expenses.map(({amount})=> amount),
                borderColor : 'rgba(255,0,0)',
                pointBorderColor : "rgba(255,0,0)",
                // pointBorderWidth : 4,
                tension : 0.5,
                fill : "start",
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(255,0,0,1)");
                    gradient.addColorStop(1, "rgba(255,0,0,0.1)");
                    return gradient;
                  },
            },
        ]
    }

 

    return ( 
        <div className="bar-chart-wrapper">
            <Line data={data} options={{
                interaction : {
                    mode : 'index'
                },
                scales : {
                    x : {
                        grid : {
                            display : false
                        }
                    },
                    y : {
                        min : 0,
                        max : 100000,
                        ticks : {
                            stepSize : 10000,
                            // callback : (value : any) => value + 'K'
                        },
                        grid : {
                            tickBorderDash : [10]
                        }
                    }
            }
                
                }} 
            />
        </div>
     );
}
 
export default BarChart;