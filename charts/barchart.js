// const barDataConfig = {
//     labels: ["School_Name_01", "School_Name_02", "School_Name_03", "School_Name_04"],
//     datasets: [{
//         label: "Active",
//         barThickness: 25,
//         backgroundColor: "#F9AC32",
//         hoverBackgroundColor: "#5BCDA2",
//         data: [150, 210, 350, 250],
//     }, {
//         label: "Inactive",
//         barThickness: 25,
//         data: [50, 90, 50, 60],
//     }]
// }

// const barOptions = {
//     type: "bar",
//     data: barDataConfig,
//     options: {
//         onHover: (context) => {
//             barTickColorUpdateOnHover(context)
//         },
//         plugins: {
//             legend: {
//                 align: "end",
//                 labels: {
//                     usePointStyle: true,
//                     boxWidth: 6,
//                     boxHeight: 6,
//                     color: "#444B48",
//                 },
//             },
//             tooltip: {
//                 yAlign: "bottom",
//                 xAlign: "right",
//                 backgroundColor: "transparent",
//                 bodyColor: "red",
//                 titleColor: "red",
//                 footerColor: "red",
//             }
//         },
//         scales: {
//             x: {
//                 stacked: true,
//                 grid: {
//                     display: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//                 ticks: {
//                     color: ['#0000008d', '#0000008d', '#0000008d', '#0000008d'],
//                     onHoverColor: ["#000000"],
//                     font: {
//                         weight: [0, 0, 0, 0]
//                     }
//                 }
//             },
//             y: {
//                 stacked: true,
//                 border: {
//                     display: false,
//                 },
//                 grid: {
//                     color: "#AAAAAA",
//                     lineWidth: 0.25,
//                 },
//                 min: 0,
//                 max: 400,
//                 ticks: {
//                     stepSize: 100,
//                     padding: 20,
//                 }
//             }
//         },
//         responsive: true,
//         aspectRatio: 2,
//         // plugins: [hoverValue],
//     }
// }


// const barTickColorUpdateOnHover = (context) => {
//     let chart = context.chart
//     // let {ctx, data, options} = chart
//     let points = chart.getElementsAtEventForMode(context.native, 'nearest',
//         {
//             intersect: true,
//         }
//     );
//     // console.log(points)
//     if (points[0]) {
//         for (let i = 0; i < 4; i++) {
//             if (i == points[0].index) {
//                 chart.config.options.scales.x.ticks.color[i] = 'black'
//                 chart.config.options.scales.x.ticks.font.weight[i] = 600
//             } else {
//                 chart.config.options.scales.x.ticks.color[i] = '#0000008d'
//                 chart.config.options.scales.x.ticks.font.weight[i] = 0
//             }
//         }
//         chart.update()
//     }
// }

// const barChart = document.getElementById('bar-plot');
// let c = new Chart(barChart, barOptions);


var xValues = ["School_Name_01", "School_Name_02", "School_Name_03", "School_Name_04"];
var barColors = "#F9AC32"; 

new Chart("bar-plot", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      label: "Active",
      backgroundColor: barColors,
      data:[150, 210, 350, 250],
      barThickness:18
    },{
        label:"Inactive",
        backgroundColor: "#EEEEEE",
        data: [50, 90, 50, 60],
        barThickness:18
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: true,
        position: 'right',
        align: "start",
        labels: {
            usePointStyle	: true,
            pointStyle: "circle",
            fontColor: '#444B48',
            boxWidth: 6,
            boxHeight: 6,
            borderRadius: "50",
        }
    },
    },
    
    scales: {
      x:  {
        stacked:true,
        grid: { display: false },
      },
  
      y: {
        stacked:true,
        border: {
          display: false
      },
        ticks: {
          stepSize: 100,   // forces step size to be 50 units
          min: 0,
          max: 400
        },
      },
    },
    responsive: true,
    aspectRatio: 2
  },
});