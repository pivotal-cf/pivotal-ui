# Maps

## Examples

```html
::Example
::description=Full width map with marker at Pivotal Labs SF location, and an optional informational overlay.
<div class='map-wrapper'>
  <div class='pane'>
    <div class='container pan'>
      <div class='row'>
        <div class='col-sm-6 col-md-8 col-sm-offset-1'>
          <div class='map-overlay panel panel-basic bg-neutral-10'>
            <div class='panel-body paxxl'>
              <h3 class="h2">Location</h3>
              <address class='h4 pvl'>Pivotal Software Inc.<br>
                875 Howard Street<br>
                San Francisco, CA 94103
              </address>
              <p class='h4'>Support: <a href='mailto:support@run.pivotal.io'>support@run.pivotal.io</a></p>
              <p class='h4'>Twitter: <a href='https://twitter.com/pivotalws'>@pivotalws</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class='pane pane-map'>
    <div class='labs-map' id='my-google-map'></div>
  </div>
</div>
```

```js
::title=JavaScript for example
::noToolbar

const mapOptions = {
  placeId: "ChIJ9w1pfYiAhYAR45k8AD-TjhA",
  center: new google.maps.LatLng(37.781787, -122.403911),
  mapElementClass: 'labs-map',
  mapElementId: 'my-google-map',
  zoom: 18
};

let map;

class Maps {
  initialize() {
    map = new google.maps.Map(document.getElementById(mapOptions.mapElementId), {
      center: mapOptions.center,
      zoom: mapOptions.zoom,
      disableDefaultUI: true
    });

    const request = {
      placeId: mapOptions.placeId
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, createMarker);
  }
}

const createMarker = (place, status) => {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    new google.maps.Marker({
      map,
      position: place.geometry.location
    });
  }
};

const maps = new Maps();

const intervalId = setInterval(() => {
  if (!window['my-google-map']) return;
  clearInterval(intervalId);
  maps.initialize();
}, 100);

<div/>;
```

## Installation & Usage

`npm install pui-css-google-maps --save`
