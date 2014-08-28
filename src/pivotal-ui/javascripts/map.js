var maps = (function() {
  var self = this;
  var map;

  var mapOptions = {
    placeId: "ChIJ9w1pfYiAhYAR45k8AD-TjhA",
    center: new google.maps.LatLng(37.781787,-122.403911),
    mapElementId: 'labs-map',
    zoom: 18
  };

  var initialize = function() {
    map = new google.maps.Map(document.getElementById(mapOptions.mapElementId), {
      center: mapOptions.center,
      zoom: mapOptions.zoom,
      disableDefaultUI: true
    });

    var request = {
      placeId: mapOptions.placeId
    };

    var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, createMarker);
  };

  var createMarker = function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
    }
  };

  self.initialize = initialize;
  return self;
})();

google.maps.event.addDomListener(window, 'load', maps.initialize);
