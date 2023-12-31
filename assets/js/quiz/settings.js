import Quiz from "./quiz.js";

class Settings {
    constructor() {
        // get all settings category, nQuestions, startBtn, difficulty.
        this.settingDom = document.querySelector(".settings");
        this.quizDom = document.querySelector(".quiz");
        this.categoryDom = document.querySelector("#category");
        this.nQuestionDom = document.querySelector("#nQuestions");
        this.startBtn = document.querySelector("#startBtn");
        this.difficulty = [
            document.querySelector('#easy'),
            document.querySelector('#medium'),
            document.querySelector('#hard')
        ];

        this.quiz = [];

        // add event listener to the startBtn to start settings.
        this.startBtn.addEventListener("click", this.startQuizApp);
        
    }
    
    startQuizApp = async () => {
        try {
            // get amount of questions.
            const amount = this.getAmount();

            // get category.
            const categoryId = this.categoryDom.value;

            // get difficulty.
            const difficulty = this.getDifficulty();
            
            // get url of questions api.
            const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

            // wait for the data from api.
            let {results} = await this.fetchData(url);
            console.log(results)

            this.quiz = new Quiz(this.quizDom, amount, results);

            this.toggleElements();
        } catch (error) {
            alert(error);
            location.reload();
        }
    };

    // fetch data and wait for the response.
    fetchData = async (url) => {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    }
    
    // toggle between settings and quiz div.
    toggleElements = () => {
        this.quizDom.style.display = "block";
        this.settingDom.style.display = "none";
    };
    
    // get number of questions.
    getAmount = () => {
        const amount = this.nQuestionDom.value;
        if(amount > 0 && amount <= 20) {
            return amount;
        } else {
            alert("Please enter a vaild number questions");
            location.reload();
        }
    };
    
    // get the choosed difficulty.
    getDifficulty = () => {
        const difficulty = this.difficulty.filter(ele => ele.checked);
        if(difficulty.length === 1) {
            return difficulty[0].id;
        } else {
            alert("Please select difficult");
            location.reload();
        }
    }
    
};

export default Settings;