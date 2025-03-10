import { enhancedIsInEditor } from "../../scripts/scripts.js";

export default function decorate(block) {
  const content = block.children[0];
  content.style.display = "none";

  let editMode = false;


  let editor = document.createElement('textarea');

  editor.innerHTML = `${atob(content?.querySelector("pre")?.textContent)}`
  editor.style.display = "none";


  setTimeout(() => {
    block.appendChild(editor)

    const jodit = Jodit.make(editor, {
      "toolbarAdaptive": false
    });
    jodit.e.on('blur', param => {
      content.querySelector("pre").textContent = `${btoa(jodit?.value?.replaceAll("border-collapse:", "border-collapse: "))}`;
    });

    window.wrs_int_init(jodit?.places[0]?.editor, jodit?.places[0]?.container?.querySelector(".jodit-toolbar__box") /*, mathTypeParameters*/);

    block.querySelector(".jodit-container").style.display = "none"

    console.log(jodit)

  }, 1000);

  const mainContent = document.createElement("div")
  mainContent.innerHTML = atob(content.querySelector("pre").textContent.trim())
  block.append(mainContent)

  
    const editButton = document.createElement("button")
    editButton.classList.add("btn-edit")
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
    editButton?.addEventListener('click', (e) => {
      editMode = !editMode
      if (editMode) {
        mainContent.style.display = "none"
        block.querySelector(".jodit-container").style.display = "block"
        editButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        content.style.display = "block";
      } else {
        mainContent.style.display = "block"
        block.querySelector(".jodit-container").style.display = "none"
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
        content.style.display = "none";
  
      }
    })

    setTimeout(() => {
      if (enhancedIsInEditor()) {
        block.append(editButton)
      }else{
        content.remove();
        editButton.remove();
      }
    }, 1500);
}