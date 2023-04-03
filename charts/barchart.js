var xValues = ["School_Name_01", "School_Name_02", "School_Name_03", "School_Name_04"];
var barColors = "#F9AC32";

new Chart("bar-plot", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      label: "Active",
      backgroundColor: barColors,
      data: [150, 210, 350, 250],
      barThickness: 18
    }, {
      label: "Inactive",
      backgroundColor: "#EEEEEE",
      data: [50, 90, 50, 60],
      barThickness: 18
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
          usePointStyle: true,
          pointStyle: "circle",
          fontColor: '#444B48',
          boxWidth: 6,
          boxHeight: 6,
          borderRadius: "50",
        }
      },
    },

    scales: {
      x: {
        stacked: true,
        grid: { display: false },
      },

      y: {
        stacked: true,
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