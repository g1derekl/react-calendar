(function() {

  var events = [];

  var date = new Date();

  for (var i=0; i < 1000; i++) { // Procedurally generate 100 event objects.
    events.push({
      date: new Date(date.getFullYear(), date.getMonth(), date.getDay() + i),
      title: 'Event ' + i,
      onClick: function(event, element) {
        console.log(event.title);
      }
    });
  }

  React.render(React.createElement(ReactCalendar, {events: events}), document.body);
})();