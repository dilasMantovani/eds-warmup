
export default function decorate(block) {

  const content = block.children[0];

  content.classList.add("hide")

  let editor = document.createElement('textarea');
  editor.innerHTML = `${content.querySelector("pre").textContent}`

  block.appendChild(editor)

  const jodit = Jodit.make(editor, {
    "buttons": "table"
  });
  setTimeout(() => {
    jodit.e.on('blur', param => {
      content.querySelector("pre").textContent = `${jodit.value.replaceAll("border-collapse:", "border-collapse: ")}`;
    });
  }, 1000);


  let tableContainer = document.createElement('div');
  tableContainer.innerHTML = content.querySelector("pre").textContent;

  let isolatedTable = tableContainer.querySelector('table');

  block.appendChild(isolatedTable);


  
}