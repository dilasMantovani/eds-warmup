export default function decorate(block) {

  const content = block.children[0];

  let editor = document.createElement('textarea');
  editor.innerHTML = `${content.querySelector("pre").textContent}`

  block.appendChild(editor)

  const jodit = Jodit.make(editor);
  jodit.e.on('blur', param => {
    content.querySelector("pre").textContent = `${jodit.value}`;
  });
  
}