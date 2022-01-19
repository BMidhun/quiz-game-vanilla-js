import { createElement } from "../utils.js";
import { QuizGame } from "./quizgame/index.js";

const rules = [
  "You will have to attend 5 questions",
  "You will have 10 seconds to answer a question",
  `Failing to answer a question in time or selecting incorrect answer will
                result in scoring 0 points`,
  ` On selecting the right answer, the game will award you points based on how
            quick you were able to answer the question`,
  `Any attempt to leave the quiz, switching to another tab or closing the tab
        will result in disqualification`,
];

function QuizInfo(props) {
  const state = {
    username: "",
  };

  let returnProps = { ...render() };

  function handleUserName(event) {
    state.username = event.target.value;
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    if (state.username.trim() !== "") {
      returnProps.unMount();
      const { parentRoot } = props;

      const quizGameComponent = await QuizGame({
        username: state.username,
        appRoot: props.parentRoot,
      });
      parentRoot.appendChild(quizGameComponent.rootElement);
    }
  }

  function render() {
    const rootElement = createElement({
      elementType: "div",
      className: "mt-3 border p-3 shadow",
    });

    const heading = createElement({
      elementType: "h4",
      className: "border-bottom pb-2",
      textContent: "About the quiz",
    });

    const rulesList = createElement({
      elementType: "ul",
    });

    const form = createElement({ elementType: "form", onsubmit: onFormSubmit });

    const formWrapper = createElement({
      elementType: "div",
      className: "my-3",
    });

    const input = createElement({
      elementType: "input",
      type: "text",
      placeholder: "Enter your name",
      name: "username",
      className: "form-control",
      id: "username",
      value: state.username,
      required: true,
      onchange: handleUserName,
    });

    const button = createElement({
      elementType: "button",
      type: "submit",
      className: "btn btn-primary my-3 w-100",
      textContent: "Start quiz",
    });

    for (let rule of rules) {
      const ruleListElement = createElement({
        elementType: "li",
        textContent: rule,
      });

      rulesList.append(ruleListElement);
    }

    formWrapper.appendChild(input);
    formWrapper.appendChild(button);
    form.append(formWrapper);
    rootElement.appendChild(heading);
    rootElement.appendChild(rulesList);
    rootElement.appendChild(form);

    function unMount() {
      rootElement.remove();
    }
    return { rootElement, unMount };
  }

  return returnProps;
}

export { QuizInfo };
