import { randomString } from "../../scripts/scripts.js";

export default function decorate(block) {
  async function getData() {
    const url = `https://publish-p136102-e1378103.adobeaemcloud.com/graphql/execute.json/vilt-group/getTabelaByPath;path=/content/dam/vilt-group/content-fragments/teste-tabela1`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      block.innerHTML = json.data.tabelaByPath.item.tabela.html;
    } catch (error) {
      console.error(error.message);
    }
  }

  getData();
}