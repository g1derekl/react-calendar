(function() {

  var events = [];

  var date = new Date();

  for (var i=0; i < 1000; i++) { // Procedurally generate 10,000 event objects, 10 each day for 1000 days.
    for (var j=0; j < 10; j++) {
      events.push({
        date: new Date(date.getFullYear(), date.getMonth(), date.getDay() + i),
        title: 'Event ' + i + '-' + j,
        onClick: function(event, element) {
          alert('Clicked ' + event.title);
        }
      });
    }
  }

  React.render(React.createElement(ReactCalendar, {events: events}), document.body);
})();