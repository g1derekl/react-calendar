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
      var d = new Date(year, month + 1, 0);
      return d.getDate();
    },

    // Get the day of the week that the first day of a given month falls on.
    // Return a value from 0 (Sunday) to 6 (Saturday).
    dayOfWeek: function(year, month) {
      var d = new Date(year, month, 1);
      return d.getDay();
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

      var dayOfFirst = this.dayOfWeek(this.state.year, this.state.month);
      var numberOfDays = this.numberOfDays(this.state.year, this.state.month);

      return (
        <div>
          <div>{dayOfFirst}</div>
          <div>{numberOfDays}</div>
          <span>
            <button onClick={this.previousMonth}>Previous month</button>
            <button onClick={this.nextMonth}>Next month</button>
          </span>
        </div>
      )
    }
  });

})(window);