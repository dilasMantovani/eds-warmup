export default function decorate(block) {
  const imageBefore = block.children[0].querySelector('img');
  const textBefore = block.children[1]?.textContent?.trim();
  const imageAfter = block.children[2].querySelector('img');
  const textAfter = block.children[3]?.textContent?.trim();
  const id = block?.children[4];
  if (id) {
    id.remove();
    block.setAttribute('id', id?.textContent?.trim());
  }

  const htmlOutput = `
        <div class="comparison-slider-wrapper loadable">
            <div class="comparison-slider">
                <div class="overlay right" ${textAfter ? '' : "style='display:none;'"}><div class="overlay-wrapper">${textAfter}</div></div>
                ${imageAfter?.src ? `<img src="${imageAfter?.src}"/>` : ''}
                <div class="resize">
                    <div class="overlay left" ${textBefore ? '' : "style='display:none;'"}><div class="overlay-wrapper" >${textBefore}</div></div>
                    ${imageBefore?.src ? `<img src="${imageBefore?.src}"/>` : ''}
                </div>
                <div class="divider"></div>
            </div>
        </div>
        <div class="loader-15 loading"></div>
    `;

  block.innerHTML = htmlOutput;
}
