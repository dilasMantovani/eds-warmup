import { enhancedIsInEditor } from "../../scripts/scripts.js";

export default function decorate(block) {

  const content = block.children[0];

  content.classList.add("hide")

  let tableContainer = document.createElement('div');
  tableContainer.innerHTML = content.querySelector("pre").textContent;

  let isolatedTable = tableContainer.querySelector('table');

  if (isolatedTable)
    block.appendChild(isolatedTable);


  let editor = document.createElement('textarea');
  editor.innerHTML = `${content.querySelector("pre").textContent}`


  setTimeout(() => {
    if (enhancedIsInEditor()) {
      block.appendChild(editor)

      const jodit = Jodit.make(editor, {
        "toolbarAdaptive": false,
        "buttons": "bold,italic,fontsize,superscript,subscript,table"
      });
      jodit.e.on('blur', param => {
        content.querySelector("pre").textContent = `${jodit.value.replaceAll("border-collapse:", "border-collapse: ")}`;
      });
    };
  }, 1000);


}