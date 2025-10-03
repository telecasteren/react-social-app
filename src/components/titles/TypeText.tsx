const TypeText = () => {
  const title = document.createElement("h2");
  title.className = "text-center font-typewriter typewriter";

  const texts = [
    "Want to experience the world of food?",
    "Got any favourite food spots to share?",
    "Connect for a slice of life!",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  const typeEffect = () => {
    const currentText = texts[textIndex];
    const visibleText = currentText.slice(0, charIndex);

    title.textContent = visibleText;

    if (!isErasing && charIndex < currentText.length) {
      charIndex++;
      setTimeout(typeEffect, 80);
    } else if (isErasing && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 30);
    } else {
      if (!isErasing) {
        if (textIndex === texts.length - 1) {
          return;
        }
        isErasing = true;
        setTimeout(typeEffect, 2000);
      } else {
        if (textIndex === texts.length - 1) {
          return;
        }
        isErasing = false;
        textIndex++;
        setTimeout(typeEffect, 400);
      }
    }
  };

  typeEffect();
  return title;
};
export default TypeText;
