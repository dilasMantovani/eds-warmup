export default function decorate(block) {
  removeDataAueAttributes(block)
}

function removeDataAueAttributes(element) {
  if (!element || !(element instanceof HTMLElement)) {
      console.error("O argumento fornecido não é um elemento HTML válido.");
      return;
  }

  // Seleciona todos os elementos filhos do elemento fornecido
  const children = element.querySelectorAll("*");

  children.forEach(child => {
      // Itera sobre os atributos do elemento filho
      Array.from(child.attributes).forEach(attr => {
          // Verifica se o nome do atributo começa com "data-aue"
          if (attr.name.startsWith("data-aue")) {
              child.removeAttribute(attr.name); // Remove o atributo
          }
      });
  });
}