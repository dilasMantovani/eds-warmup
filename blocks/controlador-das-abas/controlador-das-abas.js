function init(tabData) {
  if (!tabData) return;

  const { tabId } = tabData[0];// first tab
  document.querySelector(`[tab-points-to="${tabId}"]`).classList.add('active');

  document.querySelector(`[data-tab-id="${tabId}"]`).classList.remove('hidden');
  tabData.filter((tab) => tab?.tabId !== tabId).forEach((tab) => {
    document.querySelector(`[data-tab-id="${tab?.tabId}"]`).classList.add('hidden');
  });
}

function handleTabChange(e) {
  const tabGroup = e.target.parentNode.parentNode.getAttribute('tab-group').split(',');
  const selector = tabGroup?.map((id) => `[data-tab-id="${id}"]`)?.join(',');
  const groupTabSections = document.querySelectorAll(selector);
  const tabData = Array.from(groupTabSections)?.map((tabElement) => ({ tabId: tabElement.getAttribute('data-tab-id'), tabTitle: tabElement.getAttribute('data-tab-title') }));

  e.target.classList.add('active');

  const tabId = e.target.getAttribute('tab-points-to');
  document.querySelector(`[data-tab-id="${tabId}"]`).classList.remove('hidden');

  tabData.filter((tab) => tab?.tabId !== tabId).forEach((tab) => {
    document.querySelector(`[data-tab-id="${tab?.tabId}"]`).classList.add('hidden');
    document.querySelector(`[tab-points-to="${tab?.tabId}"]`).classList.remove('active');
  });
}

export default function decorate(block) {
  let tabsToRender = null;
  if (block?.children[0]?.textContent?.trim() !== '') {
    tabsToRender = block?.children[0]?.textContent?.trim()?.split(',');
  }
  let allTabSections;
  if (tabsToRender) {
    const selector = tabsToRender?.map((id) => `[data-tab-id="${id}"]`)?.join(',');
    allTabSections = document.querySelectorAll(selector);
  } else {
    allTabSections = document.querySelectorAll('[data-tab-id]');
  }

  const id = block?.children[1]?.textContent?.trim();

  const tabData = Array.from(allTabSections)?.map((tabElement) => ({ tabId: tabElement.getAttribute('data-tab-id'), tabTitle: tabElement.getAttribute('data-tab-title') }));
  // eslint-disable-next-line no-unused-vars
  let tabListItems = '';
  tabData.forEach((tab) => {
    tabListItems += `<li><a>${tab?.tabTitle}</a></li>`;
  });

  const outputHtml = `
        <div class="controlador-das-abas-wrapper" id="${id}">
            <ul tab-group="${tabData?.map((tab) => tab?.tabId)?.join(',')}">
                ${tabData?.map((tab) => `<li>
                                <a role="tab" tab-points-to="${tab?.tabId}">${tab?.tabTitle}</a>
                            </li>`)?.join('')}
            </ul>
        </div>
    `;

  block.textContent = '';
  block.innerHTML = outputHtml;

  const tabs = block.querySelectorAll('[role="tab"]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', handleTabChange);
  });

  init(tabData);
}
