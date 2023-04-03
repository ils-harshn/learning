var xValues = ["Multimedia", "Audio Notes", "Notes", "Free Space"];
var yValues = [49, 23, 17, 11];
var barColors = [
  "#386CB5",
  "#7DB0F7",
  "#286BCB",
  "#CCCCCC"
];

new Chart("pie-chart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    plugins: {
      datalabels: {
        formatter: (value) => {
          let sum = 0;
          let dataArr = yValues;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(0) + "%";
          return percentage;
        },
        color: '#fff',

      },
      labels: {
        render: (ctx) => {
          return ctx.value + " mb ";
        },
        position: "outside",
        fontColor: barColors
      },
      legend: {
        display: true,
        position: 'left',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          fontColor: '#333',
          boxWidth: 8,
          boxHeight: 8,
          borderRadius: "50"
        }
      },

    },
    responsive: true,
    aspectRatio: 2,
    rotation: 210,
    borderAlign: "inner",
  },
});