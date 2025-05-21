export function saveKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
