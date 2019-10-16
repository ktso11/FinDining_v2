$(document).ready(function(){
  var infowindow = null;
  var geocoder;
  var map;

  $.ajax({
        method: 'GET',
        url: '/api/profileLocations',
        success: function(alltrucks){
          initMap();
          function initMap() {
            map = new google.maps.Map(document.getElementById('googleMap'), {
              zoom: 12,
              center: {lat: 37.77, lng: -122.44}
            });

            setMarkers(map, alltrucks);

            infowindow = new google.maps.InfoWindow({
              content: "loading"
            });
          }

          function setMarkers(map, trucks){
            console.log("this is trucks: " + trucks)
            for(i=0; i<trucks.profile.length; i++){
              setMarker(map, trucks.profile[i])
            }
          }

          function setMarker(map, trucks){

            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': trucks.location }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);

                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    html: '<div id="content">'+
                            '<div id="siteNotice">'+
                            '</div>'+
                            '<h2>'+trucks.truckname +'</h2>'+
                            '<div id="bodyContent">'+
                            '<p>'+ trucks.foodtype +'</p>'+
                            '</div>'+
                            '</div>'
                });

                google.maps.event.addListener(marker, "click", function () {
                    infowindow.setContent(this.html);
                    infowindow.open(map, this);
                });
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
                  }
              });
            }


          // function geocodeAddress(geocoder, resultsMap) {
          //   var locationHidden = 0
          //   for(i=0; i<alltrucks.profile.length; i++){
          //     // if(alltrucks.profile[i].location != undefined ){
          //     // console.log("location: "+alltrucks.profile[i].location)
          //       var address = alltrucks.profile[i].location
          //       var business =  alltrucks.profile[i].truckname
          //       var type = alltrucks.profile[i].foodtype
          //       var contentString = '<div id="content">'+
          //         '<div id="siteNotice">'+
          //         '</div>'+
          //         '<h1 id="firstHeading" class="firstHeading">'+ business +'</h1>'+
          //         '<div id="bodyContent">'+
          //         '<p>'+ type +'</p>'+
          //         '</div>'+
          //         '</div>';
          //
          //       geocoder.geocode({'address': address}, function(results, status) {
          //         if (status === 'OK') {
          //           console.log("results: " + JSON.stringify(results))
          //           console.log("business is: " + business)
          //           console.log("address is: "+ address)
          //           console.log("type is: "+ type)
          //
          //           resultsMap.setCenter(results[0].geometry.location);
          //           console.log("results[0].geometry.location: " + results[0].geometry.location)
          //           var marker = new google.maps.Marker({
          //             map: resultsMap,
          //             position: results[0].geometry.location
          //             // title: 'business'
          //           });
          //
          //           marker.addListener('click', function() {
          //             infowindow.open(resultsMap, marker);
          //           });
          //
          //
          //
          //         } else {
          //           locationHidden++
          //           console.log(locationHidden + " foodtruck currently unactive")
          //         }
          //       });
          //     // }
          //   }
          // }


      }
    })




})
