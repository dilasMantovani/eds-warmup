export default function decorate(block) {
    const imageBefore = block.children[0].querySelector("img");
    const textBefore = block.children[1]?.textContent?.trim();
    const imageAfter = block.children[2].querySelector("img");
    const textAfter = block.children[3]?.textContent?.trim();

    const htmlOutput = `
        <div class="comparison-slider-wrapper">
            <div class="comparison-slider">
                <div class="overlay right" ${textAfter ? "": "style='display:none'"}><div class="overlay-wrapper">${textAfter}</div></div>
                <img src="${imageAfter?.src}"/>
                <div class="resize">
                    <div class="overlay left" ${textBefore ? "": "style='display:none'"}><div class="overlay-wrapper" >${textBefore}</div></div>
                    <img src="${imageBefore?.src}"/>
                </div>
                <div class="divider"></div>
            </div>
        </div>
    `;

    block.innerHTML = htmlOutput;
}