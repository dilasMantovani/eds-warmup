import { htmlToElement } from "../../scripts/scripts.js";

export default function decorate(block) {
    const cta = block.children[0];
    const title = block.children[1];
    const text = block.children[2];
    const image = block.children[3];
    const imgTitle = block.children[4];
    const description = block.children[5];

    const text2 = block.children[6];
    const image2 = block.children[7];
    const imgTitle2 = block.children[8];
    const description2 = block.children[9];

    const ctaText = cta?.textContent?.trim();
    const titleText = title?.textContent?.trim();
    const imgTitleText = imgTitle?.textContent?.trim();
    const descriptionText = description?.textContent?.trim();
    const imgTitleText2 = imgTitle2?.textContent?.trim();
    const descriptionText2 = description2?.textContent?.trim();

    const button = htmlToElement(`<a class="btn-modal">${ctaText}</a>`);
    block.textContent="";
    block.append(button);

    const modalElement = htmlToElement(`
        <div class="modal">
            <div class="modal-content">
                <div class="modal-content-header">
                    <h4 class="modal-content-header-title">${titleText}</h4>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="modal-content-body">
                    ${text?.innerHTML}
                    ${image?.querySelector("img") ?
                        `
                        <div class="modal-content-body-img-wrapper">
                            <p>${imgTitleText}</p>
                            ${image.innerHTML}
                            <p>${descriptionText}</p>
                        </div>
                        `
                     : ""}
                    ${text2?.innerHTML}
                    ${image2?.querySelector("img") ?
                        `
                        <div class="modal-content-body-img-wrapper">
                            <p>${imgTitleText2}</p>
                            ${image2.innerHTML}
                            <p>${descriptionText2}</p>
                        </div>
                        `
                     : ""}
                </div>
                <div class="modal-content-footer">
                
                </div>
            </div>
        </div>
    `)

    block.append(modalElement);

    const contentSectionElement = modalElement.querySelector(".modal-content");
    button.addEventListener('click', () => {

        modalElement.style.display = "block";
        setTimeout(() => {
            modalElement.style.opacity = 1;
            contentSectionElement.classList.add("active")
        }, 100);
    });

    modalElement.addEventListener('click', (e) => {
        if(e.target === modalElement || e.target?.className.includes("fa-xmark")){
            modalElement.style.opacity = 0;
            contentSectionElement.classList.remove("active")
            setTimeout(() => {
                modalElement.style.display = "none";

            }, 500);
        }
    });
}