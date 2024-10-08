export default function decorate(block) {
    const quoteType = block.children[0]?.textContent?.trim();
    const quoteImage = block.children[1].querySelector("img");
    const quoteText = block.children[2]?.textContent?.trim();
    const quoteAuthor = block.children[3]?.textContent?.trim();
    const quoteIcon = block.children[4]?.textContent?.trim();

    const quote = () => {
        if(quoteType === "quote") {
            return(`
                <section class="quote-author">
                    <img src="${quoteImage || '/blocks/quote/quote.png'}" />
                    <blockquote>
                        <p>${quoteText}</p>
                        <footer>
                            <cite>${quoteAuthor}</cite>
                        </footer>
                    </blockquote>
                </section>
            `);
        } else {
            console.log("BATATA")
            return(`
                <section class="quote-phrase">
                    <i class="fa fa-${quoteIcon || 'coffee'}"></i>
                    <blockquote>
                        <p>${quoteText}</p>
                    </blockquote>
                </section>
            `)

        }
    }
    
    block.innerHTML = quote();
}