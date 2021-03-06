let answers = 2;

function addPollAnswer() {
  answers++;
  const newAnswer = "<input class=\"form-control answer\" type=\"text\" name=\"answer" + answers + "\" placeholder=\"answer" + answers + "\" pattern=\"^[a-zA-Z0-9_]*$\" required>";
  document.getElementById("poll-answers").insertAdjacentHTML("beforeend", newAnswer);
}

function deleteLastAnswer() {
  if (answers > 2) {
    answers--;
    const answerElements = document.getElementsByClassName("answer");
    answerElements[answerElements.length - 1].outerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-answer-btn").addEventListener("click", addPollAnswer);
  document.getElementById("delete-answer-btn").addEventListener("click", deleteLastAnswer);
});
