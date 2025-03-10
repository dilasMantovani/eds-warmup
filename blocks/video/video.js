import { htmlToElement, randomString } from "../../scripts/scripts.js";

export default function decorate(block) {
    var script = document.createElement('script');
    script.src = 'https://player.cdn.mdstrm.com/lightning_player/api.js';
    document.head.appendChild(script);


    const businessKey = block?.children[0]?.textContent?.trim();
    const mediastreamId = block?.children[1]?.textContent?.trim();
    const videoLink = block?.children[2]?.textContent?.trim();
    const captionLink = block?.children[3]?.textContent?.trim();
    const size = block?.children[4]?.textContent?.trim();
    const title = block?.children[5]?.textContent?.trim();
    const description = block?.children[6]?.textContent?.trim();

    block.textContent = "";

    const randomElementID = randomString(10);

    if (title) {
        block.append(htmlToElement(`<p>${title}</p>`))
    }

    if (mediastreamId) {
        const playerDiv = document.createElement("div")
        playerDiv.setAttribute("id", randomElementID);
        block.append(playerDiv)
        const intervalId = setInterval(() => {
            if(loadMSPlayer){
                loadMSPlayer(randomElementID, {
                    type: 'media',
                    id: mediastreamId,
                    appName: 'appName'
                }).then(player => {
                    clearInterval(intervalId)
                }).catch()
            }
        }, 300);
    }

    if (description) {
        block.append(htmlToElement(`<p>${description}</p>`))
    }
}