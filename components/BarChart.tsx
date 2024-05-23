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
                label : "Rents",
                data : rents.map(({amount})=> amount),
                borderColor : 'rgba(255, 148, 39, 1)',
                pointBorderColor : "transparent",
                tension : 0.5,
                fill : "start",
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(255, 148, 39, 0.2)");
                    gradient.addColorStop(1, "rgba(255, 148, 39, 0.1)");
                    return gradient;
                  },
            },
            {
                label : "Expenses",
                data : expenses.map(({amount})=> amount),
                borderColor : 'rgba(0, 0, 255, 1)',
                pointBorderColor : "transparent",
                tension : 0.5,
                fill : "start",
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(0, 0, 255, 0.2)");
                    gradient.addColorStop(1, "rgba(0, 0, 255, 0.1)");
                    return gradient;
                  },
            },
        ]
    }

 

    return ( 
        <div className="bar-chart-wrapper">
            <Line 
                data={data} 
                options={{
                plugins : {
                    legend : false
                },
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
                                stepSize : 20000,
                                // callback : (value : any) => value + 'K'
                            },
                            grid : {
                                tickBorderDash : [10]
                            }
                        }
                    }
                
                }} 
                plugins={[{
                    id : 'hoverLine',
                    afterDatasetsDraw(chart,args,options) {
                        const { ctx, tooltip, chartArea : {top, bottom, left, right, width, height}, scales : {x,y}} = chart

                        if (tooltip?._active.length > 0) {
                            const xCoor = x.getPixelForValue(tooltip?.dataPoints[0].dataIndex)
                            const yCoor = y.getPixelForValue(tooltip?.dataPoints[0].parsed.y)

                            chart.data.datasets[0].pointBorderColor = 'rgba(0, 41, 255, 1)'

                            ctx.save()
                            ctx.beginPath()
                            ctx.lineWidth = 2
                            ctx.strokeStyle = 'rgba(0, 41, 255, 0.3)'
                            ctx.setLineDash([2,2])
                            ctx.moveTo(xCoor,yCoor)
                            ctx.lineTo(xCoor,bottom)
                            ctx.stroke()
                            ctx.setLineDash([])
                        }
                    }
                }]}
            />
            
        </div>
     );
}
 
export default BarChart;