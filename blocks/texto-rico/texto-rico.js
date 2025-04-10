import { removeDataAueAttributesWhenThereIsFormula } from "../../scripts/scripts.js";

export default function decorate(block) {
  removeDataAueAttributesWhenThereIsFormula(block);

  const firstChild = block.children[0];
  if (firstChild) {
    const paragraph = firstChild.querySelector('p');
    if (paragraph && paragraph.textContent) {
      const decodedHtml = atob(paragraph.textContent.trim());
      block.innerHTML = decodedHtml;
    } else {
      block.innerHTML = '';
      firstChild.remove();
    }
  } else {
    block.innerHTML = '';
  }
}