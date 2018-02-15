function copyCal() {
  var now = new Date();
  var start = new Date(now.getTime() - (604800*1000*52)); 
  var end = new Date(now.getTime() + (604800*1000*52));
  var srcCal = CalendarApp.getCalendarById("srcCal");
  var destCal = CalendarApp.getCalendarById("destCal");
  var events = srcCal.getEvents(start, end);
  var oldEvents = destCal.getEvents(start, end);
 
  for(var i in oldEvents){
    var deletEvent = oldEvents[i].deleteEvent();
  }
  
  for(var i in events){
    var string = events[i].getDescription()
    if(string.indexOf("Raum")>0){
      var raumIndex = string.indexOf("Raum");
      var standortIndex = string.indexOf("Standort");
      var raum = string.slice(raumIndex+12, standortIndex);
      var standort = string.slice(standortIndex+17) + " ";
    }
    
    raum = raum || "";
    standort = standort || "";
    
   var copyEvents = destCal.createEvent(events[i].getTitle(), events[i].getStartTime(), events[i].getEndTime(),{location: standort + raum}).setDescription(events[i].getDescription());
  }
  
  changeColor();
}


function changeColor(){
  var now = new Date();
  var start = new Date(now.getTime() - (604800*1000*52)); 
  var end = new Date(now.getTime() + (604800*1000*52));
  var destCal = CalendarApp.getCalendarById("destCal");
  var destEvents = destCal.getEvents(start, end); 
  
  for(var i in destEvents){
    if(destEvents[i].getTitle().indexOf("Klausur") == 0){
      var color = destEvents[i].setColor(CalendarApp.EventColor.GREEN);
    }
  }
}
