export default function decorate(block) {
  const content = block.children[0]?.textContent?.trim();

  console.log(content)
  block.innerHTML = `<pre class="mermaid">${content}</pre>`;
}

