import { createElement } from "../utils.js";
import { ScoreCardTable } from "./scorecard-table.js";

function Header() {
  function render() {
    const rootElement = createElement({
      elementType: "header",
    });

    const nav = createElement({
      elementType: "nav",
      className:
        "d-flex justify-content-between align-items-center p-3 bg-light shadow-sm",
    });

    const heading = createElement({
      elementType: "h1",
      textContent: "Quiz App",
    });

    const viewScoreCardBtn = createElement({
      elementType: "button",
      className: "btn btn-primary",
      id: "viewScoreCardBtn",
      textContent: "View Scoreboard",
      onclick: onShowScoreCard,
    });

    function onShowScoreCard(event) {
      const scoreCardComponent = ScoreCardTable();
      const root = document.getElementById("root");
      root.append(scoreCardComponent.rootElement);
    }

    nav.appendChild(heading);
    nav.appendChild(viewScoreCardBtn);
    rootElement.appendChild(nav);

    function unMount() {
      rootElement.remove();
    }

    return { rootElement, unMount };
  }

  return { ...render() };
}

export { Header };
