import { enhancedIsInEditor } from '../../scripts/scripts.js';

export default function decorate(block) {
  if (!block?.children?.[0]) return;
  console.log(block);
  handleCustomRTE(block, block.children[0]);
}

function handleCustomRTE(block, rteField) {
  const content = rteField;
  content.style.display = 'none';
  const editor = createEditor(content);
  const mainContent = createMainContent(content);
  let joditContainer;

  initializeJoditEditor(content, editor, (container) => {
    joditContainer = container;
    setupEditButton(content, mainContent, joditContainer);
  });
}

function createEditor(content) {
  const editor = document.createElement('textarea');
  editor.innerHTML = decodeContent(content);
  editor.style.display = 'none';
  content.after(editor);
  return editor;
}

function createMainContent(content) {
  const mainContent = document.createElement('div');
  mainContent.innerHTML = decodeContent(content);
  content.after(mainContent);
  return mainContent;
}

function decodeContent(content) {
  const preElement = content?.querySelector('pre');
  if (!preElement?.textContent) return '';
  return atob(preElement.textContent.trim());
}

function initializeJoditEditor(content, editor, onContainerReady) {
  setTimeout(() => {
    try {
      const jodit = Jodit.make(editor, {
        toolbarAdaptive: false,
      });

      setupJoditEvents(jodit, content);
      initializeMathType(jodit);

      const { container } = jodit.currentPlace;
      container.style.display = 'none';

      onContainerReady(container);
      console.log(jodit);
    } catch (error) {
      console.error('Jodit error:', error);
    }
  }, 1000);
}

function setupJoditEvents(jodit, content) {
  jodit.e.on('blur', () => {
    const preElement = content.querySelector('pre');
    if (preElement) {
      preElement.textContent = btoa(jodit?.value?.replaceAll('border-collapse:', 'border-collapse: '));
    }
  });
}

function initializeMathType(jodit) {
  if (window.wrs_int_init && jodit?.places?.[0]) {
    window.wrs_int_init(
      jodit.places[0].editor,
      jodit.places[0].container?.querySelector('.jodit-toolbar__box'),
    );
  }
}

function setupEditButton(content, mainContent, joditContainer) {
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

function createEditButton() {
  const editButton = document.createElement('button');
  editButton.classList.add('btn-edit');
  editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  return editButton;
}

function toggleEditMode(editMode, mainContent, joditContainer, editButton, content) {
  if (editMode) {
    console.log('editMode');
    mainContent.style.display = 'none';
    joditContainer.style.display = 'block';
    editButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    content.style.display = 'block';
  } else {
    console.log('not editMode');
    mainContent.style.display = 'block';
    joditContainer.style.display = 'none';
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    content.style.display = 'none';
  }
}
