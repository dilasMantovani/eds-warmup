import { decodeBase64, htmlToElement } from '../../scripts/scripts.js';

export default function decorate(block) {
  const id = block?.children[0];
  if (id && id?.querySelectorAll("div")?.length < 3) {
    id.remove();
    block.setAttribute("id", id?.textContent?.trim())
  }

  const tabs = [];

  Array.from(block?.children).forEach((element, index) => {
    const title = element.children[0];
    const titleText = title.textContent;
    title.remove();

    const contentElements = element.querySelectorAll('p');
    contentElements.forEach((paragraph) => {
      if (paragraph.textContent && paragraph.textContent.trim()) {
        const richtextDiv = paragraph.closest('div[data-aue-type="richtext"]');
        if (richtextDiv) {
        } else {
          try {
            const decodedContent = decodeBase64(paragraph.textContent.trim());
            paragraph.outerHTML = decodedContent;
          } catch (e) {
          }
        }
      }
    });

    tabs.push({ title: titleText, body: element });

    if (index !== 0) { element.classList.add('hidden'); }
  });

  const outputHtml = htmlToElement(`
  <div class="abas-header">
      <ul>
          ${tabs?.map((tab, index) => `<li>
                          <a role="tab" index="${index}" class="${index == 0 ? 'active' : ''}">${tab?.title}</a>
                      </li>`)?.join('')
}
      </ul>
  </div>
`);

  outputHtml?.querySelectorAll('a')?.forEach((tabTitle) => {
    tabTitle?.addEventListener('click', (e) => {
      outputHtml?.querySelectorAll('a')?.forEach((otherTab) => {
        otherTab?.classList?.remove('active');
      });
      e?.target?.classList?.add('active');
      tabs?.forEach((element) => {
        element?.body?.classList?.add('hidden');
      });
      tabs[e?.target?.getAttribute('index')]?.body?.classList?.remove('hidden');
    });
  });

  block?.insertBefore(outputHtml, block?.children[0]);
}
