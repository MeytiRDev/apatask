export function getElement(identifier: string) {
  const element = document.querySelector(identifier);
  return element;
}

export function getElementInfo(element: HTMLElement) {
  if (element instanceof HTMLElement) {
    return element.getBoundingClientRect();
  }
  return null;
}

export function getParentElement(element: HTMLElement, identifier: string) {
  const parent = element.closest(identifier);
  return parent;
}
