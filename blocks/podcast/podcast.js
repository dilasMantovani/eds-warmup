import { decodeBase64, htmlToElement, randomString } from '../../scripts/scripts.js';

export default function decorate(block) {
  const randomElementID = randomString(10);

  const businessKey = block?.children[0]?.textContent?.trim();
  const mediastreamId = block?.children[1]?.textContent?.trim();
  const videoLink = block?.children[2]?.textContent?.trim();
  const captionLink = block?.children[3]?.textContent?.trim();
  const size = block?.children[4]?.textContent?.trim();
  const title = block?.children[5];
  const description = block?.children[6]

  block.textContent = '';

  if(businessKey){
    block.setAttribute("id", businessKey)
  }

  if (title && title.textContent.trim()) {
    block.append(htmlToElement(`${decodeBase64(title?.querySelector('p')?.innerHTML)}`));
  }

  if (mediastreamId) {
    const script = document.createElement('script');
    script.src = 'https://player.cdn.mdstrm.com/lightning_player/api.js';
    script.setAttribute('data-container', randomElementID);
    script.setAttribute('data-type', 'media');
    script.setAttribute('data-id', mediastreamId);
    script.setAttribute('data-app-name', 'appName');
    script.setAttribute('id', `${randomElementID}-player`);
    // script.setAttribute("data-loaded", "playerLoaded")

    document.head.appendChild(script);

    const playerDiv = document.createElement('div');
    playerDiv.setAttribute('id', randomElementID);
    block.append(playerDiv);

    let mdstrmPlayer = null;

    script.addEventListener('playerloaded', ({ detail: player }) => {
      mdstrmPlayer = player;
    });

    let isThefirstError = true; // esse booleano é pq da um erro 'fake', então esse não precisa ser enviado
    let isThefirstTimeShowingDuration = true; // esse booleano é pq da um erro 'fake', então esse não precisa ser enviado
    const intervalId = setInterval(() => {
      if (mdstrmPlayer) {
        window.parent.postMessage(['onPlayerReady', { mediastreamId }], '*');
        mdstrmPlayer.on('seeked', () => { window.parent.postMessage(['onSeeked', { mediastreamId, time: mdstrmPlayer?.currentTime }], '*'); });
        mdstrmPlayer.on('timeupdate', (time) => {
          window.parent.postMessage(['onTimeUpdate', { mediastreamId, time }], '*');
          if (isThefirstTimeShowingDuration) {
            window.parent.postMessage(['videoDuration', { mediastreamId: mediastreamId, duration: mdstrmPlayer?.duration }], '*');
            isThefirstTimeShowingDuration = false;
          }
        },);
        mdstrmPlayer.on('error', (error) => {
          if (isThefirstError) {
            isThefirstError = false;
            return;
          }
          window.parent.postMessage(['onError', { mediastreamId, error }], '*');
        });

        clearInterval(intervalId);
      }
    }, 1500);
  }

  if (description && description.textContent.trim()) {
    block.append(htmlToElement(`${decodeBase64(description?.querySelector('p')?.innerHTML)}`));
  }
}
