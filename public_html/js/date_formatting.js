/**
 * Adds a leading zero to a single-digit number.  Used for displaying dates.
 */
function padNumber(num) {
    if (num <= 9) { return "0" + num; }
    return num;
}


function formatDate(d) {
    var d_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    var curr_day = d.getDay();
    var curr_date = d.getDate();
    var sup = "";
    if (curr_date == 1 || curr_date == 21 || curr_date ==31) { sup = "st"; }
      else if (curr_date == 2 || curr_date == 22) { sup = "nd"; }
      else if (curr_date == 3 || curr_date == 23) { sup = "rd"; }
      else { sup = "th"; }

    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();

    return d_names[curr_day] + ", " + m_names[curr_month] + " " + curr_date + "<sup>" + sup + "</sup>";
}


// Override only if native toISOString is not defined
if (!Date.prototype.toISOString) {
    // Here we rely on JSON serialization for dates because it matches
    // the ISO standard. However, we check if JSON serializer is present
    // on a page and define our own .toJSON method only if necessary
    if (!Date.prototype.toJSON) {
        Date.prototype.toJSON = function (key) {
            function f(n) {
                // Format integers to have at least two digits.
                return n < 10 ? '0' + n : n;
            }

            return this.getUTCFullYear()   + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z';
        };
    }
    Date.prototype.toISOString = Date.prototype.toJSON;
}
