
export default function decorate(block) {
    const height=block.children[0].textContent.trim();
    const heightMobile=block.children[1].textContent.trim();
    const uuid = generateUUID();

    const htmlOutput = `
        <div id="${uuid}"></div>
        <style>
            #${uuid}{
                height: ${height ? height : 20}px;
            }
            @media (max-width: 575px) {
                #${uuid}{
                    height: ${heightMobile ? heightMobile : `${height ? height : 10}`}px;
                }
            }
        </style>
    `
    block.textContent = "";
    block.innerHTML = htmlOutput;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }