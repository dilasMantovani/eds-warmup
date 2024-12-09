export default function decorate(block) {
    const code = block.children[0]?.innerText;
    block.innerHTML = `<pre class="mermaid">${code}</pre>`;
}

