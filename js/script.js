var url = 'http://api.openweathermap.org/data/2.5/weather?q='; 
  key = '&APPID=97c677c78c63efd0792e76f5738281b8';
  tempC = '';
  tempF = '';
  unitC = '';
  unitF = '';
  cityName = '';
        
function changeUnit() {
  $('#F').click(function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');  
      $('#C').removeClass('active');    
    }
    $('#temp').html(tempF);
  });

  $('#C').click(function() {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');  
      $('#F').removeClass('active');
    }
    $('#temp').html(tempC);
  });
}

function getWeather() {
  cityName = $('#city-name').val();
  cityName = (!cityName.length) ? 'London' :  $('#city-name').val();
  $.ajax({url: url + cityName + '&units=metric' + key, method: 'GET', success: showWeather});
}

$('#city-name').keyup(function(e) {
  if (e.which === 13) {
    getWeather();    
  };
});
    
function showWeather(resp) {
  $.ajax({url: url + cityName + '&units=imperial' + key, method: 'GET', success: getTempF});
  var iconCode = resp.weather[0].id;
  tempC = resp.main.temp + '&deg;C';  
  $('h1').html(resp.name);
  $('#description').html(resp.weather[0].description);
  $('#icon').attr('class', 'owf owf-4x owf-' + iconCode);
  if ($('#C').hasClass('active')) {
      $('#temp').html(tempC);
  }
  changeUnit();
};

function getTempF(resp) {
  tempF = resp.main.temp + '&deg;F';
  if ($('#F').hasClass('active')) {
    $('#temp').html(tempF);
  }
}
  
changeUnit();