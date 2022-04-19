// Archivo js principal que se dispara desde el index.html

cardHTMLGenerator(catalog); // Publico las cards de todo el catálogo
addProductPagesLinks(); // Agrego los links a las páginas de cada producto




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
    prime: document.getElementById('primeCategoryCheckbox'),
    zoom: document.getElementById('zoomCategoryCheckbox'),
    camera: document.getElementById('camerasProductCheckbox'),
    lenses: document.getElementById('lensesProductCheckbox'),   
    accesories: document.getElementById('accesoriesProductCheckbox')
};
// Búsqueda. uso Object.keys para que al buscar con la barra de búsqueda, se deschequeen todas las checkbox y que no se preste a confusión a la UX
const searchProductsTrigger = () => {
    Object.keys(filterCheckboxes).forEach(key => {
        filterCheckboxes[key].checked = false;
        filterCheckboxes[key].disabled = false;
    })
    searchProducts(catalog);

}
const triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProductsTrigger);
// Fin búsqueda

// Esta función verifica el estado de cada checkbox por tipo de producto (lente, cámara, accesorio) y deshabilita los que son excluyentes entre sí (si checkeo lentes, se deschequean accesorios y cámaras)
function filterProductCheckboxes(products) {
    const {camera, lenses, accesories} = filterCheckboxes;
    if (camera.checked ^ lenses.checked ^ accesories.checked ) {
        if (camera.checked) {
            lenses.disabled = true;
            accesories.disabled = true;
            return filterCategory(products , 'camara');
        } else if (lenses.checked){
            camera.disabled = true;
            accesories.disabled = true;
            return filterCategory(products , 'lente');
        } else {
            lenses.disabled = true;
            camera.disabled = true;
            return filterCategory(products, 'accesorio');
        }
    } else {
        accesories.disabled = false;
        lenses.disabled = false;
        camera.disabled = false;
        return (products);
    }
}

// Esta función captura los checkboxes y dispara los filtros por categoría. Además, deshabilita filtros excluyentes (si se selecciona una categoría, se deshabilitan el resto). Estas categorías aplican tanto a lentes como a cámaras. Por eso chequear mirrorless no deshabilita los tipos de lentes.
function filterCategoryCheckboxes(products) {
    const {reflex, mirrorless} = filterCheckboxes;
    if (reflex.checked ^ mirrorless.checked) {
        if (filterCheckboxes.reflex.checked) {
            mirrorless.disabled = true;
            return filterCategory(products, 'reflex');
        } else {
            reflex.disabled = true;
            return filterCategory(products, 'mirrorless');
        }
    } else {
        reflex.disabled = false;
        mirrorless.disabled = false;
        return (products);
    }
}

// Esta función captura los checkboxes y dispara los filtros por tipo de lente (zoom, fijo). Además, deshabilita filtros excluyentes (si se selecciona una categoría, se deshabilitan el resto)
function filterLensTypeCheckboxes(products) {
    const {zoom, prime} = filterCheckboxes;
    if (zoom.checked ^ prime.checked){
        if (zoom.checked) {
            prime.disabled = true;
            return filterCategory(products, 'zoom');
        } else {
            zoom.disabled = true;
            return filterCategory(products, 'fijo');
        }
    } else {
        zoom.disabled = false;
        prime.disabled = false;
        return products;
    }
}


// Esta función captura los checkboxes y dispara los filtros por marca. Además, deshabilita filtros excluyentes (si se selecciona una marca, se deshabilitan el resto)
function filterBrandCheckboxes(products) {
    const {nikon, canon, fuji} = filterCheckboxes;
    if (nikon.checked ^ canon.checked ^ fuji.checked) {
        if (nikon.checked) {
            canon.disabled = true;
            fuji.disabled = true;
            return filterBrand(products, 'nikon');
        } else if (filterCheckboxes.canon.checked) {
            nikon.disabled = true;
            fuji.disabled = true;
            return filterBrand(products, 'canon');
        } else {
            canon.disabled = true;
            nikon.disabled = true;
            return filterBrand(products, 'fuji');
        }
    } else {
        nikon.disabled = false;
        canon.disabled = false;
        fuji.disabled = false;
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
