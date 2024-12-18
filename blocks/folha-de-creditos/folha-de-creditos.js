import { enhancedIsInEditor } from "../../scripts/scripts.js";

export default function decorate(block) {
  const titulo = block.children[0];
  const tituloText = block.children[0].textContent;
  const imagemCapa = block.children[1];

  const capa = document.createElement("div");
  capa.classList.add("capa");
  setTimeout(() => {
    if(enhancedIsInEditor()){
      capa.classList.add("isInEditor");
    }
  }, 1000);
  capa.innerHTML = `<div class="capa__title"><h1>${tituloText}</h1></div>`;

  const folha = document.createElement("div");
  folha.classList.add("folha")

  titulo.remove();
  imagemCapa.remove();

  Array.from(block.children).forEach(child => {
    const type = child.children[0];
    const typeText = type.textContent;
    type.remove();
    child.classList.add(typeText)
    switch (typeText) {
      case 'disclaimer':
        child.children[0].classList.add('disclaimer__title')
        child.children[1].classList.add('disclaimer__content')
        break;
      case 'fichaCatalografica':
        child.children[0].classList.add('fichaCatalografica__title')
        child.children[1].classList.add('fichaCatalografica__content')

        const cdd = child.children[2];
        cdd.classList.add('fichaCatalografica__cdd')
        cdd.querySelector('p').textContent = "CDD " + cdd.textContent;
        break

      default:
        break;
    }
    folha.append(child)
  })
  block.append(capa);
  block.append(folha)

}