class Product {
    constructor (name, id, brand, category, description, price, stock, image, amountInCart){
        this.name = name;
        this.id = id;
        this.brand = brand;
        this.category = category;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.amountInCart = amountInCart;
    };
}



const FUJIXT30 = new Product(
    'Cámara Fujifilm X-T30',
    'FUJIXT30',
    'fuji',
    ['mirrorless', 'camara', 'apsc'],
    'Cámara mirroless con formato APS-C, crop. Liviana y de tamaño muy pequeño. Ideal para viajes y fotografía callejera. Por sus dimensiones reducidas, es ideal para contextos inseguros, pues llama muy poco la atención. Con la nueva montura X de Fuji, ahora podés intercambiar los lentes de tu cámara mirrorless.',
    200000,
    5,
    'images/X-T30_Silver_Front.webp',
    0
);


const CANONEOS80D = new Product(
    'Cámara Canon EOS 80D',
    'CANONEOS80D',
    'canon',
    ['camara', 'reflex', 'apsc'],
    'Cámara reflex con formato APS-C, crop. Peso medio y tamaño considerable. Tiene versatilidad para utilizarse tanto en estudio como en viajes y fotografía de calle.',
    592000,
    10,
    'images/canon-eos-80d-frontal.jpg',
    0
);
const CANONEOSR5 = new Product(
    'Cámara Canon EOS R5',
    'CANONEOSR5', 
    'canon',
    ['camara','mirrorless', 'apsc'],
    'Cámara mirrorless con formato APS-C, crop. Canon se mete de lleno en el territorio de mirrorless con esta excelente cámara de fotos. Ahora podés tener una cámara mirrorless compatible con todos los accesorios Canon originales: lentes montura R, flashes, radios y todo el equipamiento de estudio compatible con Canon.',
    980000,
    2,
    'images/canon-EOS-R5.jpg',
    0
);
const NIKOND850 = new Product(
    'Cámara Nikon D850',
    'NIKOND850',
    'nikon',
    ['camara', 'reflex', 'ff'],
    'Cámara reflex de formato completo full-frame. La nave insignia de Nikon con sensor de 24x36mm. Excelente relación de ruido en ISO hasta 25600. Perfecta para profesionales de la fotografía de estudio, eventos sociales y moda.',
    1120000,
    6,
    'images/nikon-d850.jpg',
    0
);
const NIKONZ9 = new Product(
    'Cámara Nikon Z9',
    'NIKONZ9',
    'nikon',
    ['camara', 'mirrorless', 'ff'],
    'Cámara sin espejo mirrorless de formato completo full-frame. Altísima velocidad de ráfaga (hasta 20 frames por segundo en raw y 30 en jpg) y múltiples funcionalidades de conectividad. Grabación de video en 8K. La cámara Nikon Z9 es sin dudas la primera cámara mirrorless que produce Nikon orientada al segmento profesional.',
    1100000,
    7,
    'images/nikon-z9.jpg',
    0
);



const FUJIXT4 = new Product(
    'Cámara Fujifilm X-T4',
    'FUJIXT4',
    'fuji',
    ['camara', 'mirrorless', 'apsc'],
    'Cámara sin espejo mirrorless de formato APS-C. Es una cámara muy versátil con buenas capacidades tanto para fotografía como videografía. Su sensor APS-C de 26.1MP CMOS 4 permite grabación de video en 4K a 60fps, sensibilidad ISO en el rango de 160 a 12800 y disparos en ráfaga hasta 15 disparos por segundo',
    1100000,
    2,
    'images/fujifilm-xt4.jpg',
    0
);

const CANON2470 = new Product(
    'Lente Canon EF 24-70mm f/2.8L II USM',
    'CANON2470',
    'canon',
    ['lente', 'zoom', 'ff', 'apsc'],
    'Excelente objetivo de alta gama de la serie L de Canon. Distancia focal de 24 a 70mm (equivalente a 38.4 a 112mm si se utiliza en cámaras con sensor APSC. Con apertura máxima de f/2.8 , te va a permitir usar velocidades de obturación muy rápidas y sensibilidades bajas, maximizando la nitidez y minimizando el grano del sensor de tu cámara. Incluye parasol original Canon.',
    529000,
    4,
    'images/canon2470.jpg',
    0
);

const CANON50 = new Product(
    'Lente Canon EF 50mm f/1.4 USM',
    'CANON50',
    'canon',
    ['lente', 'prime', 'ff', 'apsc'],
    'Robustísimo y versátil lente fijo Canon. Ágil para fotografía callejera, paisajes, nocturnas y astrofotografía. Su amplísima apertura máxima de f/1.4 genera un bokeh hermoso, de nivel cinematográfico. El sistema de enfoque USM super silencioso y veloz, te va a permitir sumarle agilidad a tus tomas espontáneas en eventos sociales, fotografía callejera, y deportiva',
    80000,
    12,
    'images/canon50.jpg',
    0
);
const NIKON35 = new Product(
    'Lente Nikon AF-S DX 35mm f/1.8G',
    'NIKON35',
    'nikon',
    ['lente', 'fijo', 'ff', 'apsc'],
    'Enamorate de las capacidades de uso general del AF-S DX 35mm f/1.8G. Como un artículo de primera necesidad para los fotógrafos con DSLR de formato DX, este lente fijo, compacto y ligero le permitirá capturar imágenes asombrosas independientemente de su nivel de habilidad. La distancia focal de 35mm es ideal para lograr un ángulo de visión "natural". Con una apertura rápida de f/1.8, podrá hacer foco en los sujetos de forma nítida y crear imágenes con hermosos fondos difuminados, incluso en condiciones de poca luz',
    42500,
    2,
    'images/nikon35.webp',
    0
);

const FUJI1655 = new Product(
    'Lente Fujifilm XF 16-55mm f/2.8 R LM WR',
    'FUJI1655',
    'fuji',
    ['lente', 'zoom', 'apsc'],
    'Un objetivo zoom resistente a las inclemencias del tiempo con una abertura constante de F2.8 en las longitudes focales equivalente a 24 mm en gran angular hasta 84 mm en teleobjetivo medio, el XF 16-55 mm promete ofrecer imágenes de extraordinaria nitidez incluso con aberturas amplias en toda la gama del zoom',
    235000,
    3,
    'images/fuji1655.webp',
    0
);

const MANBEFREE = new Product(
    'Trípode Manfrotto Befree Advanced',
    'MANBEFREE',
    'manfrotto',
    ['accesorio'],
    'Con una capacidad de carga de 8kg y un peso de tan solo 1.5kg, este trípode de viaje Befree avanzado negro de Manfrotto es una opción de soporte robusta que puede servir como un compañero de viaje conveniente tanto para fotógrafos profesionales como para aficionados apasionados',
    38900,
    3,
    'images/manfrottobefree.jpg',
    0
);
const EWAUA100 = new Product(
    'Compartimento Estanco Ewa-Marine U-A100',
    'EWAUA100',
    'ewamarine',
    ['accesorio'],
    'Ewa Marine, el fabricante original de compartimentos estancos ha sido un innovador de la industria, confiado por organizaciones como Disney, y los militares estadounidenses para proteger sus equipos de fotografía y video durante más de 45 años. Con este compartimento totalmente sellado, podés llevar la cámara al hacer fotos bajo tormenta intensa, surf y buceo hasta 2m de profundidad. Es fácil operar la cámara ya que sus diversos componentes y botones pueden ser operados a través del PVC. El U-A está diseñado para adaptarse a casi todas las cámaras SLR comunes del mercado hoy en día, independientemente del fabricante o modelo',
    59000,
    2,
    'images/ewaua100.jpg',
    0
);

const catalog = [FUJIXT30, CANON50, MANBEFREE, CANONEOS80D, FUJI1655, CANONEOSR5, NIKON35, NIKOND850, EWAUA100, CANON2470, NIKONZ9, FUJIXT4]; // Catálogo de productos completo.
//const catalog = [FUJIXT30, FUJIXT31, FUJIXT32, FUJIXT33]


// Esta es la función que actualiza el amountInCart de los productos del catálogo según los cambios en la cart
const updateCatalog = () => {
    cart.forEach(productInCart => {
        catalog.find(product => product.id == productInCart.id).amountInCart = productInCart.amountInCart;
    })
}