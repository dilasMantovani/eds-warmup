export default function decorate(block) {
  const variant = block?.children[0];
  const title = block?.children[1];
  const content = block?.children[2];
  const icon = block?.children[3];

  const variantText = variant?.textContent?.trim();
  const titleText = title?.textContent?.trim();
  let contentText = '';
  const iconText = icon?.textContent?.trim();

  block.classList.add('olho');

  if (content) {
    const contentParagraph = content.querySelector('p');
    if (contentParagraph) {
      const richtextDiv = content.querySelector('div[data-aue-type="richtext"]');
      if (richtextDiv) {
        contentText = richtextDiv.innerHTML;
      } else if (contentParagraph.textContent && contentParagraph.textContent.trim()) {
        try {
          contentText = atob(contentParagraph.textContent.trim());
        } catch (e) {
          contentText = content.innerHTML;
        }
      }
    }
  }

  const olho = () => {
    if(variantText === "with-title") {
        return(`
            <section class="olho-with-title">
                <div>
                  <h4><strong>${titleText}</strong></h4>
                </div>
                <div>
                  <blockquote>
                    ${contentText}
                  </blockquote>
                </div>
            </section>
        `);
    } else {
        return(`
            <section class="olho-no-title">
                ${iconText ? `<i class="fa fa-${iconText}"></i>` : ""}
                <blockquote>
                    ${contentText}
                </blockquote>
            </section>
        `)
    }
  }

  block.innerHTML = olho();
}