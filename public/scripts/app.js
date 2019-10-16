$(document).ready(function(){
  $.ajax({
        method: 'GET',
        url: '/api/profileLocations',
        success: function(alltrucks){

          function initMap() {
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
              // if(alltrucks.profile[i].location != undefined ){
              // console.log("location: "+alltrucks.profile[i].location)
                var address = alltrucks.profile[i].location
                var business =  alltrucks.profile[i].truckname
                var type = alltrucks.profile[i].foodtype
                var contentString = '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h1 id="firstHeading" class="firstHeading">'+ business +'</h1>'+
                  '<div id="bodyContent">'+
                  '<p>'+ type +'</p>'+
                  '</div>'+
                  '</div>';

                geocoder.geocode({'address': address}, function(results, status) {
                  if (status === 'OK') {
                    console.log("results: " + JSON.stringify(results))
                    console.log("business is: " + business)
                    console.log("address is: "+ address)
                    console.log("type is: "+ type)

                    resultsMap.setCenter(results[0].geometry.location);
                    console.log("results[0].geometry.location: " + results[0].geometry.location)
                    var marker = new google.maps.Marker({
                      map: resultsMap,
                      position: results[0].geometry.location
                      // title: 'business'
                    });

                    marker.addListener('click', function() {
                      infowindow.open(resultsMap, marker);
                    });

                    var infowindow = new google.maps.InfoWindow({
                      content: contentString
                    });

                  } else {
                    locationHidden++
                    console.log(locationHidden + " foodtruck currently unactive")
                  }
                });
              // }
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
