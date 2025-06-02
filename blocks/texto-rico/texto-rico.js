import { decodeBase64 } from '../../scripts/scripts.js';

export default function decorate(block) {

  const firstChild = block.children[0];
  const id = block.children[1];

  if(id){
    block.setAttribute("id", id?.textContent?.trim())
  }

  if (firstChild) {
    const paragraph = firstChild.querySelector('p');
    if (paragraph && paragraph.textContent) {
      const decodedHtml = decodeBase64(paragraph.textContent.trim());
      block.innerHTML = decodedHtml;
    } else {
      block.innerHTML = '';
      firstChild.remove();
    }
  } else {
    block.innerHTML = '';
  }
}
