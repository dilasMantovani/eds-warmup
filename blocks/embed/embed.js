export default function decorate(block) {
    const code = block.children[0]?.textContent?.replace(/(\s|&nbsp;)+/g, ' ').trim();

    block.innerHTML = code;
}