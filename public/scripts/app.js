$(document).ready(function(){
  var googleMap = $('.googleMap');
  var searchInput
  var infowindow = null;
  var geocoder;
  var map;

  googleMap.hide();

  $.ajax({
        method: 'GET',
        url: '/api/profileLocations',
        success: function(alltrucks){
          initMap(alltrucks);
      }
    })


    function initMap(alltrucks) {
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
      for(i=0; i<trucks.profile.length; i++){
        setMarker(map, trucks.profile[i])
      }
    }

    function setMarker(map, trucks){
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': trucks.location }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              html: '<div id="markerWindow">'+
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
          marker.addListener('mouseover', function() {
              console.log("see this?")
          });

      }
      else {
          alert("Geocode was not successful for the following reason: " + status);
            }
        });
      }

    $('#markerWindow').mouseover(function() {
          console.log("can you detect this?")
      });

    $('.search-button').on('click', function(e){
      e.preventDefault();
      getInput();
    });

    $('.search-input').keypress(function() {
      if(key == 13){
        getInput();
      }
    });

    function getInput(){
      var searchAddress = $('input[name=address]').val();
      console.log("success: " + searchAddress)
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': searchAddress }, function(results, status) {
        console.log("success: " + results[0])
        if (status == google.maps.GeocoderStatus.OK) {
          searchInput = results[0].geometry.location;
          map.setCenter(searchInput);
        } else {
          console.log("cannot geocode this string")
        }
      })
    }





})
