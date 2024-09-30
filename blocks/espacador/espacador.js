export default function decorate(block) {
    const height=block.children[0].textContent.trim();
    
    const spacer = document.createElement("div");
    spacer.style.height = height+"px" ;

    block.textContent = "";
    block.innerHTML = spacer.outerHTML;
}