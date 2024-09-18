export default function decorate(block) {
    const language = block?.children[1]?.textContent?.trim();

    block?.children[1]?.remove()

    block.classList.add("line-numbers");
    block.querySelector('code').classList.add(`language-${language}`)

}