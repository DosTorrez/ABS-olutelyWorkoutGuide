//time display variables
var dateTime = null;
var date = null;
//exercise API variables
var exerciseInput = document.querySelector("#exercise-input");
var exerciseResults = document.querySelector("#exercise-results");
var exerciseBtn = document.querySelector("#exercise-button");

//functionality for moment & time/date display
var update = function () {
  date = moment(new Date());
  dateTime.html(date.format("dddd, MMMM Do YYYY, hh:mm"));
};

$(document).ready(function () {
  dateTime = $(".dateTime");
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
//start of exercise API code
//functionality for exercise search input
var formSubmitHandler = function (event) {
  event.preventDefault();

  var workoutSearch = exerciseInput.value;

  if (workoutSearch) {
    getExerciseOptions(workoutSearch);
    exerciseResults.textContent = "";
    exerciseInput.value = "";
  } else {
    alert("Please enter fitness term");
  }
};

//functionality for fetching exercise API data
var getExerciseOptions = function (workoutSearch) {
  var apiFetch =
    "https://wger.de/api/v2/exerciseinfo/?limit=300&offset=0&/language=2";

  fetch(apiFetch)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      var filteredResults = response.results.filter(
        (exercise) =>
          exercise.category.name === workoutSearch &&
          exercise.language.short_name === "en"
      );
      // var results = filterExercise(response, workoutSearch)
      console.log(filteredResults);
      renderExercise(filteredResults);
    });
};

// functionality for displaying data from workout API
var renderExercise = function (exercises) {
  exerciseResults.innerHTML = "";

  //for loop to print individual data on each card
  for (var i = 0; i < exercises.length; i++) {
    //creating exercise card elements
    var exerciseCard = document.createElement("div");
    exerciseCard.setAttribute("class", "exercise-card");
    exerciseResults.append(exerciseCard);
    //functionality for displaying exercise name
    var name = exercises[i].name;
    var nameEl = document.createElement("h4");
    nameEl.setAttribute("class", "nameStyling");
    nameEl.textContent = name;
    exerciseCard.append(nameEl);
    //functionality for displaying
    var description = exercises[i].description;
    var descriptionEl = document.createElement("div");
    descriptionEl.setAttribute("class", "descriptionStyling");
    descriptionEl.textContent = description;
    exerciseCard.append(descriptionEl);
  }
};
exerciseBtn.onclick = formSubmitHandler;
