interface TitleProps {
  text: string;
}

export const createTitle = ({ text }: TitleProps) => {
  const title = document.createElement("h1");
  title.className = "text-center";
  title.textContent = text;

  const dot = document.createElement("span");
  dot.style.color = "var(--accent)";
  dot.textContent = ".";
  title.appendChild(dot);

  return title;
};
