import { createElement } from "../utils.js";

function Loading() {
  function render() {
    const rootElement = createElement({
      elementType: "div",
      className:
        "postion-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center",
    });

    const loader = createElement({
      elementType: "div",
      className: "spinner-border",
      role: "status",
    });

    const spinner = createElement({
      elementType: "span",
      className: "visually-hidden",
      textContent: "Loading...",
    });

    loader.appendChild(spinner);
    rootElement.appendChild(loader);

    function unMount() {
      rootElement.remove();
    }

    return { rootElement, unMount };
  }

  return { ...render() };
}

export { Loading };
