import { enhancedIsInEditor } from "../../scripts/scripts.js";
import { handleCustomRTE, prepareRichTextContent } from "../texto-ricov2/richTextUtils.js";

export default function decorate(block) {
  const content = block.children[0];
  const bg = block.children[1];
  //handleCustomRTE(block, content);

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
  capa.append(box)

  box.classList.add("capa__box");


  const richTextContainer = prepareRichTextContent(content);
  box.appendChild(richTextContainer);
  handleCustomRTE(null, richTextContainer);

  setTimeout(() => {
    const joditContainer = block.querySelectorAll(".jodit-container")[0];
    if (joditContainer)
      joditContainer.classList.add("jodit_theme_dark");
  }, 3000);

  setTimeout(() => {
    if (enhancedIsInEditor()) {
      capa.classList.add("isInEditor");
    }
  }, 1500);

}