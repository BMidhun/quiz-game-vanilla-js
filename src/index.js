import { App } from "./components/app.js";
import { Header } from "./components/header.js";
import { createElement } from "./utils.js";

function main() {
  const root = document.getElementById("root");

  const app = renderApp();
  root.appendChild(app.rootElement);
}

function renderApp() {
  function render() {
    const rootElement = createElement({
      elementType: "div",
      id: "app",
    });

    const headerComponent = Header();
    const appComponent = App();

    rootElement.appendChild(headerComponent.rootElement);
    rootElement.appendChild(appComponent.rootElement);

    function unMount() {
      rootElement.remove();
    }

    return { rootElement, unMount };
  }

  return { ...render() };
}

main();
