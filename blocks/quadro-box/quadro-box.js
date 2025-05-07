export default async function decorate(block) {
    const config = {};
    const itemRows = [];

    Array.from(block.children).forEach(row => {
        const cells = Array.from(row.children);
        if (cells.length === 2) { 
            const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '');
            const valueCell = cells[1];
            config[key] = valueCell; 
        } else if (cells.length > 0) {
            itemRows.push(row);
        }
    });

    block.innerHTML = ''; 

    const mainHeading = config.mainheading?.textContent.trim() || '';
    const mainImageSrc = config.mainimage?.querySelector('img')?.src || '';
    const mainImageAlt = config.mainimagealt?.textContent.trim() || '';
    const mainTextCell = config.maintext;
    const numCols = parseInt(config.numcolumns?.textContent.trim() || '3', 10);
    const itemsBgColor = config.itemsbackgroundcolor?.textContent.trim() || '#003366';

    if (mainHeading || mainImageSrc || mainTextCell) {
        const mainSectionDiv = document.createElement('div');
        mainSectionDiv.className = 'quadro-box-main-section';
        mainSectionDiv.style.backgroundColor = itemsBgColor; 

        if (mainImageSrc) {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'quadro-box-main-image';
            const img = document.createElement('img');
            img.src = mainImageSrc;
            img.alt = mainImageAlt || '';
            imgDiv.append(img);
            mainSectionDiv.append(imgDiv);
        }

        const mainContentWrapper = document.createElement('div');
        mainContentWrapper.className = 'quadro-box-main-content-wrapper';
        let hasMainContent = false;

        if (mainHeading) {
            const h2 = document.createElement('h2');
            h2.className = 'quadro-box-main-heading';
            h2.textContent = mainHeading;
            mainContentWrapper.append(h2);
            hasMainContent = true;
        }

        if (mainTextCell && mainTextCell.innerHTML.trim()) {
            const textDiv = document.createElement('div');
            textDiv.className = 'quadro-box-main-text';
            textDiv.innerHTML = mainTextCell.innerHTML; 
            mainContentWrapper.append(textDiv);
            hasMainContent = true;
        }
        
        if(hasMainContent){
            mainSectionDiv.append(mainContentWrapper);
        }

        if (mainSectionDiv.hasChildNodes()) {
            block.append(mainSectionDiv);
        }
    }

    if (itemRows.length > 0) {
        const itemsContainer = document.createElement('div');
        itemsContainer.className = `quadro-box-items columns-${numCols}`;
        itemsContainer.style.backgroundColor = itemsBgColor;

        itemRows.slice(0, numCols).forEach(itemRowDOM => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'quadro-box-item';

            const itemCells = Array.from(itemRowDOM.children);

            const imageCell = itemCells[0];
            const imageAltText = itemCells[1]?.textContent.trim(); 
            const headingCell = itemCells[itemCells.length === 4 ? 2 : 1]; 
            const contentTextCell = itemCells[itemCells.length === 4 ? 3 : 2];

            if (imageCell && imageCell.querySelector('picture, img')) {
                const imageWrapper = document.createElement('div');
                imageWrapper.className = 'quadro-box-item-image';
                const imgTag = imageCell.querySelector('picture, img').cloneNode(true);
                if (imgTag.tagName === 'IMG' && imageAltText) {
                    imgTag.alt = imageAltText;
                }
                imageWrapper.append(imgTag);
                itemDiv.append(imageWrapper);
            }

            if (headingCell && headingCell.textContent.trim()) {
                let headingElement = headingCell.querySelector('h1,h2,h3,h4,h5,h6');
                if (headingElement) {
                    headingElement = headingElement.cloneNode(true);
                } else {
                    headingElement = document.createElement('h3'); 
                    headingElement.innerHTML = headingCell.innerHTML; 
                }
                headingElement.className = 'quadro-box-item-heading';
                itemDiv.append(headingElement);
            }

            if (contentTextCell && contentTextCell.innerHTML.trim()) {
                const textWrapper = document.createElement('div');
                textWrapper.className = 'quadro-box-item-content';
                textWrapper.innerHTML = contentTextCell.innerHTML; 
                itemDiv.append(textWrapper);
            }

            if (itemDiv.hasChildNodes()) {
                itemsContainer.append(itemDiv);
            }
        });
        block.append(itemsContainer);
    }
} 