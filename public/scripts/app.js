$(document).ready(function(){
  // var trucks =[]
  $.ajax({
        method: 'GET',
        url: '/profileAll',
        success: function(alltrucks){

          function initMap() {
            console.log(alltrucks.profile.length)
            var map = new google.maps.Map(document.getElementById('googleMap'), {
              zoom: 12,
              center: {lat: 37.77, lng: -122.44}
            });
            var geocoder = new google.maps.Geocoder();
            geocodeAddress(geocoder, map);
          }

          function geocodeAddress(geocoder, resultsMap) {
            var locationHidden = 0
            for(i=0; i<alltrucks.profile.length; i++){
            console.log("location: "+alltrucks.profile[i].location)
            var address = alltrucks.profile[i].location
              // if(marker) {
              //   marker.setMap(null);
              // }
            geocoder.geocode({'address': address}, function(results, status) {
              if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location
                });
              } else {
                locationHidden++
                console.log(locationHidden + " foodtruck currently unactive")
              }
            });

            }
          }
          initMap();

      }
    })




    // var marker = new google.maps.Marker({
    //         position: myLatLng,
    //         map: map,
    //         title: 'Hello World!'
    //     });
    // var geocoder = new google.maps.Geocoder();

    // document.getElementById('submit').addEventListener('click', function() {
    // $('#submit').on('click', function() {
    //   geocodeAddress(geocoder, map);
    // });



})
