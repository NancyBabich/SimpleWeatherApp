const url = 'http://api.openweathermap.org/data/2.5/weather?q=',
  key = '&APPID=97c677c78c63efd0792e76f5738281b8';

let temps = {
  c: {
    temp: '',
    unit: 'c'
  },
  f: {
    temp: '',
    unit: 'f'
  }
};

const toggleClass = unit => {
  if (!$(this).hasClass('active')) {
    $(this).addClass('active');
    $(unit).removeClass('active');
  }
};

const addListeners = () => {
  const symbols = $('.temp-symbol');
  symbols.click(function() {
    const unit = $(this).data('unit');
    symbols.removeClass('active');
    $(this).addClass('active');
    $('#temp').html(temps[unit].temp);
  });

  $('#city-name').keyup(e => {
    if (e.which === 13) {
      getWeather();
    }
  });
};

const getWeather = () => {
  let cityName = $('#city-name').val();
  cityName = !cityName.length ? 'London' : $('#city-name').val(); /*if*/
  $.when(
    $.get(url + cityName + '&units=metric' + key),
    $.get(url + cityName + '&units=imperial' + key)
  ).then(function(resp1, resp2) {
    showWeather(resp1[0], resp2[0]);
  });
};

const setTemp = () => {
  let unit = $('.temp-symbol.active').data('unit');
  $('#temp').html(temps[unit].temp);
};

const showWeather = (resp1, resp2) => {
  let iconCode = resp1.weather[0].id;
  temps.c.temp = resp1.main.temp + '&deg;' + temps.c.unit.toUpperCase();
  temps.f.temp = resp2.main.temp + '&deg;' + temps.f.unit.toUpperCase();
  $('h1').html(resp1.name);
  $('#description').html(resp1.weather[0].description);
  $('#icon').attr('class', 'owf owf-4x owf-' + iconCode);
  setTemp();
};

addListeners();
