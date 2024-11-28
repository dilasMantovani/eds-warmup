import { moveInstrumentation } from "../../scripts/scripts.js"

export default function decorate(block) {
  const fakeElement = document.createElement("div");
  moveInstrumentation(block.children[0], fakeElement)
}