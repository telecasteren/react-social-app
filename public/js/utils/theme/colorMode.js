const setTheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
export default setTheme;

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setTheme);
