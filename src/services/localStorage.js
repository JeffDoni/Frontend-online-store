export default function getItemsLocalStorage() {
  const result = JSON.parse(localStorage.getItem('cartItems'));
  return result;
}
