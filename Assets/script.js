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
  var results = document.querySelector("#subResult").textContent;

  localStorage.setItem("startInput", startTime);
  localStorage.setItem("endInput", endTime);
  localStorage.setItem("result", results);
  // console.log(results);

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
    descriptionEl.innerHTML = description;
    exerciseCard.append(descriptionEl);
  }
};

exerciseBtn.onclick = formSubmitHandler;

//Workout log 

//Workout button 1 
var saveBtn1 = document.querySelector("#workoutlogsaveBtn1");

saveBtn1?.addEventListener("click", function (event) {
  event.preventDefault();

  var Workoutinput = document.querySelector("#Workout1").value;
  //console.log(Workoutinput);

 localStorage.setItem("Workout 1", Workoutinput);
}); 

//Workout button 2 
var saveBtn2 = document.querySelector("#workoutlogsaveBtn2");

saveBtn2?.addEventListener("click", function (event) {
  event.preventDefault();

  var Workoutinput = document.querySelector("#Workout2").value;
  //console.log(Workoutinput);

 localStorage.setItem("Workout 2", Workoutinput);
}); 

//Workout button 3 
var saveBtn3 = document.querySelector("#workoutlogsaveBtn3");

saveBtn3?.addEventListener("click", function (event) {
  event.preventDefault();

  var Workoutinput = document.querySelector("#Workout3").value;
  //console.log(Workoutinput);

 localStorage.setItem("Workout 3", Workoutinput);
}); 


var CityNameInput = document.querySelector('#city-srch');
var searchBtn = document.querySelector('#city-button');
var WeatherInfo = document.querySelector('.weather-info-container');
var ForecastTitle = document.querySelector('.Forecast-Title');
var Forecast = document.querySelector('.Forecast-Container');

//City Name Input
var CityInput = function (event) {
    event.preventDefault();
}
    var CityName = CityNameInput.value;
 
    if (CityName) {
      getCityWeather(CityName);
      WeatherInfo.textContent = '';
      CityNameInput.value = '';  
  };



  //Search Button Event Listener
searchBtn.addEventListener('click', function() {
    console.log(CityNameInput.value)
})
    
//Display Weather Api Data
var renderInfo = function(response) {

  //Name
  var CName = response.CName;
  var CNameEl = document.createElement('h1');
  CNameEl.setAttribute('class', 'CNameStyling')
  CNameEl.textContent = CName  
  WeatherInfo.append(CNameEl)

  //icon
  var icon = response.weather[0].icon;
  var iconEl = document.createElement('img');
  var iconSource = 'http://openweathermap.org/img/w/' + icon + '.png'
  iconEl.setAttribute('src', iconSource)
  iconEl.setAttribute('class', 'iconStyling')
  CNameEl.append(iconEl)

  //Temperature conversion display
  var newTemp = parseInt((response.main.temp - 273.15) * (9/5) + 32);
  var tempEl = document.createElement('div');
  tempEl.setAttribute('class', 'tempStyling')
  tempEl.textContent = 'Current Temperature: ' + newTemp + ' ° Fahrenheit'
  WeatherInfo.append(tempEl)

  //Humidity
  var humidity = response.main.humidity;
  var humidityEl = document.createElement('div');
  humidityEl.setAttribute('class', 'humidityStyling')
  humidityEl.textContent = 'Humidity: ' + humidity + ' %'
  WeatherInfo.append(humidityEl)

  //Wind Speed 
  var windSpeed = response.wind.speed;
  var windEl = document.createElement('div');
  windEl.setAttribute('class', 'windStyling')
  windEl.textContent = 'Wind Speed: ' + windSpeed + ' MPH'
  WeatherInfo.append(windEl)
}

//Weather & One Call API fetching data
var getCityWeather = function (cityName) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' 
    var apiFetch = apiUrl + cityName + '&appid=f418636e440eb4ee212eff9d9e946a98'
  
    fetch(apiFetch)
        .then(function(response) {
            return response.json();
        }).then(function(response) {
            console.log(response)
            lat = response.coord.lat
            lon = response.coord.lon
            renderInfo(response) 
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f418636e440eb4ee212eff9d9e946a98`)
                .then(function(response) {
                    return response.json();
                }).then(oneCall => {
                console.log(oneCall)
                renderFiveDay(oneCall)
            })
        }) 
    };

//functionality for displaying uv-index & five day forecast API data
var renderFiveDay = function(oneCall) {
    Forecast.innerHTML = ''

    //Forecast card titles
    var forecastTitle = document.createElement('h2')
    forecastTitle.textContent = "Future Forecast"
    forecastTitle.innerHTML = ''
    ForecastTitle.append(forecastTitle)

    //for loop to create each item
    for (var i = 1; i < 6; i++) {

        //Card Element 
        var dailyWeatherCard = document.createElement('div');
        dailyWeatherCard.setAttribute('class', 'daily-card')
        Forecast.append(dailyWeatherCard)

        //Date
        var dayDate = moment.unix(oneCall.daily[i].dt).format('MMMM Do, YYYY')
        var dayDateEl = document.createElement('h3');
        dayDateEl.setAttribute('class', 'date-styling')
        dayDateEl.textContent = dayDate
        dailyWeatherCard.append(dayDateEl)

        //icon
        var dayIcon = oneCall.daily[i].weather[0].icon;
        var dayIconEl = document.createElement('img');
        var dayIconSource = 'http://openweathermap.org/img/w/' + dayIcon + '.png'
        dayIconEl.setAttribute('src', dayIconSource)
        dayIconEl.setAttribute('class', 'icon-styling')
        dailyWeatherCard.append(dayIconEl)

        //Temperature
        var dayTemp = parseInt((oneCall.daily[i].temp.day - 273.15) * (9/5) + 32);
        var dayTempEl = document.createElement('div');
        dayTempEl.setAttribute('class', 'temp-styling')
        dayTempEl.textContent = 'Temp: ' + dayTemp + ' ° F'
        dailyWeatherCard.append(dayTempEl)

        //functionality for humidity display 
        var dayHumidity = oneCall.daily[i].humidity;
        var dayHumidityEl = document.createElement('div');
        dayHumidityEl.setAttribute('class', 'humidity-styling')
        dayHumidityEl.textContent = 'Humidity: ' + dayHumidity + ' %'
        dailyWeatherCard.append(dayHumidityEl)

        //functionality for wind speed display
        var dayWind = oneCall.daily[i].wind_speed; 
        var dayWindEl = document.createElement('div');
        dayWindEl.setAttribute('class', 'wind-styling')
        dayWindEl.textContent = 'Wind Speed: ' + dayWind + ' MPH'
        dailyWeatherCard.append(dayWindEl)
    }
}

//Button click trigger 
  searchBtn.onclick = CityInput;
