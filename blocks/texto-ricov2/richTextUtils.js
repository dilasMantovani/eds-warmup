import { enhancedIsInEditor } from "../../scripts/scripts.js";

export function handleCustomRTE(block, rteField) {
  if (!rteField) return;
  
  const content = rteField;
  content.style.display = "none";
  const editor = createEditor(content);
  const mainContent = createMainContent(content);
  let joditContainer;

  initializeJoditEditor(content, editor, (container) => {
    joditContainer = container;
    setupEditButton(content, mainContent, joditContainer);
  });
}

export function createEditor(content) {
  const editor = document.createElement('textarea');
  editor.innerHTML = decodeContent(content);
  editor.style.display = "none";
  content.after(editor);
  return editor;
}

export function createMainContent(content) {
  const mainContent = document.createElement("div");
  mainContent.innerHTML = decodeContent(content);
  content.after(mainContent);
  return mainContent;
}

export function decodeContent(content) {
  const preElement = content?.querySelector("pre");
  if (!preElement?.textContent) return '';
  return atob(preElement.textContent.trim());
}

export function initializeJoditEditor(content, editor, onContainerReady) {
  setTimeout(() => {
    try {
      const jodit = Jodit.make(editor, {
        "toolbarAdaptive": false
      });

      setupJoditEvents(jodit, content);
      initializeMathType(jodit);
      
      const container = jodit.currentPlace.container;
      container.style.display = "none";
    
      onContainerReady(container);
    } catch (error) {
      console.error('Jodit error:', error);
    }
  }, 1000);
}

export function setupJoditEvents(jodit, content) {
  jodit.e.on('blur', () => {
    const preElement = content.querySelector("pre");
    if (preElement) {
      preElement.textContent = btoa(jodit?.value?.replaceAll("border-collapse:", "border-collapse: "));
    }
  });
}

export function initializeMathType(jodit) {
  if (window.wrs_int_init && jodit?.places?.[0]) {
    window.wrs_int_init(
      jodit.places[0].editor,
      jodit.places[0].container?.querySelector(".jodit-toolbar__box")
    );
  }
}

export function setupEditButton(content, mainContent, joditContainer) {
  setTimeout(() => {
    if (!enhancedIsInEditor()) {
      content.remove();
      return;
    }

    const editButton = createEditButton();
    content.after(editButton);

    let editMode = false;
    editButton.addEventListener('click', () => {
      editMode = !editMode;
      toggleEditMode(editMode, mainContent, joditContainer, editButton, content);
    });
  }, 1500);
}

export function createEditButton() {
  const editButton = document.createElement("button");
  editButton.classList.add("btn-edit");
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  return editButton;
}

export function toggleEditMode(editMode, mainContent, joditContainer, editButton, content) {
  if (editMode) {
    mainContent.style.display = "none";
    joditContainer.style.display = "block";
    editButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    content.style.display = "block";
  } else {
    mainContent.style.display = "block";
    joditContainer.style.display = "none";
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    content.style.display = "none";
  }
}

export function prepareRichTextContent(contentElement) {
  if (contentElement.querySelector('pre')) {
    return contentElement;
  }
  
  const container = document.createElement('div');
  container.classList.add('rich-text-container');
  container.appendChild(createRichTextContent(contentElement.textContent.trim()));
  return container;
}

export function createRichTextContent(textContent) {
  const pre = document.createElement('pre');
  pre.textContent = btoa(`<p>${textContent}</p>`);
  return pre;
} 