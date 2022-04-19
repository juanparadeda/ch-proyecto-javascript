// Archivo js principal que se dispara desde el index.html

cardHTMLGenerator(catalog); // Publico las cards de todo el catálogo
addProductPagesLinks(); // Agrego los links a las páginas de cada producto

// Búsqueda
const searchProductsTrigger = () => searchProducts(catalog);
let triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProductsTrigger);
// Fin búsqueda


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


// Esta función verifica el estado de cada checkbox por tipo de producto (lente, cámara, accesorio) y deshabilita los que son excluyentes entre sí (si checkeo lentes, se deschequean accesorios y cámaras)
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

// Esta función captura los checkboxes y dispara los filtros por categoría. Además, deshabilita filtros excluyentes (si se selecciona una categoría, se deshabilitan el resto). Estas categorías aplican tanto a lentes como a cámaras. Por eso chequear mirrorless no deshabilita los tipos de lentes.
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

// Esta función captura los checkboxes y dispara los filtros por tipo de lente (zoom, fijo). Además, deshabilita filtros excluyentes (si se selecciona una categoría, se deshabilitan el resto)
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
    products.forEach(product => {
        product.brand == brand && filteredProducts.push(product);
    })      
    return (filteredProducts);
}

// La función que ejecuta el filtro por categoría, está en cardsController.js pues se utiliza en varias páginas.
