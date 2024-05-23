"use client"

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import './doughnut-chart.css'
import { OrderProps } from "@/types";
import { useEffect, useState } from "react";

interface DoughnutChartProps {
    orders : OrderProps[],
}

const DoughnutChart : React.FC<DoughnutChartProps> = ({orders}) => {

    const [paid, setPaid] = useState(0)
    const [canceled, setCanceled] = useState(0)
    const [pending, setPending] = useState(0)


    useEffect(()=>{
        const paid = orders.filter((item)=>{
            if(item.status === 'Paid') {
                return item
            }
        })
        const canceled = orders.filter((item)=>{
            if(item.status === 'Canceled') {
                return item
            }
        })
        const pending = orders.filter((item)=>{
            if(item.status === 'Pending') {
                return item
            }
        })
    
        setPaid(Math.round((paid.length/orders.length)*100))
        setCanceled(Math.round((canceled.length/orders.length)*100))
        setPending(Math.round((pending.length/orders.length)*100))

    },[orders])

    




    const data = {
        labels : ['Paid', 'Canceled',"Pending"],
        datasets : [
            {
                label : "Orders",
                data : [paid,canceled,pending],
                backgroundColor: [
                    'blue',
                    '#fca5a5',
                    '#f97316',
         
      
                  ],
                //   borderColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //   ],
                  borderWidth: 1,
                // borderColor : 'rgba(99,102,241)',
                // pointBorderColor : "rgba(99,102,241)",
                // pointBorderWidth : 4,
                // tension : 0.5,
                // fill : "start",
                // backgroundColor: (context: ScriptableContext<"line">) => {
                //     const ctx = context.chart.ctx;
                //     const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                //     gradient.addColorStop(0, "rgba(99,102,241,1)");
                //     gradient.addColorStop(1, "rgba(99,102,241,0.1)");
                //     return gradient;
                //   },
            },
        ]
    }


    return ( 
        <div>
            <div className="doughnut-chart-wrapper">
            <Doughnut data={data} 
                    options={{
                        maintainAspectRatio : false,
                        plugins : {
                            legend : {
                                display : false
                            }
                        }
                    }} 

                    plugins={[{
                        id : 'doughnutLabelsLine',
                        afterDraw(chart,args,options) {
                            const { ctx, chartArea : {top, bottom, left, right, width, height}} = chart
                            chart.data.datasets.forEach((dataset, i) =>{
                                chart.getDatasetMeta(i).data.forEach((datapoint, index) =>{
                                    const { x, y } = datapoint.tooltipPosition(true)
                                    ctx.fillStyle = 'white'
                                    ctx.textAlign = 'center'
                                    ctx.textBaseline = 'middle'
                                    ctx.font = '15px Arial'
                                    ctx.fillText(`${dataset.data[index]}%`,x,y)
                                })
                            })
                        }
                    }]}
            />
            </div>
           

            <div className="flex mt-5 w-full justify-center">
                <div className="flex flex-col">
                    <span className="flex items-center gap-2"><div className="w-[15px] h-[15px] rounded-full bg-blue-700" />  <h4>Paid</h4></span>
                    <span className="flex items-center gap-2"><div className="w-[15px] h-[15px] rounded-full bg-orange-500" />  <h4>Unpaid</h4></span>
                    <span className="flex items-center gap-2"><div className="w-[15px] h-[15px] rounded-full bg-red-300" />  <h4>Pending</h4></span>
                </div>
            </div>
        </div>
     );
}
 
export default DoughnutChart;