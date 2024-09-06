export default function decorate(block) {
    //contrato base
    let propMap = {
        "image": null,
        "preTitle": null,
        "title": null,
        "cta": null,
    }

    /**
     * Cada nó filho do bloco é um valor, no entanto nem todo campo é um nó filho do bloco, pois existe o Type inference
     * Ex: image e imageAlt compõem o mesmo campo, e são renderizados em um único nó filho do bloco.
     * https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling#type-inference
     */
    Array.from(block.children).forEach(element=>{
        //sendo key-value, o primeiro elemento é sempre a string com "key" configurada no model
        const key = (element.firstElementChild.firstChild.innerHTML)
        // e o último é o valor
        propMap[key] = element.lastElementChild;
    })

    console.log(propMap.image)
    console.log(propMap?.image?.firstElementChild.lastElementChild.src)

    const html = 
    `
    <figure class="teaser">
        <img class="teaser-image" src="${propMap?.image?.firstElementChild?.lastElementChild?.src}" alt="Lilith, Hugo’s cat" />
        <figcaption class="teaser-overlay">
        <div class="teaser-meta">
            <span class="teaser-title">${propMap?.title?.innerHTML}</span>
            <p class="teaser-description">${propMap?.preTitle?.innerHTML}</p>
        </div>
        </figcaption>
    </figure>
    `

    block.innerHTML = html;
}
