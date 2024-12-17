export default function decorate(block) {
 const titulo = block.children[0];
 const tituloText = block.children[0].textContent;
 const imagemCapa = block.children[1];

 const capa = document.createElement("div");
 capa.classList.add("capa");
 capa.innerHTML=`<div class="capa__title"><h1>${tituloText}</h1></div>`;

 const folha = document.createElement("div");
 folha.classList.add("folha")

 titulo.remove();
 imagemCapa.remove();

 Array.from(block.children).forEach(child =>{
  folha.append(child)
 })
 block.append(capa);
 block.append(folha)

}