
export default function decorate(block) {
  const content = block.children[0];
  console.log(content)


  let editor = document.createElement('textarea');
  editor.innerHTML = `${content.innerHTML}`


  setTimeout(() => {
      block.appendChild(editor)

      const jodit = Jodit.make(editor, {
        "toolbarAdaptive": false      });
      jodit.e.on('blur', param => {
        content.innerHTML = `${jodit.value.replaceAll("border-collapse:", "border-collapse: ")}`;
      });
  }, 1000);


}