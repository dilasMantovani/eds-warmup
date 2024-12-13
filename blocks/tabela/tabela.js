import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {

  const content = block.children[0];

  let editor = document.createElement('textarea');
  editor.innerHTML = `${content.querySelector("pre").textContent}`

  block.appendChild(editor)

  moveInstrumentation(content, editor)

  const jodit = Jodit.make(editor, {
    "buttons": "table"
  });
  setTimeout(() => {
    jodit.e.on('blur', param => {
      content.querySelector("pre").textContent = `${jodit.value}`;
    });
  }, 1000);
  
}