/** @jsx React.DOM */

(function(window) {

  // The main component, containing all parts of the calendar.
  window.ReactCalendar = React.createClass({
    getInitialState: function() {
      return {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      }
    },

    // Return the number of days in a given month.
    // Month is a value from 0 (January) to 11 (December).
    numberOfDays: function(year, month) {
      var date = new Date(year, month + 1, 0);
      return date.getDate();
    },

    // Get the day of the week that the first day of a given month falls on.
    // Return a value from 0 (Sunday) to 6 (Saturday).
    dayOfFirst: function(year, month) {
      var date = new Date(year, month, 1);
      return date.getDay();
    },

    nextMonth: function() {
      var newMonth = new Date(this.state.year, this.state.month + 1);

      this.setState({
        year: newMonth.getFullYear(),
        month: newMonth.getMonth()
      });
    },

    previousMonth: function() {
      var newMonth = new Date(this.state.year, this.state.month - 1);

      this.setState({
        year: newMonth.getFullYear(),
        month: newMonth.getMonth()
      });
    },

    render: function() {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      return (
        <div>
          <div>{months[this.state.month] + ' ' + this.state.year}</div>

          <span>
            <button onClick={this.previousMonth}>Previous month</button>
            <button onClick={this.nextMonth}>Next month</button>
          </span>

          <CalendarBody
            month={this.state.month}
            year={this.state.year}
            dayOfFirst={this.dayOfFirst(this.state.year, this.state.month)}
            numberOfDays={this.numberOfDays(this.state.year, this.state.month)}
            daysInPreviousMonth={this.numberOfDays(this.state.year, this.state.month - 1)}
          />
        </div>
      )
    }
  });

  var CalendarBody = React.createClass({
    generateHeading: function() {
      var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var daysHeading = [];

      daysOfWeek.forEach(function(day) {
        daysHeading.push(
          <span>{day}</span>
        );
      });

      return daysHeading;
    },

    generateDays: function() {

      var days = [];

      

    },

    render: function() {
      return (
        <div>
          <div>
            {this.generateHeading()}
          </div>
          <div>

          </div>
        </div>
      )
    }
  });

})(window);