export default function getItemsLocalStorage() {
  const result = JSON.parse(localStorage.getItem('cartProduct'));
  return result;
}

export function getAllCartItemsLocalStorage() {
  const result = JSON.parse(localStorage.getItem('allCartProducts'));
  return result;
}
