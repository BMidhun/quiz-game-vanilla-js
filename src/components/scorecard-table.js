import { createElement } from "../utils.js";

function ScoreCardTable() {
  function displayScore(scoreCardTableBody) {
    const scoreCard = localStorage.getItem("scoreCard");
    if (!scoreCard) {
      const noRecordsFound = createElement({
        elementType: "div",
        textContent: "No records found",
        className: "text-center mt-3",
      });
      scoreCardTableBody.appendChild(noRecordsFound);
      return;
    }
    for (let item of JSON.parse(scoreCard)) {
      const tableRow = createElement({
        elementType: "tr",
        className: "text-light",
      });

      const tableColUserName = createElement({
        elementType: "td",
        textContent: item.username,
      });

      const tableColUserScore = createElement({
        elementType: "td",
        textContent: item.score,
      });

      tableRow.appendChild(tableColUserName);
      tableRow.appendChild(tableColUserScore);

      scoreCardTableBody.appendChild(tableRow);
    }
  }
  function render() {
    const rootElement = createElement({
      elementType: "div",
      id: "scorecard",
      className:
        "position-fixed top-0 start-0 w-100 h-100 bg-dark text-light p-3",
      style: "z-index:2000",
    });

    const scoreCardHeader = createElement({
      elementType: "div",
      className:
        "d-flex justify-content-between align-items-center mb-4 border-bottom pb-3",
    });

    const heading = createElement({
      elementType: "h2",
      textContent: "Score Card",
    });

    const closeBtn = createElement({
      elementType: "button",
      className: "btn btn-secondary",
      textContent: "Close",
      id: "closeScoreCardBtn",
      onclick: (e) => {
        unMount();
      },
    });

    const scoreCardTable = createElement({
      elementType: "table",
      className: "table table-hover text-light",
      id: "scorecard-table",
    });

    const scoreCardTableHead = createElement({
      elementType: "thead",
    });

    const scoreCardTableBody = createElement({
      elementType: "tbody",
    });

    const tableCols = ["Name", "Score"];

    for (let col of tableCols) {
      const colElement = createElement({ elementType: "th", textContent: col });
      scoreCardTableHead.appendChild(colElement);
    }

    displayScore(scoreCardTableBody);

    scoreCardHeader.appendChild(heading);
    scoreCardHeader.appendChild(closeBtn);
    scoreCardTable.appendChild(scoreCardTableHead);
    scoreCardTable.appendChild(scoreCardTableBody);
    rootElement.appendChild(scoreCardHeader);
    rootElement.appendChild(scoreCardTable);

    function unMount() {
      rootElement.remove();
    }
    return { rootElement, unMount };
  }

  return { ...render() };
}

export { ScoreCardTable };
