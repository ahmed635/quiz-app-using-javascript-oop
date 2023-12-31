import Final from "./final.js";
import Question from './question.js';


class Quiz {
    constructor(quizElment, amount, questions) {
        // get all selector for the quiz [current, total number of question, next btn].
        this.quizElment = quizElment;
        this.currentElement = document.querySelector(".current");
        this.totalElement = document.querySelector(".total");
        this.finalElement = document.querySelector(".final");
        this.nextBtn = document.querySelector("#next");

        this.totalAmount = amount;
        this.answeredAmount = 0;

        this.questions = this.setQuestion(questions);
        this.nextBtn.addEventListener('click', this.nextQuestion);
        this.renderQuestion();
    }

    setQuestion(questions) {
        // create new instance of class question.
        return questions.map( question => new Question(question));
    }

    renderQuestion() {
        // render the question in dom.
        this.questions[this.answeredAmount].render(); // first question.
        this.currentElement.innerHTML = this.answeredAmount + 1;        
        this.totalElement.innerHTML = this.totalAmount;
    }

    nextQuestion = () => {
        // get the next question.
        const checkedElement = this.questions[this.answeredAmount].answerElements.filter(ele => ele.firstChild.checked);
        if(checkedElement.length == 0) {
            alert("check element");
            location.reload();
        } else {
            console.log(checkedElement);
            this.questions[this.answeredAmount].answer(checkedElement);
            this.answeredAmount++;
            this.answeredAmount < this.totalAmount ? this.renderQuestion(): this.endQuizApp();
        }
    }

    endQuizApp() {
        // end the quiz.
        this.quizElment.style.display = "none";
        this.finalElement.style.display = "block";
        const correct = this.countCorrectAnswer();
        new Final(correct, this.totalAmount);
    }

    countCorrectAnswer() {
        // cout the correct answer to get the final results.
        console.log("countCorrectAnswer");
        let count = 0;
        this.questions.forEach(question => {
            if(question.isCorrect) {
                count++;
                console.log(count);
            }
        });
        return count;
    }
}

export default Quiz;