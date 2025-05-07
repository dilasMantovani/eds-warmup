export default async function decorate(block) {
    const originalBlockChildren = Array.from(block.children);

    const numColumnsRow = originalBlockChildren[0];
    const numCols = parseInt(numColumnsRow?.children[1]?.textContent.trim() || '3', 10);

    numColumnsRow.remove();

    const itemRowElements = Array.from(block.children);

    const itemsContainer = document.createElement('div');
    itemsContainer.className = `quadro-box-items columns-${Math.min(itemRowElements.length, numCols)}`;
    
    const itemsToDisplay = itemRowElements.slice(0, numCols);
    
    itemsToDisplay.forEach(itemRowDOM => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'quadro-box-item';
        
        Array.from(itemRowDOM.attributes).forEach(attr => {
            if (attr.name.startsWith('data-')) {
                itemDiv.setAttribute(attr.name, attr.value);
            }
        });

        const cells = Array.from(itemRowDOM.children);
        
        const imageAuthoredCell = cells[0];
        const imageAltAuthoredCell = cells[1];
        const headingAuthoredCell = cells[2];
        const contentTextAuthoredCell = cells[3];
        const itemBackgroundColorAuthoredCell = cells[4];

        const imageAltText = imageAltAuthoredCell?.textContent.trim();
        const itemSpecificBgColor = itemBackgroundColorAuthoredCell?.textContent.trim() || '#003366';

        itemDiv.style.backgroundColor = itemSpecificBgColor;

        if (headingAuthoredCell && headingAuthoredCell.innerHTML.trim()) {
            let finalHeadingElement = headingAuthoredCell.querySelector('h1,h2,h3,h4,h5,h6');
            if (finalHeadingElement) {
                finalHeadingElement = finalHeadingElement.cloneNode(true);
            } else {
                finalHeadingElement = document.createElement('h3');
                finalHeadingElement.innerHTML = headingAuthoredCell.innerHTML;
            }
            finalHeadingElement.classList.add('quadro-box-item-heading');
            itemDiv.append(finalHeadingElement);
        }

        if (contentTextAuthoredCell && contentTextAuthoredCell.innerHTML.trim()) {
            const textWrapper = document.createElement('div');
            textWrapper.className = 'quadro-box-item-content';
            textWrapper.innerHTML = contentTextAuthoredCell.innerHTML;
            itemDiv.append(textWrapper);
        }
        
        if (imageAuthoredCell) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'quadro-box-item-image';
            const pictureElement = imageAuthoredCell.querySelector('picture');
            const imgElement = imageAuthoredCell.querySelector('img');

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