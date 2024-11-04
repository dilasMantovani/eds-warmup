export default function decorate(block) {
    const code = block.children[0]?.textContent?.replace(/&nbsp;/g, " ").replace(/&lt;br\/&gt;/g, "\n").replace(/<[^>]+>/g, "").trim();

      
   
    block.innerHTML = `<pre class="mermaid">${code}</pre>`;
}

