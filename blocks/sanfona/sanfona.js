import { htmlToElement, removeDataAueAttributesWhenThereIsFormula } from '../../scripts/scripts.js';

export default function decorate(block) {
  const openAll = block?.children[0];
  const iconOpen = block?.children[1];
  const iconClosed = block?.children[2];

  const openAllText = openAll?.textContent?.trim() ? openAll?.textContent?.trim() : 'false';
  const iconOpenText = iconOpen?.textContent?.trim();
  const iconClosedText = iconClosed?.textContent?.trim();

  openAll?.remove();
  iconOpen?.remove();
  iconClosed?.remove();

  const accordionItems = Array.from(block?.children)?.map((element) => {
    const headerTextElement = element?.children[0];
    const imgTitleElement = element?.children[3];
    const descriptionElement = element?.children[4];
    const secondImgTitleElement = element?.children[7];
    const secondDescriptionElement = element?.children[8];

    const headerText = headerTextElement?.textContent?.trim();
    const text = element?.children[1];
    const image = element?.children[2];
    const imgTitle = imgTitleElement?.textContent?.trim();
    const description = descriptionElement?.textContent?.trim();
    const secondText = element?.children[5];
    const secondImage = element?.children[6];
    const secondImgTitle = secondImgTitleElement?.textContent?.trim();
    const secondDescription = secondDescriptionElement?.textContent?.trim();

    headerTextElement.remove();
    imgTitleElement.remove();
    descriptionElement.remove();
    secondImgTitleElement.remove();
    secondDescriptionElement.remove();
    text.remove();
    image.remove();
    secondText.remove();
    secondImage.remove();

    removeDataAueAttributesWhenThereIsFormula(text);
    removeDataAueAttributesWhenThereIsFormula(secondText);

    let textContent = '';
    let secondTextContent = '';

    const textParagraph = text?.querySelector('p');
    if (textParagraph) {
      const richtextDiv = text?.querySelector('div[data-aue-type="richtext"]');
      if (richtextDiv) {
        textContent = richtextDiv.innerHTML;
      } else if (textParagraph.textContent && textParagraph.textContent.trim()) {
        try {
          textContent = atob(textParagraph.textContent.trim());
        } catch (e) {
          textContent = text.innerHTML;
        }
      }
    }

    const secondTextParagraph = secondText?.querySelector('p');
    if (secondTextParagraph) {
      const secondRichtextDiv = secondText?.querySelector('div[data-aue-type="richtext"]');
      if (secondRichtextDiv) {
        secondTextContent = secondRichtextDiv.innerHTML;
      } else if (secondTextParagraph.textContent && secondTextParagraph.textContent.trim()) {
        try {
          secondTextContent = atob(secondTextParagraph.textContent.trim());
        } catch (e) {
          secondTextContent = secondText.innerHTML;
        }
      }
    }

    const accordionItemElement = htmlToElement(`
        <div class="accordion-item">
            <div class="accordion-item-header">
                <h5><a><span>${headerText}</span><i class="fa fa-${iconClosedText || 'plus-circle'}"></i></a></h5>
            </div>
            <div class="accordion-item-body">
                <div class="accordion-item-body-text">
                    ${textContent}
                </div>
                <div class="accordion-item-body-image">
                    <p>${imgTitle}</p>
                    ${image?.innerHTML}
                    <p>${description}</p>
                </div>

                <div class="accordion-item-body-text">
                    ${secondTextContent}
                </div>
                <div class="accordion-item-body-image">
                    <p>${secondImgTitle}</p>
                    ${secondImage?.innerHTML}
                    <p>${secondDescription}</p>
                </div>
            </div>
        </div>
        `);

    return accordionItemElement;
  });

  // block.textContent = "";
  accordionItems?.forEach((accordionItem) => {
    block.append(accordionItem);

    accordionItem.querySelector('a').addEventListener('click', () => {
      if (accordionItem.className.includes('active')) {
        accordionItem.classList.remove('active');
        accordionItem.querySelector('i')?.classList?.add(`fa-${iconClosedText || 'plus-circle'}`);
        accordionItem.querySelector('i')?.classList?.remove(`fa-${iconOpenText || 'circle-minus'}`);
        return;
      }
      if (openAllText === 'false') {
        Array.from(block.querySelectorAll('.accordion-item')).forEach((item) => {
          item.classList.remove('active');
          item.querySelector('i')?.classList?.add(`fa-${iconClosedText || 'plus-circle'}`);
          item.querySelector('i')?.classList?.remove(`fa-${iconOpenText || 'circle-minus'}`);
        });
      }

      accordionItem.classList.add('active');
      accordionItem.querySelector('i')?.classList?.add(`fa-${iconOpenText || 'circle-minus'}`);
      accordionItem.querySelector('i')?.classList?.remove(`fa-${iconClosedText || 'plus-circle'}`);
    });
  });
}
