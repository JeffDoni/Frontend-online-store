export default function getItemsLocalStorage() {
  const result = JSON.parse(localStorage.getItem('cartProduct'));
  return result;
}
