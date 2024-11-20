'use strict';

import { createFocusTrap } from 'focus-trap';

const CLASSES = {
  MENU_OPEN: 'menu--open',
  PAGE_CLIP: 'page__content--clip',
};

const KEYS = {
  ESCAPE: 'Escape',
};

const elements = {
  body: document.body,
  menu: document.getElementById('menu'),
  openButton: document.getElementById('menu-open'),
  closeButton: document.getElementById('menu-close'),
};

function addAttribute(attribute, element) {
  element.setAttribute(attribute, '');
}

function removeAttribute(attribute, element) {
  element.removeAttribute(attribute);
}

function setMenuAttributes(isHidden) {
  if (isHidden) {
    addAttribute('inert', elements.menu);
    addAttribute('hidden', elements.menu);
  } else {
    removeAttribute('inert', elements.menu);
    removeAttribute('hidden', elements.menu);
  }
}

function toggleMenuState(isOpen) {
  elements.menu.classList.toggle(CLASSES.MENU_OPEN, isOpen);
  elements.body.classList.toggle(CLASSES.PAGE_CLIP, isOpen);
}

const focusTrap = createFocusTrap(elements.menu);

function openMenu() {
  setMenuAttributes(false);

  requestAnimationFrame(() => {
    void elements.menu.offsetHeight;
    toggleMenuState(true);
    focusTrap.activate();
    elements.openButton.setAttribute('aria-expanded', 'true');
  });
}

function closeMenu() {
  toggleMenuState(false);
  focusTrap.deactivate();
  addAttribute('inert', elements.menu);
  elements.openButton.setAttribute('aria-expanded', 'false');
}

function isEscapePressed(key) {
  return key === KEYS.ESCAPE;
}

function isMenuOpen() {
  return elements.menu.classList.contains(CLASSES.MENU_OPEN);
}

function shouldCloseMenu(key) {
  return isEscapePressed(key) && isMenuOpen();
}

function handleEscape(event) {
  if (shouldCloseMenu(event.key)) {
    closeMenu();
  }
}

elements.menu.addEventListener('animationend', () => {
  if (!isMenuOpen()) {
    addAttribute('hidden', elements.menu);
  }
});

window.addEventListener('keydown', handleEscape);
elements.openButton.addEventListener('click', openMenu);
elements.closeButton.addEventListener('click', closeMenu);

setMenuAttributes(true);
