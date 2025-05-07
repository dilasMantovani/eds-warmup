export default async function decorate(block) {
    const originalBlockChildren = Array.from(block.children);

    const numColumnsRow = originalBlockChildren[0];
    const numCols = parseInt(numColumnsRow?.children[1]?.textContent.trim() || '3', 10);
    const itemRowElements = originalBlockChildren.slice(1);

    block.innerHTML = '';

    if (itemRowElements.length > 0) {
        const itemsContainer = document.createElement('div');
        itemsContainer.className = `quadro-box-items columns-${numCols}`;

        itemRowElements.slice(0, numCols).forEach(itemRowDOM => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'quadro-box-item';

            const fields = Array.from(itemRowDOM.children);

            const imageFieldRow = fields[0];
            const imageAltFieldRow = fields[1];
            const headingFieldRow = fields[2];
            const contentTextFieldRow = fields[3];
            const itemBackgroundColorFieldRow = fields[4];

            const imageCell = imageFieldRow?.children[1];
            const imageAltText = imageAltFieldRow?.children[1]?.textContent.trim();
            const headingCell = headingFieldRow?.children[1];
            const contentTextCell = contentTextFieldRow?.children[1];
            const itemSpecificBgColor = itemBackgroundColorFieldRow?.children[1]?.textContent.trim() || '#003366';

            itemDiv.style.backgroundColor = itemSpecificBgColor;
            if (headingCell && headingCell.innerHTML.trim()) {
                let finalHeadingElement = headingCell.querySelector('h1,h2,h3,h4,h5,h6');
                if (finalHeadingElement) {
                    finalHeadingElement = finalHeadingElement.cloneNode(true);
                } else {
                    finalHeadingElement = document.createElement('h3');
                    finalHeadingElement.innerHTML = headingCell.innerHTML;
                }
                finalHeadingElement.classList.add('quadro-box-item-heading');
                itemDiv.append(finalHeadingElement);
            }

            if (contentTextCell && contentTextCell.innerHTML.trim()) {
                const textWrapper = document.createElement('div');
                textWrapper.className = 'quadro-box-item-content';
                textWrapper.innerHTML = contentTextCell.innerHTML;
                itemDiv.append(textWrapper);
            }
            
            if (imageCell) {
                const imageWrapper = document.createElement('div');
                imageWrapper.className = 'quadro-box-item-image';
                const pictureElement = imageCell.querySelector('picture');
                const imgElement = imageCell.querySelector('img');

                if (pictureElement) {
                    imageWrapper.append(pictureElement.cloneNode(true));
                } else if (imgElement) {
                    const clonedImg = imgElement.cloneNode(true);
                    if (imageAltText && !clonedImg.alt) {
                        clonedImg.alt = imageAltText;
                    }
                    imageWrapper.append(clonedImg);
                } else if (imageCell.textContent && imageCell.textContent.trim()) {
                    const img = document.createElement('img');
                    img.src = imageCell.textContent.trim();
                    if (imageAltText) {
                        img.alt = imageAltText;
                    }
                    imageWrapper.append(img);
                }
                
                if (imageWrapper.hasChildNodes()) {
                    itemDiv.append(imageWrapper);
                }
            }

            if (itemDiv.hasChildNodes()) {
                itemsContainer.append(itemDiv);
            }
        });

        if (itemsContainer.hasChildNodes()) {
            block.append(itemsContainer);
        }
    }
} 