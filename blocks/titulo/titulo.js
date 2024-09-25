export default function decorate(block) {

    const title = block?.children[0];
    const id = block?.children[1];
    const icon = block?.children[2];
    const iconType = block?.children[3];

    const idText = id?.textContent?.trim();
    const iconText = icon?.textContent?.trim();    
    const iconTypeText = iconType?.textContent?.trim();

    id.remove();
    icon.remove();
    iconType.remove();
    
    const headerElement = title?.querySelector("h1,h2,h3,h4,h5,h6");
    if(id){
        headerElement?.setAttribute("id", idText);
    }

    headerElement.innerHTML = `<strong>${headerElement?.textContent?.trim()}</strong>`;

    if(iconText){
        var iconElement = document.createElement('i');
        iconElement.classList.add(`fa-${iconText}`);
        if(iconTypeText) iconElement.classList.add(`fa-${iconTypeText}`);
        headerElement.insertBefore(iconElement, headerElement.firstChild);
    }

}

