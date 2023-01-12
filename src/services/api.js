const baseUrl = 'https://api.mercadolibre.com/sites/MLB/';

export async function getCategories() {
  const response = await fetch(`${baseUrl}categories`);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const response = await fetch(`${baseUrl}search?category=${categoryId}&q=${query}`);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const txtWithoutQuotes = id.replace(/["]/g, '');
  const url = `https://api.mercadolibre.com/items/${txtWithoutQuotes}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
}
