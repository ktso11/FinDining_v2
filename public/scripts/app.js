$(document).ready(function(){
  var googleMap = $('.googleMap');
  var searchInput
  var infowindow = null;
  var geocoder;
  var map;
  var trucklist = []
  var truckListUI = $("#trucks");
  var moreInfo = $("#hide");

  truckListUI.hide();
  googleMap.hide();
  moreInfo.hide();



  $.ajax({
      method: 'GET',
      url: '/api/profileLocations',
      success: function(alltrucks){
        initMap(alltrucks);
        for(j = 0; j < alltrucks.profile.length; j++){
        var alltruck = alltrucks.profile[j];
        $("#trucks").append(
          `<div class="truck-container" id='${alltruck._id}' href='${alltruck.location}'>
            <div>
              <img class="truck-img text-center" src="https://ktso11.github.io/FinDining_v2/public/assets/truck-1.png">
            </div>
            <div>
              <ul>
                <li id="truck-name"> <b>Name: </b> ${alltruck.truckname} </li>
                <li id="truck-type"> <b>Type: </b> ${alltruck.foodtype} </li>
                <li id="truck-address"> ${alltruck.location} </li>
              </ul>
            </div>
          </div>`);
        }

        $('.truck-container').on('click', function(){
          var selectedTruck = $(this).clone()
          moreInfo.show();
          $('input[name=address]').val($(this).attr('href'))
          $('#selected-truck').html(selectedTruck)
          $(selectedTruck).css("border", ".2em solid var(--brand-orange)")
          getInput();

        })
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
              id: trucks._id,
              html: '<div class="markerWindow">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h2>'+trucks.truckname +'</h2>'+
                      '<div id="bodyContent">'+
                      '<p>'+ trucks.location +'</p>'+
                      '</div>'+
                      '</div>'
          });
          google.maps.event.addListener(marker, "click", function () {
              infowindow.setContent(this.html);
              infowindow.open(map, this);
              moreInfo.show();
              var id = this.id
              var clickedTruck = $('#'+id).clone()
              $('#selected-truck').html(clickedTruck)
              clickedTruck.css("border", ".2em solid var(--brand-orange)")


          });
          // marker.addListener('mouseover', function() {
          //
          // });
      } else {
          alert("Geocode was not successful for the following reason: " + status);
            }
        });
      }

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
          map.setZoom(18);

        } else {
          console.log("cannot geocode this string")
        }
      })
    }

    $('.listLink').on('click', function(){
      truckListUI.show()
    })




})
