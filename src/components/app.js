import { createElement } from "../utils.js";
import { QuizInfo } from "./quizInfo.js";

function App() {
  let returnProps = render();
  function render() {
    const rootElement = createElement({
      elementType: "main",
      className: "container-md pb-3",
    });
    const quizInfoComponent = QuizInfo({
      parentRoot: rootElement,
    });

    rootElement.appendChild(quizInfoComponent.rootElement);

    function unMount() {
      rootElement.remove();
    }

    return { rootElement, unMount };
  }

  return returnProps;
}

export { App };
