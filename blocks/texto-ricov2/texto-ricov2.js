import { htmlToElement } from "../../scripts/scripts.js";

export default function decorate(block) {
  const content = block.children[0];
  console.log(content)


  let editor = document.createElement('textarea');
  editor.innerHTML = `${atob(content.textContent)}`


  setTimeout(() => {
      block.appendChild(editor)

      const jodit = Jodit.make(editor, {
        "toolbarAdaptive": false      });
      jodit.e.on('blur', param => {
        content.querySelector("p").textContent = `${btoa(jodit.value.replaceAll("border-collapse:", "border-collapse: "))}`;
      });
  }, 1000);

  block.append(htmlToElement(atob(content.textContent)))

}