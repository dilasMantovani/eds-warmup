import { generateUUID, htmlToElement } from "../../scripts/scripts.js";

export default function decorate(block) {
    const image = block.children[0];
    const title = block.children[1];
    const description = block.children[2];
    const zoomIn = block.children[3];
    const openModal = block.children[4];
    const uniquecss = block.children[5];

    const titleText = title?.textContent.trim();
    const descriptionText = description?.textContent.trim();
    const zoomInVal = zoomIn?.textContent.trim();
    const openModalVal = openModal?.textContent.trim();
    const uniquecssText = uniquecss?.textContent?.trim();


    title.remove();
    description.remove();
    zoomIn.remove();
    openModal.remove();
    uniquecss.remove();


    const pictureElement = image.querySelector('picture');

    if (!pictureElement) return;


    if (titleText) {
        const imageTitleElement = document.createElement('p');
        imageTitleElement.textContent = titleText;
        block.insertBefore(imageTitleElement, image);
    }

    if (descriptionText) {
        const imageDescriptionElement = document.createElement('p');
        imageDescriptionElement.textContent = descriptionText;
        block.append(imageDescriptionElement)
    }

    //handleZoomIn
    if (zoomInVal === "true") {

        pictureElement?.classList?.add("zoom-in");

        const imgElement = image?.querySelector('img');

        pictureElement.addEventListener('mousemove', (e) => {
            const rect = pictureElement.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posição X do mouse dentro do contêiner
            const y = e.clientY - rect.top;  // Posição Y do mouse dentro do contêiner

            const moveX = (x / pictureElement.offsetWidth) * 100;
            const moveY = (y / pictureElement.offsetHeight) * 100;

            imgElement.style.transformOrigin = `${moveX}% ${moveY}%`; // Define a origem do zoom
        });

        pictureElement.addEventListener('mouseenter', () => {
            imgElement.style.transform = 'scale(1.5)'; // Aplica o zoom de 50% quando o mouse entra
        });

        pictureElement.addEventListener('mouseleave', () => {
            imgElement.style.transform = 'scale(1)'; // Retorna ao tamanho original quando o mouse sai
        });
    }

    if (openModalVal === "true") {
        pictureElement?.classList?.add("open-modal");

        const zoomIconElement = document.createElement("i");
        pictureElement.append(zoomIconElement);



        const modalElement = htmlToElement(`
            <div class="img-modal">
                <div class="img-modal-content">
                    ${pictureElement.outerHTML}
                    <div class="img-modal-content-footer">
                        <div class="img-modal-content-footer-wrapper">
                            <span>${titleText}</span>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            </div>
        `);
        block.append(modalElement)

        pictureElement.addEventListener('click', () => {
            modalElement.style.display = "block";
            setTimeout(() => {
                modalElement.style.opacity = 1;
            }, 100);
        });

        //click fora do modal
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement || e.target?.className.includes("fa-xmark")) {
                modalElement.style.opacity = 0;
                setTimeout(() => {
                    modalElement.style.display = "none";
                }, 500);
            }
        });
    }

    if (uniquecssText) {
        const uuid = generateUUID();
        block.setAttribute("id", uuid)
        const styleTag = document.createElement("style");
        styleTag.textContent = `
        #${uuid}{
            ${uniquecssText}
        }`;
        block.append(styleTag)
    }

}