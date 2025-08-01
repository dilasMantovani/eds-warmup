import { decodeBase64, htmlToElement } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const id = block.children[1];
  if (id && id?.querySelectorAll('div')?.length < 3) {
    id.remove();
    block.setAttribute('id', id?.textContent?.trim());
  }

  const originalBlockChildren = Array.from(block.children);

  const numColumnsRow = originalBlockChildren[0];
  const numCols = parseInt(numColumnsRow?.children[1]?.textContent.trim() || '3', 10);

  numColumnsRow.remove();

  const itemRowElements = Array.from(block.children);

  const itemsContainer = document.createElement('div');
  itemsContainer.className = `quadro-box-items columns-${Math.min(itemRowElements.length, numCols)}`;

  const itemsToDisplay = itemRowElements.slice(0, numCols);

  itemsToDisplay.forEach((itemRowDOM) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'quadro-box-item';

    Array.from(itemRowDOM.attributes).forEach((attr) => {
      if (attr.name.startsWith('data-')) {
        itemDiv.setAttribute(attr.name, attr.value);
      }
    });

    const cells = Array.from(itemRowDOM.children);

    const imageAuthoredCell = cells[0];
    const imageAltAuthoredCell = cells[1];
    const contentTextAuthoredCell = cells[2];
    const itemBackgroundColorAuthoredCell = cells[3];
    const imgTitle = cells[4];
    const imgDescription = cells[5];

    const imageAltText = imageAltAuthoredCell?.textContent.trim();
    const itemSpecificBgColor = itemBackgroundColorAuthoredCell?.textContent.trim() || 'rgba(0,0,0,0)';

    itemDiv.style.backgroundColor = itemSpecificBgColor;

    if (contentTextAuthoredCell) {
      const textWrapper = document.createElement('div');
      textWrapper.className = 'quadro-box-item-content';
      const contentParagraph = contentTextAuthoredCell.querySelector('p');
      const richtextDiv = contentTextAuthoredCell.querySelector('div[data-aue-type="richtext"]');

      if (richtextDiv) {
        textWrapper.innerHTML = richtextDiv.innerHTML;
      } else if (contentParagraph && contentParagraph.textContent && contentParagraph.textContent.trim()) {
        try {
          textWrapper.innerHTML = decodeBase64(contentParagraph.textContent.trim());
        } catch (e) {
          textWrapper.innerHTML = contentTextAuthoredCell.innerHTML;
        }
      } else {
        textWrapper.innerHTML = contentTextAuthoredCell.innerHTML;
      }

      if (textWrapper.innerHTML.trim()) {
        itemDiv.append(textWrapper);
      }
    }

    if (imageAuthoredCell) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'quadro-box-item-image';
      const pictureElement = imageAuthoredCell.querySelector('picture');
      const imgElement = imageAuthoredCell.querySelector('img');

      if (imgTitle) {
        imageWrapper.append(htmlToElement(`<p class="quadro-box-item-image-title">${imgTitle.textContent}</p>`));
      }
      if (pictureElement) {
        imageWrapper.append(pictureElement.cloneNode(true));
      } else if (imgElement) {
        const clonedImg = imgElement.cloneNode(true);
        if (imageAltText && !clonedImg.alt) {
          clonedImg.alt = imageAltText;
        }
        imageWrapper.append(clonedImg);
      } else if (imageAuthoredCell.textContent && imageAuthoredCell.textContent.trim()) {
        const img = document.createElement('img');
        img.src = imageAuthoredCell.textContent.trim();
        if (imageAltText) {
          img.alt = imageAltText;
        }
        imageWrapper.append(img);
      }
      if (imgDescription) {
        imageWrapper.append(htmlToElement(`<p class="quadro-box-item-image-description">${imgDescription.textContent}</p>`));
      }

      if (imageWrapper.hasChildNodes()) {
        itemDiv.append(imageWrapper);
      }
    }

    itemDiv.setAttribute('data-quadro-box-item', 'true');

    if (itemDiv.hasChildNodes()) {
      itemsContainer.append(itemDiv);
    }
  });

  block.innerHTML = '';
  if (itemsContainer.hasChildNodes()) {
    block.append(itemsContainer);
  }
}
