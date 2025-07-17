import { decodeBase64 } from '../../scripts/scripts.js';

export default function decorate(block) {
  // o primeiro elemento será sempre a propriedade startAt
  const startAtElement = block?.children[0];
  const id = block?.children[1];
  const startAtValue = startAtElement.firstElementChild.firstElementChild.innerHTML;

  // removendo do DOM pois é apenas uma propriedade,
  startAtElement.remove();

  if (id?.querySelectorAll('div')?.length < 3) {
    id.remove();
    block.setAttribute('id', id?.textContent?.trim());
  }

  const observer = new IntersectionObserver(((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting === true) {
        entry?.target?.classList?.remove('invisible');
        entry?.target?.classList?.add('visible');
      } else if (entry.isIntersecting === false && window.scrollY < entry.target.getBoundingClientRect().top + window.scrollY) {
        entry?.target?.classList?.remove('visible');
        entry?.target?.classList?.add('invisible');
      }
    });
  }), { threshold: [0.40] });

  function processRichTextContent(element) {
    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach((paragraph) => {
      if (paragraph.textContent && paragraph.textContent.trim()
        && !paragraph.closest('div[data-aue-type="richtext"]')) paragraph.outerHTML = decodeBase64(paragraph.textContent.trim());
    });
  }

  let i = startAtValue === 'right' ? 0 : 1;

  Object.values(block?.children).forEach((child) => {
    if (i % 2 === 0) { child.className = 'timeline-item timeline-right invisible'; } else { child.className = 'timeline-item timeline-left invisible'; }

    const title = child?.children[0];
    const subtitle = child?.children[1];
    const text = child?.children[2];

    const image = child?.children[3];
    const imgTitle = child?.children[4];
    const imgSource = child?.children[5];

    const text2 = child?.children[6];
    const image2 = child?.children[7];
    const imgTitle2 = child?.children[8];
    const imgSource2 = child?.children[9];

    processRichTextContent(text);
    processRichTextContent(text2);

    title.className = 'timeline-item-title';
    subtitle.className = 'timeline-item-subtitle';
    title.innerHTML = decodeBase64(title?.textContent);
    subtitle.innerHTML = decodeBase64(subtitle?.textContent);

    text.className = 'timeline-item-text';
    image.className = 'timeline-item-image';
    imgTitle.className = 'timeline-item-image-title';
    imgSource.className = 'timeline-item-image-source';

    text2.className = 'timeline-item-text';
    image2.className = 'timeline-item-image';
    imgTitle2.className = 'timeline-item-image-title';
    imgSource2.className = 'timeline-item-image-source';

    const timelineItemWrapper = document.createElement('div');
    timelineItemWrapper.className = 'timeline-item-wrapper';

    const timelineItemHeader = document.createElement('div');
    timelineItemHeader.className = 'timeline-item-header';
    timelineItemHeader.appendChild(title);

    const timelineItemImageWrapper = document.createElement('div');
    timelineItemImageWrapper.className = 'timeline-item-image-wrapper';
    timelineItemImageWrapper.appendChild(imgTitle);
    timelineItemImageWrapper.appendChild(image);
    timelineItemImageWrapper.appendChild(imgSource);

    const timelineItemImageWrapper2 = document.createElement('div');
    timelineItemImageWrapper2.className = 'timeline-item-image-wrapper';
    timelineItemImageWrapper2.appendChild(imgTitle2);
    timelineItemImageWrapper2.appendChild(image2);
    timelineItemImageWrapper2.appendChild(imgSource2);

    const timelineItemContent = document.createElement('div');
    timelineItemContent.className = 'timeline-item-content';
    timelineItemContent.appendChild(subtitle);
    timelineItemContent.appendChild(text);

    if (image.innerHTML) { timelineItemContent.appendChild(timelineItemImageWrapper); }

    timelineItemContent.appendChild(text2);

    if (image2.innerHTML) { timelineItemContent.appendChild(timelineItemImageWrapper2); }

    timelineItemWrapper.appendChild(timelineItemHeader);
    timelineItemWrapper.appendChild(timelineItemContent);

    child.appendChild(timelineItemWrapper);

    observer.observe(child);
    i++;
  });
}
