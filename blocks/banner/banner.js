import { enhancedIsInEditor } from "../../scripts/scripts.js";

export default function decorate(block) {
  const content = block.children[0];
  const bg = block.children[1];

  content.remove();
  bg.remove();

  const capa = document.createElement("div");
  capa.classList.add("capa");
  block.append(capa);
  if (bg?.querySelector("img")) {
    const computedStyle = window.getComputedStyle(capa);
    const backgroundImage = computedStyle.backgroundImage;
    capa.style.backgroundImage = backgroundImage.replace(/url\([^\)]+\)/g, `url(${bg.querySelector("img").getAttribute('src')})`);
  }

  const box = document.createElement("div");
  box.classList.add("capa__box");
  capa.append(box);

  let contentText = '';
  if (content) {
    const contentParagraph = content.querySelector('p');
    if (contentParagraph) {
      const richtextDiv = content.querySelector('div[data-aue-type="richtext"]');
      if (richtextDiv) {
        contentText = richtextDiv.innerHTML;
      } else if (contentParagraph.textContent && contentParagraph.textContent.trim()) {
        try {
          contentText = atob(contentParagraph.textContent.trim());
        } catch (e) {
          contentText = content.innerHTML;
        }
      }
    }
  }
  
  box.innerHTML = contentText;

  setTimeout(() => {
    if (enhancedIsInEditor()) {
      capa.classList.add("isInEditor");
    }
  }, 1500);
}