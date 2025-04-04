import { handleCustomRTE } from "./richTextUtils.js";

export default function decorate(block) {
  if (!block?.children?.[0]) return;
  handleCustomRTE(block, block.children[0]);
}