import { createElement } from "../../utils.js";
import { QuizScore } from "./quiz-score.js";

function QuizBoard(props) {
  const { questionList, username } = props;

  console.log(questionList);

  let timerRef, questionRef, quizTimer;

  const state = {
    timerState: 10,
    currentQuestionIndex: 0,
    score: 0,
  };

  let returnProps = render();

  function onOptionSelect(selectedOption) {
    return (event) => {
      clearInterval(quizTimer);
      disableOptionsButtons();
      showAnswer(selectedOption);
    };
  }

  function showAnswer(selectedOption) {
    const correct_answer =
      questionList[state.currentQuestionIndex].correct_answer;
    const correctAnswerElement = document.getElementsByName(correct_answer)[0];

    if (selectedOption) {
      if (selectedOption !== correct_answer) {
        const selectedOptionElement =
          document.getElementsByName(selectedOption)[0];

        selectedOptionElement.className =
          "mt-4 btn btn-danger w-100 option-btn shadow-sm";
      } else {
        computeScore();
      }
    }

    correctAnswerElement.className =
      "mt-4 btn btn-success w-100 option-btn shadow-sm";

    renderNextBtn();
  }

  function computeScore() {
    state.score = state.score + (state.timerState + 1) * 10;
    return;
  }

  function updateScoreCard(hasDisqualified) {
    const score = hasDisqualified ? "Disqualified" : state.score;
    let scoreCard = localStorage.getItem("scoreCard");
    scoreCard = scoreCard ? JSON.parse(scoreCard) : [];
    scoreCard.push({ username, score });
    localStorage.setItem("scoreCard", JSON.stringify(scoreCard));
    return score;
  }

  function onNextQuestion(hasQuizCompleted, hasDisqualified) {
    console.log(username, state.score);

    if (!hasQuizCompleted) {
      returnProps.unMount();
      state.timerState = 10;
      state.currentQuestionIndex++;
      returnProps = render();
      props.parentRootElement.appendChild(returnProps.rootElement);
      return;
    }

    const score = updateScoreCard(hasDisqualified);
    returnProps.unMount();
    const quizScoreComponent = QuizScore({
      score,
      onGameComplete: props.onGameComplete,
    });
    props.parentRootElement.appendChild(quizScoreComponent.rootElement);
  }

  function renderNextBtn() {
    const textContent =
      state.currentQuestionIndex === questionList.length - 1
        ? "View Score"
        : "Next";
    const nextQuestionBtn = createElement({
      elementType: "button",
      className:
        "btn btn-primary mt-5 d-flex justify-content-center mx-auto w-50",
      onclick: () => {
        onNextQuestion(textContent === "View Score");
      },
      textContent,
    });

    returnProps.rootElement.appendChild(nextQuestionBtn);
  }

  function disableOptionsButtons() {
    const options = document.getElementsByClassName("option-btn");
    for (let option of options) {
      option.disabled = true;
      option.className = "mt-4 btn btn-light w-100 option-btn shadow-sm";
    }
  }

  function afterRender() {
    quizTimer = setInterval(() => {
      timerRef.textContent = `${state.timerState}s`;
      if (state.timerState === 0) {
        clearInterval(quizTimer);
        disableOptionsButtons();
        showAnswer(null);
      }
      state.timerState--;
    }, 1000);

    document.addEventListener("visibilitychange", onScreenChange, true);
    window.addEventListener("beforeunload", onRefreshorCloseTab, true);
  }

  function onScreenChange() {
    if (document.hidden) {
      alert("User has been disqualifed!");
      onNextQuestion(true, true);
    }
  }

  function onRefreshorCloseTab(event) {
    onNextQuestion(true, true);
    event.preventDefault();
    event.returnValue = "User has been disqualifed!";
  }

  function render() {
    const rootElement = createElement({
      elementType: "div",
      className: "position-relative shadow-sm border p-3 mt-5 shadow",
    });

    const timer = createElement({
      elementType: "span",
      className:
        "background border rounded position-absolute text-light bg-dark p-3",
      textContent: "",
      style: `top:-15px; left:50%; transform:translateX(-50%);`,
    });

    timerRef = timer;

    const currentQuestion = createElement({
      elementType: "h5",
      innerHTML: questionList[state.currentQuestionIndex].question,
      className: "my-5 text-center lh-base",
    });

    questionRef = currentQuestion;

    const optionsList = createElement({
      elementType: "ul",
      className: "list-unstyled",
    });

    const options = [
      ...questionList[state.currentQuestionIndex].incorrect_answers,
      questionList[state.currentQuestionIndex].correct_answer,
    ].sort((a, b) =>
      Math.floor(Math.random() * b.length - Math.random() * a.length)
    );

    for (let option of options) {
      const optionElement = createElement({ elementType: "li" });
      const optionButton = createElement({
        elementType: "button",
        innerHTML: option,
        className: "mt-4 btn btn-secondary w-100 option-btn",
        name: option,
        onclick: onOptionSelect(option),
      });

      optionElement.appendChild(optionButton);
      optionsList.appendChild(optionElement);
    }

    rootElement.appendChild(timer);
    rootElement.appendChild(currentQuestion);
    rootElement.appendChild(optionsList);

    function unMount() {
      rootElement.remove();
      clearInterval(quizTimer);
      document.removeEventListener("visibilitychange", onScreenChange, true);
      window.removeEventListener("beforeunload", onRefreshorCloseTab, true);
    }

    afterRender();

    return { rootElement, unMount };
  }

  return returnProps;
}

export { QuizBoard };
