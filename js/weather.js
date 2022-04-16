// Utilizo la API One Call API 1.0 de openweathermap.org - https://openweathermap.org/api/one-call-api

// También dentro de openweathermap.org , voy a usar la API Geocoding, para convertir las coordenadas de latitud y longitud, en locaciones reconocibles. Como esta API devuelve al país en su código (AR para Argentina, por ejemplo), también tengo que usar el constructor IntlDisplayNames() para convertir esos códigos en nombres de país

//La idea para la entrega final, es mostrar el pronóstico del tiempo. Y dar sugerencias de técnica fotográfica y productos sugeridos según si llueve, hay mucho sol, frío extremo, etc. Para esta entrega de desafío, sólo muestro el pronóstico del tiempo según la ubicación actual del usuario. 

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

const publishSunnyTip = () => {
    return (`<div class="weatherTip">
                <h4>¡Mucho sol!</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/sunny.jpg" alt="clear sky image"></div>
                    <div class="weatherTxt">
                        <p>Los días de sol pleno, proyectan sombras muy duras, generando altos contrastes. Estos contrastes suelen no ser bien capturados por el rango dinámico de las cámaras digitales. Te aconsejamos que aproveches la hora previa y posterior al amanecer y al atardecer. La claridad previa al amanecer y posterior al atardecer, genera luces frías, que generan un contraste de color interesante con el fondo más rojizo del cielo. Luego del amanecer o antes del atardecer, la luz solar suave y cálida es la mejor aliada de tus fotos con luz natural.</p>
                        <p>Si así y todo decidís salir a sacar fotos con el sol cerca del cenit, podés utilizar difusores para suavizar la luz solar, y filtros polarizadores para mejorar la saturación del color del cielo</p>
                    </div>
                </div>
            </div>`);
}

const publishFewClouds = () => {
    return (`<div class="weatherTip">
                <h4>Nubosidad muy leve</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/fewclouds.jpg" alt="few clouds"></div>
                    <div class="weatherTxt">
                        <p>Una nubosidad leve no te va a ayudar mucho a eliminar los contrastes duros de la luz del sol cuando está alto. En estos días, lo mejor va a ser como en los días de pleno sol, aprovechar la luz suave del sol muy bajo. Esto es, cerca del amanecer y del atardecer.</p>
                        <p>De todos modos, algunas pocas nubes pueden ayudarte a adornar el cielo azul, y la misma sombra de las nubes, puede proyectar formas interesantes sobre tus paisajes a pleno sol. Podés aprovechar un filtro polarizador para lograr saturar mejor los colores del cielo, o una pantalla difusora para emparejar la luz de tus sujetos, o bien reflejar la luz solar directa para rellenar las sombras duras</p>
                    </div>
                </div>
            </div>`);
}

const publishClouds = () => {
    return (`<div class="weatherTip">
                <h4>Nubosidad alta</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/clouds.jpg" alt=" clouds"></div>
                    <div class="weatherTxt">
                        <p>Los fotógrafos amamos los cielos muy nublados. Por un lado, la iluminación es muy pareja y no se presentan dificultades de exposición, al estar casi todo el escenario con similar intensidad de luz. Además, cielos tormentosos pueden generar ambientes muy dramáticos</p>
                        <p>A veces puede suceder que si las nubes forman una capa gris clara muy lisa, se hace muy poco interesante. En estos casos, es mejor no incluir al cielo en nuestras imágenes, y aprovechar la iluminación para fotografías más íntimas: retratos, fotografía macro, o arquitectura</p>
                    </div>
                </div>
            </div>`);
}

const generateWeatherTips = (weatherDay) => {
    HTML = '';
    weatherDay.clouds < 11 ? HTML += publishSunnyTip() : false ;
    weatherDay.clouds >= 11 && weatherDay.clouds < 25 ? HTML += publishFewClouds() : false;
    weatherDay.clouds >= 25 ? HTML += publishClouds() : false;
    document.getElementById('weatherTips').innerHTML = HTML;
}

// fetchWeather recibe latitud y longitud como parámetros. Llama a la One Call API de openweathermap y del json que me devuelve, sólo uso el array daily, y se lo paso a la función generateWeatherCards
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
        const tempMin = Math.round(day.temp.min);
        const tempMax = Math.round(day.temp.max);
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
         <h6>Temp mínima: ${tempMin} °C</h6>
         <h6>Temp máxima: ${tempMax} °C</h6>
         <h6>Amanecer: ${sunriseTime}</h6>
         <h6>Atardecer: ${sunsetTime}</h6>
     </div>`;
        document.getElementById('weatherCardsContainer').innerHTML = HTML;
    })
}


// Acá utilizo la API de geolocation para obtener las coordenadas actuales (latitud y longitud). Si la obtiene, ejecuta locationSuccess (la primera función en este archivo js), si hay error, ejecuta locationError. Para opciones uso solamente 5 segundos de timeout.
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {timeout : 5000} )