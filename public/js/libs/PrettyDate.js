define([],
function() {

  var PrettyDate = {
    
    getPrettyDate: function( time ) {
        
        return this.prettyDate( time );
    },

    prettyDate: function ( time ) {

      var date            = new Date( time ),
          diff            = Math.floor((((new Date()).getTime() - date.getTime()) / 1000)),
          day_diff        = Math.floor(diff / 86400),
          regular_format  = this.formatDate( time );
          
      if ( isNaN(day_diff) || day_diff < 0 ) return;

      var dateStr = "";

      if ( day_diff == 0 ) {

            if (diff < 60) {
                dateStr = "just now";
            } else if (diff > 60 && diff < 120) {
                dateStr = "1 minute ago";
            } else if (diff > 120 && diff < 3600) {
                dateStr = Math.floor( diff / 60 ) + " minutes ago" ;
            } else if (diff > 3600 && diff < 7200) {
                dateStr = "1 hour ago" ;
            } else if (diff > 7200 && diff < 86400) {
                dateStr = Math.floor( diff / 3600 ) + " hours ago" ;
            } 

      } else {

          dateStr = regular_format;
      }
      
      return dateStr;
    },

    formatDate: function ( dateStr ) {

      var monthNames  = new Array("January", "February", "March", "April",
                                  "May", "June", "July", "August",
                                  "September", "October", "November", "December");

      var dateObj   = new Date( dateStr );
      var cDate     = dateObj.getDate();
      var cMonth    = dateObj.getMonth();
      var cYear     = dateObj.getFullYear();

      var cHour     = dateObj.getHours();
      var cMin      = dateObj.getMinutes();
      var cSec      = dateObj.getSeconds();

      return monthNames[ cMonth ] + " " + cDate + ", " + cYear + " at " +
             ( (cHour < 12) ? (cHour) : (cHour - 12) ) + ":" + 
             ( (cMin < 10) ? ("0" + cMin) : (cMin) ) + " " + ((cHour > 12) ? "pm" : "am");
    }

  };

  return PrettyDate;

});