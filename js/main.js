cardHTMLGenerator(catalog); // Publico las cards de todo el catálogo
addProductPagesLinks();

// Búsqueda
let triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProducts);
function searchProducts() {
    let searchString = document.getElementById('searchString').value;
    searchResults = [];
    for (let i = 0; i < catalog.length; i++) {
        if (catalog[i].name.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(catalog[i]);
        } else if (catalog[i].description.toLowerCase().match(searchString.trim().toLowerCase())) {
            searchResults.push(catalog[i]);
        }
    }
    cardHTMLGenerator(searchResults);
    addProductPagesLinks();
}

// Fin búsqueda



// addShipping no la estoy usando por ahora
/*function addShipping() {
    if (cart.shippingPrice != 0) { // Si ya había un envío cargado en el carrito, se reemplaza por el que se agrega
        cart.shippingPrice = 0;
        alert('Se reemplazará el envío preexistente por este envío');
    };
    while (cart.shippingPrice === 0) {
        shippingDestination = prompt('Opciones: AMBA | interior');
        if (shippingDestination == 'AMBA') { // Envío a AMBA
            cart.shippingPrice = 1500;
            console.log('Se agregó envío a zona AMBA');
        } else if (shippingDestination == 'interior') { // Envío al interior
            cart.shippingPrice = 5000;
            console.log('Se agregó envío al interior');
        } else { // Opción de envío no válida
            alert('Opción no válida. No se agregó envío');
            break;
        };
    };
};*/

// emptyCart no la estoy usando por ahora
/*function emptyCart() { // Resetea todas las propiedades de carrito
    cart.products = [];
    cart.productsPrice = 0;
    cart.shippingPrice = 0;
    cart.amountOfProducts = 0;
    console.log('Se vació el carrito');
}*/



// ####### FILTROS #######
// Por ahora, sólo están aplicados con las checkboxes al estilo Amazon. Si checkeas una marca, te deshabilita las otras marcas, si checkeás un tipo de producto, te deshabilita el otro. Guardo los estados true/false de cada checkbox en el objeto filterCheckboxes. Los checkbox llaman a la función filterCheckbox, que anida ambos criterios de filtro: el de marca y el de tipo de producto (reflex / mirrorless). Para ambos criterios, la primera pregunta del if, es un XOR (O EXCLUYENTE) => Si hay UNA Y SÓLO UNA checkbox checkeada, aplica el filtro. Si no, no lo aplica y la función devuelve el mismo array que recibió


// esta es la función que aplica cada filtro anidado, y publica las cards que pasan todos los filtros
function filterCheckbox(products) {
    cardHTMLGenerator(filterLensTypeCheckboxes(filterProductCheckboxes(filterCategoryCheckboxes(filterBrandCheckboxes(products)))));
    addProductPagesLinks();
}

// En este objeto, guardo los valores de true o false de cada checkbox
const filterCheckboxes = {
    nikon: document.getElementById('nikonBrandCheckbox'),
    canon: document.getElementById('canonBrandCheckbox'),
    fuji: document.getElementById('fujiBrandCheckbox'),
    reflex: document.getElementById('reflexCategoryCheckbox'),
    mirrorless: document.getElementById('mirrorlessCategoryCheckbox'),
    camera: document.getElementById('camerasProductCheckbox'),
    lenses: document.getElementById('lensesProductCheckbox'),
    prime: document.getElementById('primeCategoryCheckbox'),
    zoom: document.getElementById('zoomCategoryCheckbox'),
    accesories: document.getElementById('accesoriesProductCheckbox')
};

function filterProductCheckboxes(products) {
    if (filterCheckboxes.camera.checked ^ filterCheckboxes.lenses.checked === true ^ filterCheckboxes.accesories.checked === true) {
        if (filterCheckboxes.camera.checked === true) {
            document.getElementById('lensesProductCheckbox').disabled = true;
            document.getElementById('accesoriesProductCheckbox').disabled = true;
        return filterCategory(products , 'camara');
        } else if ( filterCheckboxes.lenses.checked === true ){
            document.getElementById('camerasProductCheckbox').disabled = true;
            document.getElementById('accesoriesProductCheckbox').disabled = true;
            return filterCategory(products , 'lente');
        } else {
            document.getElementById('lensesProductCheckbox').disabled = true;
            document.getElementById('camerasProductCheckbox').disabled = true;
            return filterCategory(products, 'accesorio');
        }
    } else {
        document.getElementById('accesoriesProductCheckbox').disabled = false;
        document.getElementById('lensesProductCheckbox').disabled = false;
        document.getElementById('camerasProductCheckbox').disabled = false;
        return (products);
    }
}

// Esta función captura los checkboxes y dispara los filtros por categoría. Además, deshabilita filtros excluyentes (si se selecciona una categoría, se deshabilitan el resto)
function filterCategoryCheckboxes(products) {
    if (filterCheckboxes.reflex.checked ^ filterCheckboxes.mirrorless.checked === true) {
        if (filterCheckboxes.reflex.checked === true) {
            document.getElementById('mirrorlessCategoryCheckbox').disabled = true;
            return filterCategory(products, 'reflex');
        } else {
            document.getElementById('reflexCategoryCheckbox').disabled = true;
            return filterCategory(products, 'mirrorless');
        }
    } else {
        document.getElementById('reflexCategoryCheckbox').disabled = false;
        document.getElementById('mirrorlessCategoryCheckbox').disabled = false;
        return (products);
    }
}

function filterLensTypeCheckboxes(products) {
    if (filterCheckboxes.zoom.checked ^ filterCheckboxes.prime.checked === true){
        if (filterCheckboxes.zoom.checked === true) {
            document.getElementById('primeCategoryCheckbox').disabled = true;
            return filterCategory(products, 'zoom');
        } else {
            document.getElementById('zoomCategoryCheckbox').disabled = true;
            return filterCategory(products, 'fijo');
        }
    } else {
        document.getElementById('zoomCategoryCheckbox').disabled = false;
        document.getElementById('primeCategoryCheckbox').disabled = false;
        return products;
    }
}


// Esta función captura los checkboxes y dispara los filtros por marca. Además, deshabilita filtros excluyentes (si se selecciona una marca, se deshabilitan el resto)
function filterBrandCheckboxes(products) {
    if (filterCheckboxes.nikon.checked ^ filterCheckboxes.canon.checked ^ filterCheckboxes.fuji.checked === true) {
        filteredProducts = [];
        if (filterCheckboxes.nikon.checked === true) {
            document.getElementById('canonBrandCheckbox').disabled = true;
            document.getElementById('fujiBrandCheckbox').disabled = true;
            return filterBrand(products, 'nikon');
        } else if (filterCheckboxes.canon.checked === true) {
            document.getElementById('nikonBrandCheckbox').disabled = true;
            document.getElementById('fujiBrandCheckbox').disabled = true;
            return filterBrand(products, 'canon');
        } else {
            document.getElementById('canonBrandCheckbox').disabled = true;
            document.getElementById('nikonBrandCheckbox').disabled = true;
            return filterBrand(products, 'fuji');
        }
    } else {
        document.getElementById('nikonBrandCheckbox').disabled = false;
        document.getElementById('canonBrandCheckbox').disabled = false;
        document.getElementById('fujiBrandCheckbox').disabled = false;
        return (products);
    }
}

// Función que ejecuta el filtro por marca, luego de haber capturado arriba los estados de los checkbox
function filterBrand(products, brand) {
    let filteredProducts = [];
    for (let i = 0; i < products.length; i++) {
        
        if (products[i].brand == brand) {
            filteredProducts.push(products[i]);
        }
    }
    return (filteredProducts);
}

// Función que ejecuta el filtro por categoría, luego de haber capturado arriba los estados de los checkbox
/*function filterCategory(products, category) {
    let filteredProducts = [];
    for (let i = 0; i < products.length; i++) {
        
        if (products[i].category == category) {
            filteredProducts.push(products[i]);
        }
    }
    return (filteredProducts);
}*/

