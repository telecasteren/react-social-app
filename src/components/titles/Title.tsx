interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  text,
  className = "text-center",
}: TitleProps) => {
  return (
    <h1 className={className}>
      {text}
      <span style={{ color: "var(--accent)" }}>.</span>
    </h1>
  );
};

export default Title;

// export const createTitle = (text: string): HTMLElement => {
//   const title = document.createElement("h1");
//   title.className = "text-center";
//   title.textContent = text;

//   const dot = document.createElement("span");
//   dot.style.color = "var(--accent)";
//   dot.textContent = ".";
//   title.appendChild(dot);

//   return title;
// };
