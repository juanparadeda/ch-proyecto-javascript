// Utilizo la API One Call API 1.0 de openweathermap.org - https://openweathermap.org/api/one-call-api

// También dentro de openweathermap.org , voy a usar la API Geocoding, para convertir las coordenadas de latitud y longitud, en locaciones reconocibles. Como esta API devuelve al país en su código (AR para Argentina, por ejemplo), también tengo que usar el constructor IntlDisplayNames() para convertir esos códigos en nombres de país

// Al hacer click sobre cada card, se muestran sugerencias de técnica fotográfica y productos sugeridos según si llueve, hay mucho sol, etc.

//Para obtener la ubicación, uso la web API Geolocation https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API .

///////////////////////////// -------------------------- ///////////////////////////


// locationSuccess llama a dos funciones. fetchWeather va a llamar a la API del clima para traer el pronóstico del tiempo para esas coordenadas. getLocationReadable va a llamar a la API de Geocoding para convertir las coordenadas a una locación leíble por seres humanos
const locationSuccess = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    fetchWeather(lat, long);
    getLocationReadable(lat, long);
}


// locationError también llama a fetchWeather, pero le pasa directamente las coordenadas de Buenos Aires, y muestra un mensaje de error en pantalla
const locationError = () => {
    const lat = -34.603722;
    const long = -58.381592;
    fetchWeather(lat, long);
    document.getElementById('yourLocation').innerHTML = `<h4>Ooops! No podemos determinar tu ubicación.</h4><h5>Te mostramos el clima para Ciudad de Buenos Aires, Argentina</h5>`
}



// fetchWeather recibe latitud y longitud como parámetros. Llama a la One Call API de openweathermap y del json que me devuelve, sólo uso el array daily. Ese array lo guardo en  la variable global weatherArray, porque luego lo voy a utilizar sincrónicamente en weatherTips.js . Ahora lo uso para generar las weather cards en generateWeatherCards y genero el HTML con los tips para el día de hoy [0] en la función generateWeatherTips
let weatherArray = [];
const fetchWeather = (latitude,longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,current&lang=sp&units=metric&appid=67a27983b66e525b5d30f8b16cd31277`)
    .then((result) => result.json())
    .then((json) => {
        weatherArray = json.daily;
        generateWeatherCards(weatherArray);
        generateWeatherTips(weatherArray[0]);
    })
}


// Este constructor se utiliza para convertir el código de país en el nombre. Por ejemplo, convierte 'AR' en 'Argentina'. 
const countryNames = new Intl.DisplayNames(
    ['es'], {type: 'region'}
);


// Esta función toma la latitud y longitud, obtiene la información de la región. Luego utiliza el constructor de arriba para obtener el nombre del país
const getLocationReadable = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=67a27983b66e525b5d30f8b16cd31277`)
    .then((result) => result.json())
    .then((json) => {
        document.getElementById('yourLocation').innerHTML = `<h4>Tu ubicación actual:<h4><h5>` + json[0].name + `, ` + countryNames.of(json[0].country) + `</h5>`;
    });
}


// Esta es la función que va a recibir el array que voy a usar de lo que devuelve la API One Call. Guarda los datos que voy a usar en variables, y genera una card por cada item del array, que trae la información del clima para el día actual + 7 días.
const generateWeatherCards = (weatherMapAPIArray) => {
    let HTML = ``;
    weatherMapAPIArray.forEach((day, i) => {
        const parsedDate = luxon.DateTime.fromSeconds(day.dt);
        const weekDay = parsedDate.setLocale('es').toLocaleString({ weekday: 'long' });
        const dayNumber = parsedDate.setLocale('es').toLocaleString({ month: 'numeric', day: 'numeric' });
        const clouds = day.clouds;
        const parsedSunrise = luxon.DateTime.fromSeconds(day.sunrise);
        const parsedSunset = luxon.DateTime.fromSeconds(day.sunset);
        const sunriseTime = parsedSunrise.toLocaleString(luxon.DateTime.TIME_24_SIMPLE);
        const sunsetTime = parsedSunset.toLocaleString(luxon.DateTime.TIME_24_SIMPLE);
        const probRain = Math.round(day.pop * 100);
        const icon = day.weather[0].icon;
        HTML += `<div class="weatherCard" onclick="generateWeatherTips(weatherArray[${i}])">
         <h5>${weekDay}</h5>
         <h5>${dayNumber}</h5>
         <img src='http://openweathermap.org/img/wn/${icon}@2x.png'>
         <h6>Nubosidad: ${clouds}%</h6>
         <h6>Prob. lluvias: ${probRain}%</h6>
         <h6>Amanecer: ${sunriseTime}</h6>
         <h6>Atardecer: ${sunsetTime}</h6>
     </div>`;
        document.getElementById('weatherCardsContainer').innerHTML = HTML;
    })
}


// Acá utilizo la API de geolocation para obtener las coordenadas actuales (latitud y longitud). Si la obtiene, ejecuta locationSuccess (la primera función en este archivo js), si hay error, ejecuta locationError. Para opciones uso solamente 5 segundos de timeout.
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {timeout : 5000} )
