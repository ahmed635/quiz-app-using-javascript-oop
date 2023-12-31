class Question {
    constructor(question) {
        // get question and answers place.
        this.questionElement = document.querySelector("#questions");
        this.answerElements = [
            document.querySelector("#a1"),
            document.querySelector("#a2"),
            document.querySelector("#a3"),
            document.querySelector("#a4"), 
        ];

        // get the question and all answers.
        this.correctAnswer = question.correct_answer;
        this.question = question.question;
        this.isCorrect =false;

        // collect the correct answer and all answers.
        this.answers = this.shuffleAnswers([this.correctAnswer, ...question.incorrect_answers]);
    }

    answer(checkElement) {
        // check if answer is correct.
        this.isCorrect = checkElement[0].textContent.trim() === this.correctAnswer? true : false;
        console.log(checkElement[0].textContent);
        console.log(this.correctAnswer);
    }

    render() {
        // render the question and answers.
        this.questionElement.innerHTML = this.question;
        this.answerElements.forEach((ele, index) => {
            ele.innerHTML = `<input type="radio" name="radio" id="${index}"> ` + this.answers[index];
        });
    }

    shuffleAnswers(answers) {
        // shuffle the answers the question.
        for(let i = answers.length -1; i > 0; i--){
            let rand = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[rand]] = [answers[rand], answers[i]];
        }
        return answers;
    }
}

export default Question;