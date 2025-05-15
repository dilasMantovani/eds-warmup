import { decodeBase64 } from '../../scripts/scripts.js';

export default function decorate(block) {

  const firstChild = block.children[0];
  if (firstChild) {
    const paragraph = firstChild.querySelector('p');
    if (paragraph && paragraph.textContent) {
      const decodedHtml = decodeBase64(paragraph.textContent.trim());
      console.log(paragraph.textContent.trim())
      block.innerHTML = decodedHtml;
    } else {
      block.innerHTML = '';
      firstChild.remove();
    }
  } else {
    block.innerHTML = '';
  }
}
