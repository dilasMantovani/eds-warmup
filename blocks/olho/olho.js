export default function decorate(block) {
  const variant = block?.children[0];
  const title = block?.children[1];
  const content = block?.children[2];
  const icon = block?.children[3];

  const variantText = variant?.textContent?.trim();
  const titleText = title?.textContent?.trim();
  const contentText = content?.textContent?.trim();
  const iconText = icon?.textContent?.trim();

  block.classList.add('olho');

  const olho = () => {
    if(variantText === "with-title") {
        return(`
            <section class="olho-with-title">
                <div>
                  <h4><strong>${titleText}</strong></h4>
                </div>
                <div>
                  <blockquote>
                    <p>${contentText}</p>
                  </blockquote>
                </div>
            </section>
        `);
    } else {
        return(`
            <section class="olho-no-title">
                ${iconText ? `<i class="fa fa-${iconText}"></i>` : ""}
                <blockquote>
                    <p>${contentText}</p>
                </blockquote>
            </section>
        `)

    }
}

  block.innerHTML = olho();

}