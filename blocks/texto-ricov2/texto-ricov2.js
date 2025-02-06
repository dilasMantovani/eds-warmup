import { htmlToElement } from "../../scripts/scripts.js";

export default function decorate(block) {
  const content = block.children[0];


  let editor = document.createElement('textarea');
  editor.innerHTML = `${content.innerHTML}`


  setTimeout(() => {
      block.appendChild(editor)

      const jodit = Jodit.make(editor, {
        "toolbarAdaptive": false      });
      jodit.e.on('blur', param => {
        content.children[0].textContent = `${btoa(jodit.value.replaceAll("border-collapse:", "border-collapse: "))}`;
      });
  }, 1000);

  block.append(htmlToElement(atob(content.textContent)))

}