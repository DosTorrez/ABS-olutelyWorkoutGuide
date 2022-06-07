//time display variables
var dateTime = null;
var date = null;
//exercise API variables
var exerciseInput = document.querySelector('#exercise-input');
var exerciseResults = document.querySelector('#exercise-results');
var exerciseBtn = document.querySelector('#exercise-button');

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

//start of exercise API code
//functionality for exercise search input
var formSubmitHandler = function (event) {
  event.preventDefault();

  var workoutSearch = exerciseInput.value;

  if (workoutSearch) {
      getExerciseOptions(workoutSearch);
      exerciseResults.textContent = '';
      exerciseInput.value = '';
  } else {
      alert('Please enter fitness term');
  }
};

//functionality for fetching exercise API data 
var getExerciseOptions = function (workoutSearch) {
  var apiFetch = 'https://wger.de/api/v2/exerciseinfo/?limit=300&offset=0&/language=2'
 
  fetch(apiFetch)
    .then(function(response) {
        return response.json();
    }).then(function(response) {
        console.log(response)
        var filteredResults = response.results.filter(exercise => exercise.category.name === workoutSearch && exercise.language.short_name === "en")
        // var results = filterExercise(response, workoutSearch)
        console.log(filteredResults)
        renderExercise(filteredResults)
    })
}

// functionality for displaying data from workout API
var renderExercise = function (exercises) {
  exerciseResults.innerHTML = ''

  //for loop to print individual data on each card
  for (var i = 0; i < exercises.length; i++) {
    //creating exercise card elements
    var exerciseCard = document.createElement('div');
    exerciseCard.setAttribute('class', 'exercise-card')
    exerciseResults.append(exerciseCard)
    //functionality for displaying exercise name 
    var name = exercises[i].name;
    var nameEl = document.createElement('h4');
    nameEl.setAttribute('class', 'nameStyling')
    nameEl.textContent = name
    exerciseCard.append(nameEl)
    //functionality for displaying 
    var description = exercises[i].description;
    var descriptionEl = document.createElement('div')
    descriptionEl.setAttribute('class', 'descriptionStyling')
    descriptionEl.innerHTML = '<strong>' + description + '</strong>'
    exerciseCard.append(descriptionEl)
  }
}
exerciseBtn.onclick = formSubmitHandler;









