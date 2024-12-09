export default function decorate(block) {
  const content = block.children[0]?.textContent?.trim();

  console.log(block.children[0]?.textContent)
  console.log(block.children[0]?.innerText)

  block.innerHTML = `<pre class="mermaid">${content}</pre>`; 
}

