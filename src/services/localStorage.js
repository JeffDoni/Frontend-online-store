export function getAllCartItemsLocalStorage() {
  const result = JSON.parse(localStorage.getItem('allCartProducts'));
  return result;
}

export function getItemsLocalStorage(item) {
  const result = JSON.parse(localStorage.getItem(item));
  return result;
}

export function addItemLocalStorage(name, item) {
  const result = localStorage.setItem(name, JSON.stringify(item));
  return result;
}
