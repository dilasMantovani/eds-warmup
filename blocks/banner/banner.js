import { prepareRichTextContent } from "../texto-ricov2/richTextUtils.js";

export default function decorate(block) {
  const content = block.children[0];
  const bg = block.children[1];
  //handleCustomRTE(block, content);

  content.remove();
  bg.remove();

  const capa = document.createElement("div");
  capa.classList.add("capa");
  block.append(capa);
  if (bg?.querySelector("img")) {

    const computedStyle = window.getComputedStyle(capa);
    const backgroundImage = computedStyle.backgroundImage;
    capa.style.background = backgroundImage.replace(/url\([^\)]+\)/g, `url(${bg.querySelector("img").getAttribute('src')})`);
  }

  const box = document.createElement("div");
  box.classList.add("capa__box");
  capa.append(box)

  box.classList.add("capa__box");


  const richTextContainer = prepareRichTextContent(content)
  box.appendChild(richTextContainer);
  handleCustomRTE(null, richTextContainer);

}


function handleCustomRTE(block, rteField) {
  const content = rteField;
  content.style.display = "none";

  let editMode = false;


  let editor = document.createElement('textarea');

  editor.innerHTML = `${atob(content?.querySelector("pre")?.textContent)}`
  editor.style.display = "none";

  let joditContainer;
  setTimeout(() => {
    // block.appendChild(editor)
    content.after(editor)

    const jodit = Jodit.make(editor, {
      "toolbarAdaptive": false
    });
    jodit.e.on('blur', param => {
      content.querySelector("pre").textContent = `${btoa(jodit?.value?.replaceAll("border-collapse:", "border-collapse: "))}`;
    });

    window.wrs_int_init(jodit?.places[0]?.editor, jodit?.places[0]?.container?.querySelector(".jodit-toolbar__box") /*, mathTypeParameters*/);

    // block.querySelector(".jodit-container").style.display = "none"; //TODO fix for components with multi RTE
    joditContainer = jodit.currentPlace.container;
    joditContainer.style.display = "none";

    console.log(jodit)

  }, 1000);

  const mainContent = document.createElement("div")
  mainContent.innerHTML = atob(content.querySelector("pre").textContent.trim())
  content.after(mainContent)


  const editButton = document.createElement("button")
  editButton.classList.add("btn-edit")
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
  editButton?.addEventListener('click', (e) => {
    editMode = !editMode
    if (editMode) {
      mainContent.style.display = "none"
      joditContainer.style.display = "block"
      editButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
      content.style.display = "block";
    } else {
      mainContent.style.display = "block"
      joditContainer.style.display = "none"
      editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
      content.style.display = "none";

    }
  })

  setTimeout(() => {
    if (enhancedIsInEditor()) {
      content.after(editButton)
    } else {
      content.remove();
      editButton.remove();
    }
  }, 1500);
}