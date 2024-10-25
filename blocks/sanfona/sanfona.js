import { htmlToElement } from "../../scripts/scripts.js";

export default function decorate(block) {
    const openAll = block?.children[0];
    const iconOpen = block?.children[1];
    const iconOpenVariant = block?.children[2];
    const iconClosed = block?.children[3];
    const iconClosedVariant = block?.children[4];

    const openAllText = openAll?.textContent?.trim();
    const iconOpenText = iconOpen?.textContent?.trim();
    const iconOpenVariantText = iconOpenVariant?.textContent?.trim();
    const iconClosedText = iconClosed?.textContent?.trim();
    const iconClosedVariantText = iconClosedVariant?.textContent?.trim();

    openAll?.remove();
    iconOpen?.remove();
    iconOpenVariant?.remove();
    iconClosed?.remove();
    iconClosedVariant?.remove();

    const accordionItems = Array.from(block?.children)?.map(element => {
        const headerText = element?.children[0]?.textContent?.trim();
        const text = element?.children[1];
        const image = element?.children[2];
        const imgTitle = element?.children[3]?.textContent?.trim();
        const description = element?.children[4]?.textContent?.trim();
        const secondText = element?.children[5];
        const secondImage = element?.children[6];
        const secondImgTitle = element?.children[7]?.textContent?.trim();
        const secondDescription = element?.children[8]?.textContent?.trim();

        const accordionItemElement = htmlToElement(`
        <div class="accordion-item">
            <div class="accordion-item-header">
                <h5><a><span>${headerText}</span><i class="fa fa-plus-circle"></i></a></h5>
            </div>
            <div class="accordion-item-body">
                <div class="accordion-item-body-text">
                    ${text.innerHTML}
                </div>
                <div class="accordion-item-body-image">
                    <p>${imgTitle}</p>
                    ${image.innerHTML}
                    <p>${description}</p>
                </div>

                <div class="accordion-item-body-text">
                    ${secondText.innerHTML}
                </div>
                <div class="accordion-item-body-image">
                    <p>${secondImgTitle}</p>
                    ${secondImage.innerHTML}
                    <p>${secondDescription}</p>
                </div>
            </div>
        </div>
        `
        )

        return accordionItemElement;
    });

    block.textContent = "";
    accordionItems?.forEach(accordionItem => {
        block.append(accordionItem)        

        accordionItem.querySelector("a").addEventListener('click', () => {
            if(accordionItem.className.includes("active")){
                accordionItem.classList.remove("active")
                accordionItem.querySelector("i")?.classList?.add("fa-plus-circle");
                accordionItem.querySelector("i")?.classList?.remove("fa-minus-circle");
                return;
            }
            if(openAllText === "false"){
                Array.from(block.querySelectorAll(".accordion-item")).forEach(item => {
                    item.classList.remove("active");
                });
            }

            accordionItem.classList.add("active")
            accordionItem.querySelector("i")?.classList?.add("fa-minus-circle");
            accordionItem.querySelector("i")?.classList?.remove("fa-plus-circle");
        });
    });

}