function createPieChart(id, xValuesSchool, yValuesSchool, barColors) {
  new Chart(id, {
    type: "pie",
    data: {
      labels: xValuesSchool,
      datasets: [{
        backgroundColor: barColors,
        data: yValuesSchool
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
}


var xValuesSchool1 = ["Multimedia", "Audio Notes", "Notes", "Free Space"];
var yValuesSchool1 = [49, 23, 17, 11];
var barColors1 = [
  "#386CB5",
  "#7DB0F7",
  "#286BCB",
  "#CCCCCC"
];

var xValuesSchool2 = ["Multimedia", "Audio Notes", "Notes", "Free Space"];
var yValuesSchool2 = [40, 20, 71, 21];
var barColors2 = [
  "#7DB0F7",
  "#386CB5",
  "#CCCCCC",
  "#286BCB",
];

var xValuesSchool3 = ["Multimedia", "Audio Notes", "Notes", "Free Space"];
var yValuesSchool3 = [200, 223, 117, 121];
var barColors3 = [
  "#286BCB",
  "#CCCCCC",
  "#7DB0F7",
  "#386CB5",
];

var xValuesSchool4 = ["Multimedia", "Audio Notes", "Notes", "Free Space"];
var yValuesSchool4 = [40, 20, 10, 10];
var barColors4 = [
  "#CCCCCC",
  "#7DB0F7",
  "#286BCB",
  "#386CB5",
];

createPieChart("school-1", xValuesSchool1, yValuesSchool1, barColors1);
createPieChart("school-2", xValuesSchool2, yValuesSchool2, barColors2);
createPieChart("school-3", xValuesSchool3, yValuesSchool3, barColors3);
createPieChart("school-4", xValuesSchool4, yValuesSchool4, barColors4);


function showPieFromIndex(index) {

  document.querySelector(".pie-chart-container .options .drop-down span").innerHTML = `School_name_0${index}`;
  let pie_container = document.getElementsByClassName("pie-chart-container")[0];
  let canvasElements = pie_container.getElementsByTagName("canvas");
  for (let i = 0; i < canvasElements.length; i++) {
    canvasElements[i].style.display = "none";
  }
  canvasElements[index - 1].style.display = "block";
}

showPieFromIndex(3);