import { decodeBase64, isInEditor } from '../../scripts/scripts.js';

export default function decorate(block) {
  const variant = block?.children[0];
  const variantText = variant?.textContent?.trim();
  variant.remove();

  const texts = [];
  const images = [];

  block.classList.add(variantText);

  Array.from(block?.children).forEach((element) => {
    const type = element?.children[0];
    const typeText = type?.textContent?.trim();
    type.remove();

    if (typeText === 'txt') texts.push(element);
    if (typeText === 'img') images.push(element);
  });

  // validando se a relação de imagens realmente está 1/1
  if (variantText === 'text-and-image-1-1' && texts.length !== images.length) {
    if (!isInEditor) return;
    const imageAndTextAmountDontMatchErrorHTML = `
            <div class="oaerror error">
                <strong>Atenção</strong> - Nesta variação da galeria a quantidade de imagens e textos deve ser a mesma.
            </div>
        `;

    const msgElement = document.createElement('div');
    msgElement.classList.add('error-notice');
    msgElement.innerHTML += imageAndTextAmountDontMatchErrorHTML;
    block.insertBefore(msgElement, block.firstChild);
    return;
  }

  Array.from(block?.children).forEach((element) => {
    element.remove();
  });

  const arrowsHTML = `
          <div class="splide__arrows">
            <button class="splide__arrow splide__arrow--prev">
              <i class="fa-solid fa-circle-chevron-left"></i>
            </button>
            <button class="splide__arrow splide__arrow--next">
              <i class="fa-solid fa-circle-chevron-right"></i>
            </button>
          </div>
  `;

  switch (variantText) {
    case 'image-only':
      block.innerHTML += `
        <div class="splide" role="group">
          ${arrowsHTML}
          <div class="splide__track">
            <ul class="splide__list">
              ${images?.map((img) => `<li class="splide__slide">
                          <div class="splide__slide__container">
                            ${handleImage(img)}
                          </div>
                        </li>`)?.join('')
        }
            </ul>
          </div>
        </div>
    `;
      break;
    case 'text-only':
      block.innerHTML += `
        <div class="splide" role="group">
          ${arrowsHTML}
          <div class="splide__track">
            <ul class="splide__list">
              ${texts?.map((text) => `<li class="splide__slide">
                          <div class="splide__slide__container">
                            ${handleText(text)}
                          </div>
                        </li>`)?.join('')
        }
            </ul>
          </div>
        </div>
    `;
      break;
    case 'text-and-image-1-1':
      block.innerHTML += `
        <div class="splide" role="group">
          ${arrowsHTML}
          <div class="splide__track">
            <ul class="splide__list">
              ${texts?.map((text, index) => `<li class="splide__slide">
                          <div class="splide__slide__container text-and-image-1-1">
                            ${handleText(text)}
                            ${handleImage(images[index])}
                          </div>
                        </li>`)?.join('')
        }
            </ul>
          </div>
        </div>
    `;
      break;
    case 'one-image-many-texts':
      block.innerHTML += `
        <div class="splide" role="group">
          ${arrowsHTML}
          <div class="splide__track">
            <ul class="splide__list">
              ${texts?.map((text) => `<li class="splide__slide">
                          <div class="splide__slide__container">
                            ${handleText(text)}
                          </div>
                        </li>`)?.join('')
        }
            </ul>
          </div>
        </div>
        <div class="image__container">
            ${handleImage(images[0])}
        </div>
    `;
      break;
    case 'one-text-many-images':
      block.innerHTML += `
        <div class="text__container">
            ${handleText(texts[0])}
        </div>
        <div class="splide" role="group">
          ${arrowsHTML}
          <div class="splide__track">
            <ul class="splide__list">
              ${images?.map((img) => `<li class="splide__slide">
                          <div class="splide__slide__container">
                            ${handleImage(img)}
                          </div>
                        </li>`)?.join('')
        }
            </ul>
          </div>
        </div>
    `;
      break;
    default:
      break;
  }

  const elms = block.getElementsByClassName('splide');

  for (let i = 0; i < elms.length; i++) {
    const splide = new Splide(elms[i], {
      rewind: true,
      rewindSpeed: 1000,
      pagination: true,
    }).mount();
  }
}

function handleImage(imageElement) {
  const img = imageElement?.children[0];
  const title = imageElement?.children[1];
  const desc = imageElement?.children[2];
  const titleText = title?.textContent.trim();
  const descText = desc?.textContent.trim();

  title.remove();
  desc.remove();

  const pictureElement = img.querySelector('picture');
  if (!pictureElement) return imageElement?.outerHTML;

  const imgHeader = document.createElement('figcaption');
  const imgFooter = document.createElement('figcaption');

  imgHeader.textContent = titleText;
  imgHeader.classList.add('img-header');
  pictureElement.insertBefore(imgHeader, pictureElement.firstChild);

  imgFooter.textContent = descText;
  imgFooter.classList.add('img-footer');
  pictureElement.appendChild(imgFooter);

  return imageElement?.outerHTML;
}

function handleText(textElement) {
  const elementToInjectHTML = textElement?.querySelector("div:last-child");
  elementToInjectHTML.innerHTML = decodeBase64(textElement?.textContent)
  return textElement?.outerHTML;
}
