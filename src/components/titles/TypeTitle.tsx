interface TypewriterProps {
  text: string;
}

const TypeTitle = ({ text }: TypewriterProps) => {
  const title = document.createElement("h1");
  title.className = "text-center font-brand";

  const dot = document.createElement("span");
  dot.style.color = "var(--accent)";
  dot.textContent = ".";

  let index = 0;
  const typeLetters = () => {
    if (index < text.length) {
      title.textContent += text.charAt(index);
      index++;
      setTimeout(typeLetters, 100);
    } else if (index === text.length) {
      title.appendChild(dot);
    }
  };

  typeLetters();

  setTimeout(() => {
    title.style.border = "transparent";
  }, 3000);

  return title;
};
export default TypeTitle;
