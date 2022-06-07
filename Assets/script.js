//time display
var dateTime = null;
var date = null;

var update = function () {
  date = moment(new Date());
  dateTime.html(date.format("dddd MMMM Do YYYY, hh:mm"));
};

$(document).ready(function () {
  dateTime = $("#dateTime");
  update();
  setInterval(update, 1000);
});

//calculate workout time;24 hour time scale

var start = document.getElementById("startInput");
var end = document.getElementById("endInput");
var subResult = document.getElementById("subResult");
var userStartSpan = document.querySelector("#startClock");
var userEndSpan = document.querySelector("#endClock");

start.addEventListener("input", subtract);
end.addEventListener("input", subtract);

function subtract() {
  var one = parseFloat(start.value) || 0;
  var two = parseFloat(end.value) || 0;

  subResult.innerText = two - one;

  if (one > two) {
    var result2 = two - one;
    subResult.innerText = 24 + result2;
  }
}

//calculation saves to local storage

var saveBtn = document.querySelector("#calculateBtn");

saveBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var startTime = document.querySelector("#startInput").value;
  var endTime = document.querySelector("#endInput").value;
  var results = document.querySelector("#subResult").value;

  localStorage.setItem("startInput", startTime);
  localStorage.setItem("endInput", endTime);
  localStorage.setItem("result", results);

  //print times on webpage

  renderLastRegistered();

  function renderLastRegistered() {
    var start = localStorage.getItem("startInput");
    var end = localStorage.getItem("endInput");

    if (!start || !end) {
      return;
    }

    userStartSpan.textContent = start;
    userEndSpan.textContent = end;
  }
});
