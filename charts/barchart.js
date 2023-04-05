var xValuesRoster = ["School_Name_01", "School_Name_02", "School_Name_03", "School_Name_04"];
var xValuesTeacher = ["Teacher_Name_01", "Teacher_Name_02", "Teacher_Name_03", "Teacher_Name_04"];
var barColors = "#F9AC32";

var rosterData = [
  [150, 210, 350, 250],
  [50, 90, 50, 60],
]

var teacherData = [
  [190, 310, 50, 25],
  [10, 20, 20, 60],
]

new Chart("roster-plot", {
  type: "bar",
  data: {
    labels: xValuesRoster,
    datasets: [{
      label: "Active",
      backgroundColor: barColors,
      data: rosterData[0],
      barThickness: 18
    }, {
      label: "Inactive",
      backgroundColor: "#EEEEEE",
      data: rosterData[1],
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

new Chart("teacher-plot", {
  type: "bar",
  data: {
    labels: xValuesTeacher,
    datasets: [{
      label: "Active",
      backgroundColor: barColors,
      data: teacherData[0],
      barThickness: 18
    }, {
      label: "Inactive",
      backgroundColor: "#EEEEEE",
      data: teacherData[1],
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


function createRosterPlot() {
  document.getElementById("teacher-plot").style.display = "none";
  let ctx = document.getElementById("roster-plot");
  ctx.style.display = "block";
}


function createTeacherPlot() {
  document.getElementById("roster-plot").style.display = "none";
  let ctx = document.getElementById("teacher-plot");
  ctx.style.display = "block";
}


function showRosterPlot() {
  let [rosterButton, teacherButton] = document.getElementsByClassName("bar-tab");
  rosterButton.classList.add("active");
  rosterButton.classList.remove("deactive");
  teacherButton.classList.add("deactive");
  teacherButton.classList.remove("active");
  createRosterPlot();
}

function showTeacherPlot() {
  let [rosterButton, teacherButton] = document.getElementsByClassName("bar-tab");
  rosterButton.classList.add("deactive");
  rosterButton.classList.remove("active");
  teacherButton.classList.add("active");
  teacherButton.classList.remove("deactive");
  createTeacherPlot();
}


showRosterPlot();