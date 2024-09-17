export default function decorate(block) {
    const language = block?.children[1]?.textContent?.trim();

    console.log(language)

    block?.children[1]?.remove()

    block.classList.add("line-numbers");
    block.querySelector('code').classList.add(`language-${language}`)

    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    import('../../scripts/prism.js')
      .then(() => {
        // run prism in async mode; uses webworker.
        window.Prism.highlightAll();
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
}