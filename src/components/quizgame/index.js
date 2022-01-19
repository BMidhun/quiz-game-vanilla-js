import { createElement } from "../../utils.js";
import { Loading } from "../loading.js";
import { QuizInfo } from "../quizInfo.js";
import { QuizBoard } from "./quizboard.js";

function QuizGame(props) {
  const state = {
    questionsList: [],
  };

  let returnProps = render();

  async function getQuestions() {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple&category=21"
    );
    return await response.json();
  }

  function onGameComplete() {
    const { appRoot } = props;
    returnProps.unMount();

    const quizInfoComponent = QuizInfo({ parentRoot: appRoot });

    appRoot.appendChild(quizInfoComponent.rootElement);
  }

  function render() {
    const rootElement = createElement({
      elementType: "div",
    });

    const loadingComponent = Loading();
    showLoader(true);
    getQuestions()
      .then((data) => {
        console.log(data);
        showLoader(false);
        state.questionsList = data?.results;
        const quizBoardComponent = QuizBoard({
          questionList: state.questionsList,
          username: props.username,
          parentRootElement: rootElement,
          onGameComplete,
        });
        rootElement.appendChild(quizBoardComponent.rootElement);
      })
      .catch((err) => console.log(err));

    function showLoader(show) {
      if (!show) {
        loadingComponent.unMount();
        return;
      }
      document.getElementById("root").appendChild(loadingComponent.rootElement);
    }

    function unMount() {
      rootElement.remove();
    }

    return { rootElement, unMount };
  }

  return returnProps;
}

export { QuizGame };
