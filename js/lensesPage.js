// Página de lentes.html . Esencialmente, toma del catálogo todos los productos con la categoría 'lente', y los publica. La búsqueda la llama limitada dentro del catálogo ya filtrado por cámaras

const lensesCatalog = filterCategory(catalog, 'lente')
cardHTMLGenerator(lensesCatalog);
addProductPagesLinks();

const searchProductsTrigger = () => searchProducts(lensesCatalog)

const triggerSearch = document.getElementById('searchString');
triggerSearch.addEventListener('input', searchProductsTrigger);


