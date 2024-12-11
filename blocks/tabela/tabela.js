export default function decorate(block) {

  let editor = document.createElement('div');
  editor.innerHTML = `<p>Core build with no theme, formatting, non-essential modules</p>`

  block.appendChild(editor)

  const quill = new Quill(editor, {
    theme: 'snow'
  });

  quill.on('text-change', (delta, oldDelta, source) => {
    console.log(quill.getSemanticHTML());
  });
}