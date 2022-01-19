function createElement(element) {
  const el = document.createElement(element.elementType);

  for (let prop in element) {
    if (prop !== "elementType") el[prop] = element[prop];
  }

  return el;
}

export { createElement };
