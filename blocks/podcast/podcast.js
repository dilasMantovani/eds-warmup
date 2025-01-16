import { DAM_URL, htmlToElement } from "../../scripts/scripts.js";

export default function decorate(block) {
  const path = block.children[0];
  const pathText = path.textContent.trim();
  path.remove();

  const audioElement = htmlToElement(`<audio controls src="${DAM_URL}${pathText}"></audio>`);

  block.append(audioElement);
  
}