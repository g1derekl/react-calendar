/** @jsx React.DOM */

(function(window) {

  var numberOfDays = function(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
  }

  var dayOfWeek = function(year, month) {
    var d = new Date(year, month, 0);
    return d.getDay();
  }

  

})(window);