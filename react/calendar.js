/** @jsx React.DOM */

(function(window) {

  // The main component, containing all parts of the calendar
  window.ReactCalendar = React.createClass({
    getInitialState: function() {
      return {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        events: this.organizeEvents(this.props.events)
      }
    },

    // E.g. when user wants to filter events or dynamically add new ones.
    componentWillReceiveProps: function(nextProps) {

      this.setState({
        events: this.organizeEvents(nextProps.events)
      });
    },

    // Reset calendar view to current month.
    resetMonth: function() {
      this.setState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
      });
    },

    // Group events by year, then month, then day.
    organizeEvents: function(eventsArray) {

      eventsArray = eventsArray || [];
      var events = {};

      for (var i=0; i < eventsArray.length; i++) {
        var eventDate = new Date(eventsArray[i].date);

        var eventYear = eventDate.getFullYear();
        var eventMonth = eventDate.getMonth();
        var eventDay = eventDate.getDate();

        if (events[eventYear]) {
          if (events[eventYear][eventMonth]) {
            if (events[eventYear][eventMonth][eventDay]) {

              events[eventYear][eventMonth][eventDay].push(eventsArray[i]);
            }
            else {
              events[eventYear][eventMonth][eventDay] = [eventsArray[i]];
            }
          }
          else {
            events[eventYear][eventMonth] = {};
            events[eventYear][eventMonth][eventDay] = [eventsArray[i]]
          }
        }
        else {
          events[eventYear] = {}
          events[eventYear][eventMonth] = {};
          events[eventYear][eventMonth][eventDay] = [eventsArray[i]]
        }
      }

      return events;
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

    // Switch to the next month.
    nextMonth: function() {
      var newMonth = new Date(this.state.year, this.state.month + 1);

      this.setState({
        year: newMonth.getFullYear(),
        month: newMonth.getMonth()
      });
    },

    // Switch to the previous month.
    previousMonth: function() {
      var newMonth = new Date(this.state.year, this.state.month - 1);

      this.setState({
        year: newMonth.getFullYear(),
        month: newMonth.getMonth()
      });
    },

    render: function() {
      return (
        <div id='react-cal-component'>
          <CalendarControls
            previousMonth={this.previousMonth}
            nextMonth={this.nextMonth}
            resetMonth={this.resetMonth}
            month={this.state.month}
            year={this.state.year}
          />

          <CalendarBody
            month={this.state.month}
            year={this.state.year}
            dayOfFirst={this.dayOfFirst(this.state.year, this.state.month)}
            numberOfDays={this.numberOfDays(this.state.year, this.state.month)}
            daysInPreviousMonth={this.numberOfDays(this.state.year, this.state.month - 1)}
            events={this.state.events}
          />
        </div>
      )
    }
  });

  // Calendar control buttons component
  var CalendarControls = React.createClass({
    render: function() {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      return (
        <span className='react-cal-controls'>
          <h4 className='react-cal-month-label'>{months[this.props.month] + ' ' + this.props.year}</h4>
          <button className='react-cal-prev-month' onClick={this.props.previousMonth}>{'<'}</button>
          <button className='react-cal-next-month' onClick={this.props.nextMonth}>{'>'}</button>
          <button className='react-cal-today-button' onClick={this.props.resetMonth}>Today</button>
        </span>
      )
    }
  });

  var CalendarBody = React.createClass({
    generateHeading: function() {
      var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var daysHeading = [];

      for (var i=0; i < daysOfWeek.length; i++) {
        daysHeading.push(
          <div className='react-cal-weekday'>
            <h5>{daysOfWeek[i]}</h5>
          </div>
        );
      }

      return daysHeading;
    },

    // Generate day component for each day in view.
    formatDay: function(year, month, day, currentMonth) {

      var month = new Date(year, month, day);

      var events = [];
      if (this.props.events[month.getFullYear()]
       && this.props.events[month.getFullYear()][month.getMonth()]
       && this.props.events[month.getFullYear()][month.getMonth()][day]) {
        events = this.props.events[month.getFullYear()][month.getMonth()][day];
      }

      return <CalendarDay year={month.getFullYear()} month={month.getMonth()} day={day} events={events} currentMonth={currentMonth} />
    },

    // Fill out days of previous month until we get to first day of current month.
    fillOutPreviousMonth: function(day) {
      return this.props.daysInPreviousMonth - (this.props.dayOfFirst - day);
    },

    // Fill out remainder of calendar with days in next month.
    fillInNextMonth: function(day) {
      return -1 * (this.props.numberOfDays - day);
    },

    generateDays: function() {

      var days = [];
      var totalDays = 0; // Increment this in each of our loops to limit displayed days to 42 (6 weeks).

      for (var i=1; i <= this.props.dayOfFirst; i++) { 
        days.push(this.formatDay(this.props.year, this.props.month - 1, this.fillOutPreviousMonth(i)));

        totalDays++;
      }
      for (var i=1; i <= this.props.numberOfDays; i++) {
        days.push(this.formatDay(this.props.year, this.props.month, i, true));

        totalDays++;
      }
      for (var i=this.props.numberOfDays + 1; i < 43 - this.props.dayOfFirst; i++) {
        days.push(this.formatDay(this.props.year, this.props.month + 1, this.fillInNextMonth(i)));
      }

      return days;
    },

    render: function() {
      return (
        <div id='react-cal-grid'>
          <div className='react-cal-weekdays react-cal-grid-1-7'>
            {this.generateHeading()}
          </div>
          <div className='react-cal-days react-cal-grid-1-7'>
            {this.generateDays()}
          </div>
        </div>
      )
    }
  });

  // Individual day component
  var CalendarDay = React.createClass({
    handleClick: function(event) { // Perform function or navigate to link, depending on value provided.
      return function(clickEvent) {
        if (typeof(event.onClick) === 'function') {
          event.onClick(event, clickEvent.target);
        }
        else if (typeof(event.onClick) === 'string') {
          window.location.href = event.onClick;
        }
      }
    },
    render: function() {

      var events = [];

      for (var i=0; i < this.props.events.length; i++) {
        events.push(
          <li onClick={this.handleClick(this.props.events[i])}>
            <label>{this.props.events[i].title}</label>
          </li>
        )
      }

      var currentMonthClass;
      if (this.props.currentMonth) {
        currentMonthClass='react-cal-current-month-day';
      }

      return (
        <div className='react-cal-day'>
          <div>
            <h5 className={'react-cal-day-label ' + currentMonthClass}>{this.props.day}</h5>
            <ul className='react-cal-events-list'>{events}</ul>
          </div>
        </div>
      )
    }
  });

})(window);