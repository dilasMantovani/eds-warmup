import {
  sampleRUM,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './aem.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}


/**
 * creates an element from html string
 * @param {string} html
 * @returns {HTMLElement}
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  const trimmedHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = trimmedHtml;
  return template.content.firstElementChild;
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 1500);
  // load anything that can be postponed to the latest here
  import('./sidekick.js').then(({ initSidekick }) => initSidekick());
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

/**
 * Extract author information from the author page.
 * @param {HTMLElement} block
 */
export function extractAuthorInfo(block) {
  const authorInfo = [...block.children].map((row) => row.firstElementChild);
  return {
    authorImage: authorInfo[0]?.querySelector('img')?.getAttribute('src'),
    authorName: authorInfo[1]?.textContent.trim(),
    authorTitle: authorInfo[2]?.textContent.trim(),
    authorCompany: authorInfo[3]?.textContent.trim(),
    authorDescription: authorInfo[4],
    authorSocialLinkText: authorInfo[5]?.textContent.trim(),
    authorSocialLinkURL: authorInfo[6]?.textContent.trim(),
  };
}

/**
 * Fetch the author information from the author page.
 * @param {HTMLAnchorElement} anchor || {string} link
 */
export async function fetchAuthorBio(anchor) {
  const link = anchor.href ? anchor.href : anchor;
  return fetch(link)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(html, 'text/html');
      const authorInfoEl = htmlDoc.querySelector('.author-bio');
      if (!authorInfoEl) {
        return null;
      }
      const authorInfo = extractAuthorInfo(authorInfoEl);
      return authorInfo;
    })
    .catch((error) => {
      console.error(error);
    });
}

loadPage();

mermaid.initialize({ startOnLoad: true });

export function isInEditor(){
  return window?.location?.hostname?.startsWith("author");
}

//a diferença é que este ignora tbm a tela de preview do AEM
export function enhancedIsInEditor(){
  return document.querySelectorAll('.adobe-ue-edit')?.length > 0;
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function randomString(len) {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

function handleMathJax(){
  if (window.MathJax) return;

  var body = document.body.textContent;
  if (body.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/)) {
    if (!window.MathJax) {
      window.MathJax = {
        tex: {
          inlineMath: {'[+]': [['##', '##']]}
        }
      };
    }
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
    document.head.appendChild(script);
  }
}
window.onload = ()=>{
  handleMathJax();
}

export function removeDataAueAttributesWhenThereIsFormula(element) {
  if (!element || !(element instanceof HTMLElement)) {
      console.error("O argumento fornecido não é um elemento HTML válido.");
      return;
  }

  if(!isInEditor) return;

  //Se não houver fórmula, morre aqui
  const body = element.textContent;
  if(body?.includes("##") || body?.includes("$$") || element.querySelectorAll("mjx-container").length > 0) {

    // Seleciona todos os elementos filhos do elemento fornecido
    const children = element.querySelectorAll("*");
  
    children.forEach(child => {
        // Itera sobre os atributos do elemento filho
        Array.from(child.attributes).forEach(attr => {
            // Verifica se o nome do atributo começa com "data-aue"
            if (attr.name.startsWith("data-aue")) {
                child.removeAttribute(attr.name); // Remove o atributo
            }
        });
    });
  }

}

let lastHeight = 0;
function resize() {
  var height = document.getElementsByTagName("html")[0].getBoundingClientRect().height;
  if(lastHeight !== height){
    lastHeight = height
    window.parent.postMessage(["setHeight", height + 10], "*"); 
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  setInterval(resize, 1000);
});

// Fullscreen Iframe Logic
// ================================================

let activeFullscreenIframe = null;
const originalStyles = new Map();

function applyFullscreen(iframeElement) {
    if (!iframeElement) return;

    if (!originalStyles.has(iframeElement)) {
        originalStyles.set(iframeElement, iframeElement.getAttribute('style') || '');
    }
    iframeElement.classList.add('fullscreen-iframe');

    activeFullscreenIframe = iframeElement;
    console.log('Applied fullscreen to iframe:', iframeElement);
}

function removeFullscreen(iframeElement) {
    if (!iframeElement) return;

    iframeElement.classList.remove('fullscreen-iframe');

    if (originalStyles.has(iframeElement)) {
        iframeElement.setAttribute('style', originalStyles.get(iframeElement));
        originalStyles.delete(iframeElement); // Clean up map
    }

    if (activeFullscreenIframe === iframeElement) {
        activeFullscreenIframe = null;
    }
    console.log('Removed fullscreen from iframe:', iframeElement);
}

function handleExtensionMessage(event) {
    const data = event.data;

    if (!data || typeof data !== 'object' || !data.type || !data.extensionId) {
        return;
    }

    console.log('Received message from extension:', data);

    let iframeElement = null;
    const iframes = document.querySelectorAll('iframe');
    for (let i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow === event.source) {
            iframeElement = iframes[i];
            break;
        }
    }

    if (!iframeElement) {
        console.warn('Could not associate message with a known iframe for extension:', data.extensionId);
        return;
    }

    switch (data.type) {
        case 'startEdit':
            if (activeFullscreenIframe && activeFullscreenIframe !== iframeElement) {
                removeFullscreen(activeFullscreenIframe);
            }
            if (activeFullscreenIframe !== iframeElement) {
              applyFullscreen(iframeElement);
            }
            break;
        case 'saveEdit':
        case 'cancelEdit':
            if (activeFullscreenIframe === iframeElement) {
                removeFullscreen(iframeElement);
            } else {
                console.log('Received save/cancel for an iframe that is not currently marked as fullscreen:', iframeElement);
                removeFullscreen(iframeElement);
            }
            break;
        default:
            break;
    }
}


window.addEventListener('message', handleExtensionMessage);
console.log('Fullscreen iframe message listener initialized.');



const fullscreenStyle = document.createElement('style');
fullscreenStyle.textContent = `
  .fullscreen-iframe {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important; /* Use viewport width */
    height: 100vh !important; /* Use viewport height */
    z-index: 9999 !important; /* Ensure it's on top */
    border: none !important;
    background-color: white !important; /* Optional: Ensure a background */
    /* Reset potential transform/margin issues */
    transform: none !important;
    margin: 0 !important;
    max-width: none !important;
    max-height: none !important;
  }
`;
document.head.appendChild(fullscreenStyle);

