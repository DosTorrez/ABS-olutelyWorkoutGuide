# Abs-olutely Workout Guide

Live Link: 

USER STORY: 
  * As a gym goer/user, 
  * I want an application that allows me to search for music,
  * while being able to search & pull up fitness tips,
  * so that I can guide myself through a successful workout,
  * I also want to log my workout routine and total workout time,
  * so that I can track my daily fitness/progress
 
ACCEPTANCE CRITERIA:

GIVEN a fitness guide with a weather dashboard

WHEN I search for the weather in my location

THEN I am presented with with weather to determine if I want to workout indoors or outdoors

WHEN I search for fitness tips

THEN I will be presented with results from wger.de API

WHEN I log my workout routines for the day

THEN my workout will be saved into local storage

WHEN I save my workout into local storage

THEN I will be able to see it printed out on the page

WHEN I type in my start and end time of my workout

THEN I am able to see the calculated time and save it to local storage

WHEN I save the time to local storage

THEN I will be able to see the total workout time presented on the page

THIS APPLICATION HAS THE FOLLOWING PARAMETERS & FUNCTIONALITY:
   * Data from 2 server API’s (Open Weather https://openweathermap.org/api & wger.de https://wger.de/api/v2/exercise/ API's)
   * Uses Bulma CSS frameworks
   * Uses local stroage to store persistent data (user workout time & routines)
   * Polished UI
   * Includes user input functionality for searching API's (Open Weather data & wger.de data searching) 
