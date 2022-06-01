//time display
var dateTime = null;
var date = null;

var update = function () {
  date = moment(new Date());
  dateTime.html(date.format("dddd MMMM Do YYYY, hh:mm:ss"));
};

$(document).ready(function () {
  dateTime = $("#dateTime");
  update();
  setInterval(update, 1000);
});
