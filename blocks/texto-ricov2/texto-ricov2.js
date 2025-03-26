import { handleCustomRTE } from "../../scripts/scripts.js";

export default function decorate(block) {
  handleCustomRTE(block, block.children[0])
}