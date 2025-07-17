import { isInEditor } from '../../scripts/scripts.js';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value.replaceAll('<br>', '\n');
}

export default function decorate(block) {
  let content = block.children[0]?.textContent?.trim();
  if (isInEditor()) {
    content = block.children[0]?.querySelector('pre')?.innerHTML;
    if (content) {
      content = decodeHtml(content);
    }
  }

  block.innerHTML = `<pre class="mermaid">${content}</pre>`;
}
