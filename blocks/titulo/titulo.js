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
        var iconElement = document.createElement('span');
    
        fetch(`/icons/fontawesome/svgs/${iconTypeText}/${iconText}.svg`)
        .then(response => {
            if (!response.ok) throw new Error("Not 2xx response", {cause: response});
            return response.text()
        })
        .then(data => {
            iconElement.innerHTML = data;
            headerElement.insertBefore(iconElement, headerElement.firstChild);
        })
        .catch(()=>{
            console.warn("SVG não encontrado")
        });
    }

}

