// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';
import { isInEditor } from './scripts.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function highlightCodeBlock(){
    const highlightable = document.querySelector(
        'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
      );
    if (!highlightable) return; // exit, no need to load prism if nothing to highlight

    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    import('./prism.js')
      .then(() => {
        // run prism in async mode; uses webworker.

        Prism.hooks.add("before-highlight", (env) => {
          env.code = env.element.innerText; // Preserva a formatação original
        });
        
        window.Prism.highlightAll();
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
}

highlightCodeBlock();

baSlider(".comparison-slider");

mermaid.init();

document.querySelectorAll(".loading").forEach(elem=>{
  elem.classList.remove("loading")
})

document.querySelectorAll(".loadable").forEach(elem=>{
  elem.classList.remove("loadable")
})

//mathjax
console.log(isInEditor())
if(!isInEditor()){
  console.log(isInEditor())

  var body = document.body.textContent;
    if (body.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/)) {
      if (!window.MathJax) {
        window.MathJax = {
          tex: {
            inlineMath: {'[+]': [['$', '$']]}
          }
        };
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
      document.head.appendChild(script);
    }
}


