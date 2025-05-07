export default async function decorate(block) {
    const originalBlockChildren = Array.from(block.children);

    const numColumnsRow = originalBlockChildren[0];
    const itemsBackgroundColorRow = originalBlockChildren[1];

    const numCols = parseInt(numColumnsRow?.children[1]?.textContent.trim() || '3', 10);
    const itemsBgColor = itemsBackgroundColorRow?.children[1]?.textContent.trim() || '#003366';

    const itemRowElements = originalBlockChildren.slice(2);

    block.innerHTML = '';

    if (itemRowElements.length > 0) {
        const itemsContainer = document.createElement('div');
        itemsContainer.className = `quadro-box-items columns-${numCols}`;

        itemRowElements.slice(0, numCols).forEach(itemRowDOM => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'quadro-box-item';
            itemDiv.style.backgroundColor = itemsBgColor;

            const cells = Array.from(itemRowDOM.children);
            const imageCell = cells[0];
            const imageAltText = cells[1]?.textContent.trim();
            const headingCell = cells[2];
            const contentTextCell = cells[3];
            
            // Heading cell
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

            // Content text cell    
            if (contentTextCell && contentTextCell.innerHTML.trim()) {
                const textWrapper = document.createElement('div');
                textWrapper.className = 'quadro-box-item-content';
                textWrapper.innerHTML = contentTextCell.innerHTML;
                itemDiv.append(textWrapper);
            }
            
            // Imagte cell
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
                } else if (imageCell.textContent.trim()) {
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