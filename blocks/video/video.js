export default function decorate(block) {
    const businessKey = block?.children[0].textContent?.trim();
    const mediastreamId = block?.children[1].textContent?.trim();
    const videoLink = block?.children[2].textContent?.trim();
    const captionLink = block?.children[3].textContent?.trim();
    const size = block?.children[4].textContent?.trim();

    block.innerHTML = `<iframe 
        data-business-key="${businessKey}" 
        data-media-stream-id="${mediastreamId}" 
        data-caption-link="${captionLink}" 
        data-size="${size}" 
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        width="100%"
        height="100%"
        src="${videoLink}"
        scrolling="no"
        frameborder="0"
        allow="geolocation;microphone;camera;encrypted-media;midi"
        autostart="0"></iframe>`

}