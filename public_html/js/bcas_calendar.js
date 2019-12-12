"use strict";

var calendarId = "bc3nqdvipkubbn09u2j09o85c4";
var apiKey = "AIzaSyA1bB6_fgdqtQXGUkX0nrdYT3gq8ozHnBg";
var scopes = "https://www.googleapis.com/auth/calendar";


Date.prototype.addDays = function(days) {
    var d = new Date(this.valueOf());
    d.setDate(d.getDate() + days);
    return d;
};

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  var monday = new Date(d.setDate(diff));
  monday.setHours(0);
  return monday;
}

function getEventsForDay(events, day) {
    var eventsForDay = [];
    var len = events.items.length;
    for (var i = 0; i < len; i++) {
        var t = events.items[i].start.dateTime.split(/\D/);
        var date = new Date(t[0], --t[1], t[2], t[3], t[4]);
        if (date.getDate() == day.getDate()) {
            eventsForDay.push(events.items[i]);
        }
    }
    return eventsForDay;
}


function buildEventTable(entry) {

    var t = entry.start.dateTime.split(/\D/);
    var start = new Date(t[0], --t[1], t[2], t[3], t[4]);
    t = entry.end.dateTime.split(/\D/);
    var end = new Date(t[0], --t[1], t[2], t[3], t[4]);

    var table = document.createElement("table");

    var tr = document.createElement("tr");
    table.appendChild(tr);

    var tdTime = document.createElement("td");
    tdTime.className = "event-time";
    tdTime.appendChild(document.createTextNode(start.getHours() + ":" + padNumber(start.getMinutes()) + " - " + end.getHours() + ":" + padNumber(end.getMinutes())));
    tr.appendChild(tdTime);

    var tdSep = document.createElement("td");
    tdSep.className = "sep";
    tdSep.appendChild(document.createTextNode("|"));
    tr.appendChild(tdSep);

    var tdDetails = document.createElement("td");
    tdDetails.className = "details";
    var spanTitle = document.createElement("span");
    spanTitle.className = "event-title";
    spanTitle.appendChild(document.createTextNode(entry.summary));
    tdDetails.appendChild(spanTitle);

    tdDetails.appendChild(document.createElement("br"));

    var spanLocation = document.createElement("span");
    spanLocation.className = "event-location";
    spanLocation.appendChild(document.createTextNode("(" + entry.location + ")"));
    tdDetails.appendChild(spanLocation);

    if (!entry.hasOwnProperty("recurringEventId")) {
        tdDetails.appendChild(document.createElement("br"));
        var spanDetails = document.createElement("span");
        spanDetails.innerHTML = entry.description;
        tdDetails.appendChild(spanDetails);
        table.className = table.className + " special";
    }

    tr.appendChild(tdDetails);

    return table;
}

function printWeek(thisDay, title, events, fragment) {

    var h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(title));
    fragment.appendChild(h2);

    var now = new Date();
    for (var i = 1; i < 6; i++) {
        var h4 = document.createElement("h4");
        h4.innerHTML = formatDate(thisDay);
        if (thisDay < now.addDays(-1)) {
            h4.className = "past";
        }
        fragment.appendChild(h4);
        var eventsForDay = getEventsForDay(events, thisDay);
        var pendingEvent = false;
        for (var j = 0, jl = eventsForDay.length; j < jl; j++) {
            var entry = eventsForDay[j];

            var table = buildEventTable(entry);
            if (thisDay < now) {
                table.className = "past";
            } else {
                pendingEvent = true;
            }

            fragment.appendChild(table);
        }
        if (!pendingEvent) {
            h4.className = "past";
        }
        thisDay = thisDay.addDays(1);
    }
}

function printRegularEvents() {

    var monday = getMonday(new Date()); //.addDays(7);
    var request = gapi.client.calendar.events.list({
        "calendarId": calendarId + "@group.calendar.google.com",
        "singleEvents": true, /* required to use timeMin */
        "timeMin": monday.toISOString(),
        "orderBy": "startTime",
        //"maxResults": 10,
        //"q": "information",
        "timeMax": monday.addDays(14).toISOString()
    });
    request.execute(function(response) {

        var eventsSection = document.getElementById("regular-events");
        var fragment = document.createDocumentFragment();

        printWeek(monday, "This Week", response, fragment);

        var nextMonday = monday.addDays(7);
        printWeek(nextMonday, "Next Week", response, fragment);

        eventsSection.appendChild(fragment);


    });

}


function printSpecialEvents() {

    var monday = getMonday(new Date());
    var request = gapi.client.calendar.events.list({
        "calendarId": calendarId + "@group.calendar.google.com",
        "singleEvents": false, /* required to use timeMin */
        "timeMin": monday.addDays(14).toISOString(),
        //"orderBy": "startTime",
        //"maxResults": 20,
        //"q": "information",
        "timeMax": monday.addDays(90).toISOString()
    });
    request.execute(function(response) {

        var fragment = document.createDocumentFragment();

        var len = response.items.length;
        for (var i = 0; i < len; i++) {
            var item = response.items[i];
            if (!item.hasOwnProperty("recurringEventId") && !item.hasOwnProperty("recurrence")) {

                var t = item.start.dateTime.split(/\D/);
                var day = new Date(t[0], --t[1], t[2], t[3], t[4]);

                var table = buildEventTable(item);

                var tr = document.createElement("tr");
                tr.className = "upcoming";
                tr.innerHTML = "<th colspan=\"3\">" + formatDate(day) + "</th>";

                table.insertBefore(tr, table.firstChild);
                fragment.appendChild(table);

            }
        }
        if (fragment.childNodes) {

            var h2 = document.createElement("h2");
            h2.appendChild(document.createTextNode("Upcoming Events"));
            fragment.insertBefore(h2, fragment.firstChild);

            var eventsSection = document.getElementById("upcoming-events");
            eventsSection.appendChild(fragment);
        }


    });

}

function clientLoaded() {
    gapi.client.setApiKey(apiKey);
    gapi.client.load("calendar", "v3", function() {

        printRegularEvents();
        printSpecialEvents();


    });
}
