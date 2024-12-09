import { isInEditor } from "../../scripts/scripts.js";

export default function decorate(block) {
  let content = block.children[0]?.textContent?.trim();
  console.log(isInEditor())
  if(isInEditor()){
    content = block.children[0]?.querySelector('pre')?.innerHTML
    if(content){
      content = decodeHtml(content);
    }
  }

  console.log(content)
  block.innerHTML = `<pre class="mermaid">${content}</pre>`; 
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}