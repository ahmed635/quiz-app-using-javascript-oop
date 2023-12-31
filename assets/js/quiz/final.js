class Final {
    constructor(correctanswers, totalAmount) {
        // get the score element and again button.
        this.scoreElement = document.querySelector(".score");
        this.againBtn = document.querySelector("#again");

        // render numbers of questions that are answerd.
        this.render(correctanswers, totalAmount);

        // click again button to refresh the page again.
        this.againBtn.addEventListener('click', this.startAgain);
    }

    startAgain = () => {
        // reload the page.
        location.reload();
    }

    render(correctanswers, totalAmount) {
        // render numbers of answered question and total questions number.
        this.scoreElement.innerHTML = `You answered ${correctanswers} out of ${totalAmount} correct`;
    }
} 

export default Final;