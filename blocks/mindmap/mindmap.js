export default function decorate(block) {
  const code = block.children[0]?.textContent?.trim();

  block.innerHTML = `<pre class="mermaid">${code}</pre>`;
}
