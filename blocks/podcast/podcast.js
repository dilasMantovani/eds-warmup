import { htmlToElement, randomString } from "../../scripts/scripts.js";

export default function decorate(block) {
    const randomElementID = randomString(10);

    const businessKey = block?.children[0]?.textContent?.trim();
    const mediastreamId = block?.children[1]?.textContent?.trim();
    const videoLink = block?.children[2]?.textContent?.trim();
    const captionLink = block?.children[3]?.textContent?.trim();
    const size = block?.children[4]?.textContent?.trim();
    const title = block?.children[5]?.textContent?.trim();
    const description = block?.children[6]?.textContent?.trim();

    block.textContent = "";


    if (title) {
        block.append(htmlToElement(`<p>${title}</p>`))
    }

    if (mediastreamId) {
        var script = document.createElement('script');
        script.src = 'https://player.cdn.mdstrm.com/lightning_player/api.js';
        script.setAttribute("data-container", randomElementID)
        script.setAttribute("data-type", "media")
        script.setAttribute("data-id", mediastreamId)
        script.setAttribute("data-app-name", "appName")
        script.setAttribute("id", randomElementID+"-player")
        script.setAttribute("data-loaded", "playerLoaded")
    
        document.head.appendChild(script);

        const playerDiv = document.createElement("div")
        playerDiv.setAttribute("id", randomElementID);
        block.append(playerDiv)

    }

    if (description) {
        block.append(htmlToElement(`<p>${description}</p>`))
    }
}