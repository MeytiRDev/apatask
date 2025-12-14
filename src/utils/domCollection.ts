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
