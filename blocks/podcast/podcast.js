import { DAM_URL } from "../../scripts/scripts.js";

export default function decorate(block) {
  const path = block.children[0];
  const pathText = path.textContent.trim();
  path.remove();

  block.innerHTML = `<audio controls src="${DAM_URL}${pathText}"></audio>`
  
}