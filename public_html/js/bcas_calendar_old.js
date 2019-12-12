/* Loads the Google data JavaScript client library */
google.load("gdata", "2.x");

function init() {
  // init the Google data JS client library with an error handler
  google.gdata.client.init(handleGDError);
  // Load the BCAS calendar
  loadCalendarByAddress('bc3nqdvipkubbn09u2j09o85c4%40group.calendar.google.com');
}

/**
 * Determines the full calendarUrl based upon the calendarAddress
 * argument and calls loadCalendar with the calendarUrl value.
 *
 * @param {string} calendarAddress is the email-style address for the calendar
 */
function loadCalendarByAddress(calendarAddress) {
  var calendarUrl = 'https://www.google.com/calendar/feeds/' +
                    calendarAddress +
                    '/public/full';
  loadCalendar(calendarUrl);
}

/**
 * Uses Google data JS client library to retrieve a calendar feed from the specified
 * URL.  The feed is controlled by several query parameters and a callback
 * function is called to process the feed results.
 *
 * @param {string} calendarUrl is the URL for a public calendar feed
 */
function loadCalendar(calendarUrl) {
  var service = new
      google.gdata.calendar.CalendarService('gdata-js-client-samples-simple');
  var query = new google.gdata.calendar.CalendarEventQuery(calendarUrl);
  query.setOrderBy('starttime');
  query.setSortOrder('ascending');
  query.setFutureEvents(true);
  query.setSingleEvents(true);
  query.setMaxResults(10);

  service.getEventsFeed(query, listEvents, handleGDError);
}

/**
 * Callback function for the Google data JS client library to call when an error
 * occurs during the retrieval of the feed.  Details available depend partly
 * on the web browser, but this shows a few basic examples. In the case of
 * a privileged environment using ClientLogin authentication, there may also
 * be an e.type attribute in some cases.
 *
 * @param {Error} e is an instance of an Error
 */
function handleGDError(e) {
  document.getElementById('jsSourceFinal').setAttribute('style',
      'display:none');
  if (e instanceof Error) {
    /* alert with the error line number, file and message */
    alert('Error at line ' + e.lineNumber +
          ' in ' + e.fileName + '\n' +
          'Message: ' + e.message);
    /* if available, output HTTP error code and status text */
    if (e.cause) {
      var status = e.cause.status;
      var statusText = e.cause.statusText;
      alert('Root cause: HTTP error ' + status + ' with status text of: ' +
            statusText);
    }
  } else {
    alert(e.toString());
  }
}

/**
 * Callback function for the Google data JS client library to call with a feed
 * of events retrieved.
 *
 * Creates an unordered list of events in a human-readable form.  This list of
 * events is added into a div called 'events'.  The title for the calendar is
 * placed in a div called 'calendarTitle'
 *
 * @param {json} feedRoot is the root of the feed, containing all entries
 */
function listEvents(feedRoot) {
  var entries = feedRoot.feed.getEntries();
  var eventsSection = document.getElementById('events');

  var fragment = document.createDocumentFragment();

  /* loop through each event in the feed */
  var len = entries.length;
  for (var i = 0; i < len; i++) {
    var entry = entries[i];
    console.log(entry);

    var title = entry.getTitle().getText();
    var content = entry.getContent().getText();
    var location = entry.getLocations()[0].getValueString();

    var startDateTime = null;
    var startJSDate = null;
    var times = entry.getTimes();
    if (times.length > 0) {
      startDateTime = times[0].getStartTime();
      startJSDate = startDateTime.getDate();
    }

    var section = document.createElement('section');
    section.className = 'event';

    var header = document.createElement('header');
    header.className = 'clearfix';
    section.appendChild(header);

    var h4 = document.createElement('h3');
    h4.appendChild(document.createTextNode(title));
    header.appendChild(h4);

    var spanDate = document.createElement('span');
    spanDate.innerHTML = formatDate(startJSDate);
    header.appendChild(spanDate);

    if (!startDateTime.isDateOnly()) {
        var spanTime = document.createElement('span');
        spanTime.appendChild(document.createTextNode(startJSDate.getHours() + ":" + padNumber(startJSDate.getMinutes())));
        header.appendChild(spanTime);
    }

    var spanLocation = document.createElement('span');
    spanLocation.className = 'loc';
    spanLocation.appendChild(document.createTextNode(location));
    header.appendChild(spanLocation);

    var pContent = document.createElement('pre');
    pContent.innerHTML = content;
    section.appendChild(pContent);

    fragment.appendChild(section);
  }
  eventsSection.appendChild(fragment);
}

google.setOnLoadCallback(init);
