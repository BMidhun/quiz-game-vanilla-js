import { createElement } from "../../utils.js";

function QuizScore(props) {
  let returnProps = render();

  function onNewGame() {
    returnProps.unMount();
    props.onGameComplete();
  }

  function render() {
    const rootElement = createElement({
      elementType: "div",
      className: "mt-3 text-center shadow p-3 border-sm",
    });

    const heading = createElement({
      elementType: "h3",
      className: "text-center mt-3",
      textContent: "Your Score",
    });

    const scoreText = createElement({
      elementType: "h3",
      className: "text-center mt-3",
      textContent: `${
        props.score === "Disqualified" ? "Disqualified" : props.score + "/500"
      }`,
    });

    const homeButton = createElement({
      elementType: "button",
      className:
        "btn btn-primary w-50 d-flex justify-content-center mt-3 mx-auto",
      textContent: "New Game",
      onclick: onNewGame,
    });

    rootElement.appendChild(heading);
    rootElement.appendChild(scoreText);
    rootElement.appendChild(homeButton);

    function unMount() {
      rootElement.remove();
    }

    return { rootElement, unMount };
  }

  return returnProps;
}

export { QuizScore };
