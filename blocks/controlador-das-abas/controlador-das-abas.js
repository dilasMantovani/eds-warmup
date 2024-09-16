const allTabSections = document.querySelectorAll('[data-tab-id]');
const tabData = Array.from(allTabSections).map((tabElement) => {return {'tabId' : tabElement.getAttribute('data-tab-id'), 'tabTitle': tabElement.getAttribute('data-tab-title')}})

export default function decorate(block) {
    let tabListItems = "";
    tabData.forEach(tab=>{
        tabListItems += `<li><a>${tab?.tabTitle}</a></li>`;
    });

    const outputHtml = `
        <div class="controlador-das-abas-wrapper">
            <ul>
                ${tabData?.map(tab=>{
                    return `<li>
                                <a role="tab" tab-points-to="${tab?.tabId}">${tab?.tabTitle}</a>
                            </li>`;
                }).join("")
                }
            </ul>
        </div>
    `;

    block.textContent = '';
    block.innerHTML = outputHtml;

    const tabs = block.querySelectorAll('[role="tab"]');
    tabs.forEach((tab) => {
        tab.addEventListener('click', handleTabChange);
    });

    init();
}

function init(){
    if(!tabData) return;

    const tabId = tabData[0].tabId;//first tab
    document.querySelector(`[tab-points-to="${tabId}"]`).classList.add("active");

    document.querySelector(`[data-tab-id="${tabId}"]`).classList.remove("hidden");
    tabData.filter(tab => tab?.tabId !== tabId).forEach(tab => {
        document.querySelector(`[data-tab-id="${tab?.tabId}"]`).classList.add("hidden");
    })
}

function handleTabChange(e){
    e.target.classList.add("active");

    const tabId = e.target.getAttribute('tab-points-to');
    document.querySelector(`[data-tab-id="${tabId}"]`).classList.remove("hidden");
    tabData.filter(tab => tab?.tabId !== tabId).forEach(tab => {
        document.querySelector(`[data-tab-id="${tab?.tabId}"]`).classList.add("hidden");
        document.querySelector(`[tab-points-to="${tab?.tabId}"]`).classList.remove("active");
    })
}
