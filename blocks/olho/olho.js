import { handleCustomRTE, prepareRichTextContent } from "../texto-ricov2/richTextUtils.js";

export default function decorate(block) {
  const originalContent = block?.children[2]?.cloneNode(true);
  
  const variant = block?.children[0];
  const title = block?.children[1];
  const icon = block?.children[3];

  const variantText = variant?.textContent?.trim();
  const titleText = title?.textContent?.trim();
  const iconText = icon?.textContent?.trim();

  createOlhoStructure(block, variantText, titleText, iconText);
  
  const contentDiv = block.querySelector('.olho-content');
  if (contentDiv && originalContent) {
    const richTextContainer = prepareRichTextContent(originalContent);
    
    contentDiv.innerHTML = '';
    contentDiv.appendChild(richTextContainer);
    
    handleCustomRTE(contentDiv, richTextContainer);
  }
}

function createOlhoStructure(block, variantText, titleText, iconText) {
  if (variantText === "with-title") {
    block.innerHTML = `
      <section class="olho-with-title">
        <div>
          <h4><strong>${titleText}</strong></h4>
        </div>
        <div>
          <blockquote class="olho-content"></blockquote>
        </div>
      </section>
    `;
  } else {
    block.innerHTML = `
      <section class="olho-no-title">
        ${iconText ? `<i class="fa fa-${iconText}"></i>` : ""}
        <div>
          <blockquote class="olho-content"></blockquote>
        </div>
      </section>
    `;
  }
}