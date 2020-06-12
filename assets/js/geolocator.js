  var map,infoWindow,services;
  var geoOptions = {
     timeout: 10 * 1000
  };
  let userPosition;

function initMap() {
        bounds = new google.maps.LatLngBounds();   
        infoWindow = new google.maps.InfoWindow;
       
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {            
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 14
            });
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            getNearbyPlaces(pos);
          }, function() {
            handleLocationError(true, infoWindow);
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow);
        }
             
     
    
}
    // Handle a geolocation error
    function handleLocationError(browserHasGeolocation, infoWindow) {
        // Set default location to Cambridge, United Kingdom
        pos = {lat:52.2141579, lng: 0.147892};
        map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 14
        });

        // Display an InfoWindow at the map center
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
        currentInfoWindow = infoWindow;

    /* TODO: Step 3B3, Call the Places Nearby Search */
}
// adding nearby restaurants I will use places google   
function getNearbyPlaces(position){
    let request={
        location: position,
        raius:'500',
        type:['restaurant']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
}

//adding markers for the restaurants
function nearbyCallback(result,status){
    if(status==google.maps.places.PlacesServiceStatus.OK){
        createMarkers(results);
    }
}
createMarkers(places){
    places.forEach(place);
    function place{
        let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
        }
         //add event listener for the buttons restaurants , cafes , tourist attractions and hotels
        bounds.extend(place.geometry.location);
    };
    map.fitBounds(bounds);
}



//set an radius 
//add event listener for the buttons restaurants , cafes , tourist attractions and hotels
