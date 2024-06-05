"use client"

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, plugins, Tooltip, Filler, ScriptableContext } from 'chart.js';
import './bar-chart.css'
ChartJS.register(CategoryScale,LinearScale,LineElement,PointElement,Filler,Tooltip);

interface BarChartProps {
    dataset1 : {
        month : string,
        amount : number
    }[],
    dateset2 : {
        month : string,
        amount : number
    }[],
    stepSize : number,
    min : number,
    max : number
}


const BarChart : React.FC<BarChartProps> = ({dataset1,dateset2,stepSize,min,max}) => {

    
    let arrar1 = [
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

    arrar1.map(({amount},index) =>{
        arrar1[index].amount = dataset1[index].amount - dataset1[index].amount
    })

    const data = {
        labels : ['Jan', 'Feb',"Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets : [
            {
                label : "Rents",
                data : dataset1.map(({amount})=> amount),
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
                data : dateset2.map(({amount})=> amount),
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

    const plugin = {
        id : 'hoverLine',
        afterDatasetsDraw(chart : any) {
            const { ctx, tooltip, chartArea : {top, bottom, left, right, width, height}, scales : {x,y}} = chart

            if (tooltip._active.length > 0 && tooltip !== undefined) {
                const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex)
                const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y)

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
    }

 

    return ( 
        <div className="bar-chart-wrapper">
            <Line 
                data={data} 
                options={{
                plugins : {
                    legend : { display : false}
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
                            min,
                            max,
                            ticks : {
                                stepSize,
                                // callback : (value : any) => value + 'K'
                            },
                            grid : {
                                tickBorderDash : [10]
                            }
                        }
                    }
                
                }} 
                plugins={[plugin]}
            />
            
        </div>
     );
}
 
export default BarChart;