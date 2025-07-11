import { enhancedIsInEditor, inIFrame, decodeBase64 } from '../../scripts/scripts.js';

const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
function decode64innerHTML(tag) {
  const inner = tag.innerHTML
  if (typeof inner === 'string' && base64regex.test(inner)) tag.innerHTML = decodeBase64(inner)
}

export default function decorate(block) {
  const titulo = block.children[0];
  const tituloText = block.children[0].textContent;
  const imagemCapa = block.children[1];
  const id = block.children[2];
  if (id && id?.querySelectorAll("div")?.length < 3) {
    id.remove();
    block.setAttribute("id", id?.textContent?.trim())
  }

  const capa = document.createElement('div');
  capa.classList.add('capa');

  if (imagemCapa.querySelector('img')) {
    capa.style.backgroundImage = `url(${imagemCapa.querySelector('img').getAttribute('src')}), linear-gradient(45deg, #007ABF, #0055A5), linear-gradient(180deg, #fff, #fff)`;
  }

  capa.innerHTML = `<div class="capa__title"><h1>${tituloText}</h1></div>`;

  const folha = document.createElement('div');
  folha.classList.add('folha');

  titulo.remove();
  imagemCapa.remove();

  Array.from(block.children).forEach((child) => {
    const type = child.children[0];
    const typeText = type.textContent;
    type.remove();
    child.classList.add(typeText);
    child.querySelectorAll('p').forEach(decode64innerHTML)
    switch (typeText) {
      case 'disclaimer':
        child.children[0].classList.add('disclaimer__title');
        child.children[1].classList.add('disclaimer__content');
        break;
      case 'fichaCatalografica':
        child.children[0].classList.add('fichaCatalografica__title');
        child.children[1].classList.add('fichaCatalografica__content');

        const cdd = child.children[2];
        cdd.classList.add('fichaCatalografica__cdd');
        cdd.querySelector('p').textContent = `CDD ${cdd.textContent}`;
        break;

      default:
        break;
    }
    folha.append(child);
  });
  block.append(capa);
  block.append(folha);

  setTimeout(() => {
    if (enhancedIsInEditor() || inIFrame()) {
      capa.classList.add('isInEditor');
    }
  }, 1500);
}
