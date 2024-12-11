export default function decorate(block) {

  const content = block.children[0];

  let editor = document.createElement('div');
  editor.innerHTML = `<p>Core build with no theme, formatting, non-essential modules</p>`

  block.appendChild(editor)

  const quill = new Quill(editor, {
    theme: 'snow'
  });

  let codeblock = document.createElement('pre')
  content.appendChild(codeblock)

  quill.on('text-change', (delta, oldDelta, source) => {
    content.querySelector("pre").textContent = `${quill.getSemanticHTML()}`;
  });
}