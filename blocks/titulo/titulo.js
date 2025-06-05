import { decodeBase64, handleRichTextElement } from "../../scripts/scripts.js";

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
  
  const headerElement = title?.querySelector("div:last-child");
  if (id) {
    headerElement?.setAttribute('id', idText);
  }

  headerElement.innerHTML = `${decodeBase64(headerElement?.textContent?.trim())}`;

  const sanitizedHeader = headerElement.querySelector("h1,h2,h3,h4,h5,h6");
  headerElement.textContent="";
  headerElement.append(sanitizedHeader)

  if (iconText) {
    const iconElement = document.createElement('i');
    iconElement.classList.add(`fa-${iconText}`);
    if (iconTypeText) iconElement.classList.add(`fa-${iconTypeText}`);
    
    sanitizedHeader.insertBefore(iconElement, sanitizedHeader.firstChild);
  }
}
