import { enhancedIsInEditor, htmlToElement } from "../../scripts/scripts.js";

export default function decorate(block) {
  const title = block.children[0];
  const bg = block.children[1];
  const image = block.children[2];

  title.remove();
  bg.remove();
  image.remove();

  const indiceItemList = Array.from(block?.children)?.map(element => {
    const title = element?.children[0]?.textContent;
    const linkTo = element?.children[1]?.textContent;
    element.style.display = "none";
    return {"title":title, "linkTo":linkTo};
  });



  const capa = document.createElement("div");
  capa.classList.add("capa");

  if (bg.querySelector("img")) {
    capa.style.backgroundImage = `url(${bg.querySelector("img").getAttribute('src')})`
  }

  block.append(capa);

  const box = document.createElement("div");
  box.classList.add("capa__box");
  capa.append(box)

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("capa__box__image");
  imageContainer.append(image)
  box.append(imageContainer)
  
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("capa__box__content");
  title.classList.add("capa__box__content__title");
  contentContainer.append(title);
  
  const anchorList = document.createElement("div");
  anchorList.classList.add("capa__box__content__anchor-list");
  indiceItemList?.forEach(element => {
    anchorList.append(handleIndiceItem(element));
  });
  contentContainer.append(anchorList);

  box.append(contentContainer)

  setTimeout(() => {
    if (enhancedIsInEditor()) {
      capa.classList.add("isInEditor");
    }
  }, 1500);

}

function handleIndiceItem(indiceItem){
  const anchor = document.createElement("a");

  anchor.setAttribute("href", `#${indiceItem?.linkTo}`);
  anchor.setAttribute("target", "_self");

  const iconElement = htmlToElement('<i class="fa-solid fa-angle-right"></i>');
  const title = htmlToElement(`<div><p>${indiceItem?.title}</p></div>`)
  anchor.append(iconElement)
  anchor.append(title);


  return anchor;
}

