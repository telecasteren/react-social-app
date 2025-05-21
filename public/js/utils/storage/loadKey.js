export function loadKey(key) {
  return JSON.parse(localStorage.getItem(key));
}
