// Acá agrupo todos los tips fotográficos según el clima 

const publishSunnyTip = () => {
    const sunProducts = filterCategory(catalog, 'iluminacion').concat(filterCategory(catalog, 'filtro'));
    let sunnyHTML = `<div class="weatherTip">
                <h4>¡Mucho sol!</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/sunny.jpg" alt="clear sky image"></div>
                    <div class="weatherTxt">
                        <p>Los días de sol pleno, proyectan sombras muy duras, generando altos contrastes. Estos contrastes suelen no ser bien capturados por el rango dinámico de las cámaras digitales. Te aconsejamos que aproveches la hora previa y posterior al amanecer y al atardecer. La claridad previa al amanecer y posterior al atardecer, genera luces frías, que generan un contraste de color interesante con el fondo más rojizo del cielo. Luego del amanecer o antes del atardecer, la luz solar suave y cálida es la mejor aliada de tus fotos con luz natural.</p>
                        <p>Si así y todo decidís salir a sacar fotos con el sol cerca del cenit, podés utilizar difusores para suavizar la luz solar, y filtros polarizadores para mejorar la saturación del color del cielo</p>
                    </div>
                </div>
                <container id="cardContainer" class="productsContainer d-flex noFilter">`;  
    sunnyHTML += productCardCreator(sunProducts) + `</container></div>`;
    return sunnyHTML;
}


const publishSomeClouds = () => {
    const someCloudsProducts = filterCategory(catalog, 'tripode')
    let someCloudsHTML = `<div class="weatherTip">
                <h4>Nubosidad moderada</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/someclouds.jpg" alt="some clouds"></div>
                    <div class="weatherTxt">
                        <p>Una cantidad de nubes moderada puede ayudarte mucho a decorar el cielo. Y si además lo hacés al amanecer o atardecer, podés logar fotos de paisajes de muy alto impacto, con la luz dorada pintando las nubes de un color cálido, cuando el cielo aún mantiene los colores fríos del crepúsculo</p>
                        <p>Como es un momento de escasa luz, un trípode puede ayudarte a conseguir una buena nitidez si necesitás usar tiempos de exposición elevados. Tené en cuenta que cuando está cerca del horizonte, la posición del sol respecto de tu cámara cambia rápidamente. Vas a tener que balancear el tiempo de exposición de manera que te permita exponer bien, pero sin perder nitidez.</p>
                    </div>
                </div>
                <container id="cardContainer" class="productsContainer d-flex noFilter">`;
    someCloudsHTML += productCardCreator(someCloudsProducts) + `</container></div>`;
    return someCloudsHTML;
}
const publishFewClouds = () => {
    const fewCloudsProducts = filterCategory(catalog, 'iluminacion').concat(filterCategory(catalog, 'filtro'));
    let fewCloudsHTML = `<div class="weatherTip">
                <h4>Nubosidad muy leve</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/fewclouds.jpg" alt="few clouds"></div>
                    <div class="weatherTxt">
                        <p>Una nubosidad leve no te va a ayudar mucho a eliminar los contrastes duros de la luz del sol cuando está alto. En estos días, lo mejor va a ser como en los días de pleno sol, aprovechar la luz suave del sol muy bajo. Esto es, cerca del amanecer y del atardecer.</p>
                        <p>De todos modos, algunas pocas nubes pueden ayudarte a adornar el cielo azul, y la misma sombra de las nubes, puede proyectar formas interesantes sobre tus paisajes a pleno sol. Podés aprovechar un filtro polarizador para lograr saturar mejor los colores del cielo, o una pantalla difusora para emparejar la luz de tus sujetos, o bien reflejar la luz solar directa para rellenar las sombras duras</p>
                    </div>
                </div>
                <container id="cardContainer" class="productsContainer d-flex noFilter">`;
    fewCloudsHTML += productCardCreator(fewCloudsProducts) + `</container></div>`;
    return fewCloudsHTML;
}

const publishClouds = () => {
    const cloudsProducts = filterCategory(catalog, 'macro').concat(filterCategory(catalog, 'tripode'));
    let cloudsHTML = `<div class="weatherTip">
                <h4>Nubosidad alta</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/clouds.jpg" alt=" clouds"></div>
                    <div class="weatherTxt">
                        <p>Los fotógrafos amamos los cielos muy nublados. Por un lado, la iluminación es muy pareja y no se presentan dificultades de exposición, al estar casi todo el escenario con similar intensidad de luz. Además, cielos tormentosos pueden generar ambientes muy dramáticos</p>
                        <p>A veces puede suceder que si las nubes forman una capa gris clara muy lisa, se hace muy poco interesante. En estos casos, es mejor no incluir al cielo en nuestras imágenes, y aprovechar la iluminación para fotografías más íntimas: retratos, fotografía macro, o arquitectura</p>
                    </div>
                </div>
                <container id="cardContainer" class="productsContainer d-flex noFilter">`;
    cloudsHTML += productCardCreator(cloudsProducts) + `</container></div>`;
    return cloudsHTML;
}

const publishRain = () => {
    const rainProducts = filterCategory(catalog, 'lluvia').concat(filterCategory(catalog, 'tripode'));
    let rainHTML = `<div class="weatherTip">
                <h4>Probabilidad de lluvias</h4>
                <div class="tip">
                    <div class="weatherImg"><img src="images/rain.jpg" alt="rain"></div>
                    <div class="weatherTxt">
                        <p>¿Quién te dijo que cuando llueve no se pueden hacer fotos? La lluvia puede amedrentar al fotógrafo de smartphone. Pero a nosotros nos encanta. En la naturaleza, aprovechamos mucho las gotas depositadas en las hojas y flores, el rebote en los cuerpos de agua, y si aparecen, los relámpagos.</p>
                        <p>Es muy importante cuidar tu equipo fotográfico con un compartimento estanco. La gran mayoría de estas carcasas herméticas, soportan incluso la inmersión hasta algunos metros de profundidad, pues se usan para fotografía submarina, así que no vas a tener ningún problema al exponerlas a la lluvia, incluso bajo una tormenta. Un trípode también te va a ayudar a usar tiempos de exposición más largos, para poder capturar escenas urbanas nocturnas, y también si te interesa capturar relámpagos.</p>
                    </div>
                </div>
                <container id="cardContainer" class="productsContainer d-flex noFilter">`;
    
    rainHTML += productCardCreator(rainProducts) + `</container></div>`;
    return rainHTML;
}

const generateWeatherTips = (weatherDay) => {
    let HTML = '';
    weatherDay.pop >= 0.1 ? HTML += publishRain(): false;
    weatherDay.clouds < 11 ? HTML += publishSunnyTip() : false ;
    weatherDay.clouds >= 11 && weatherDay.clouds < 25 ? HTML += publishFewClouds() : false;
    weatherDay.clouds >= 25 && weatherDay.clouds < 50 ? HTML += publishSomeClouds() : false;
    weatherDay.clouds >= 50 ? HTML += publishClouds() : false;
    document.getElementById('weatherTips').innerHTML = HTML;
    addProductPagesLinks();
}