interface ButtonProps {
  text: string;
  href?: string;
  newTab?: boolean;
}

const createButton = ({
  text,
  href,
  newTab = false,
}: ButtonProps): HTMLAnchorElement => {
  const button = document.createElement("a");
  button.className = "btn";

  button.href = href || "#";
  button.target = newTab ? "_blank" : "_self";

  if (newTab) {
    button.rel = "noopener noreferrer";
  }

  button.textContent = text;

  return button;
};
export default createButton;
