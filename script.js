let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset");
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true;
let count =0;
const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Player O
        if (turnO) {
            box.innerText = "O"
            turnO = false;
        }
        // Player X
        else {
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            showDraw();
        }

    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} is the winner!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    celebrateConfetti();
}

const showDraw =()=>{
    msg.innerText= "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
}

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 === pos2 && pos2 === pos3 && pos1 !== "") {
            showWinner(pos1);
            return true
        }
    }
}

newGameButton.addEventListener("click", resetGame)
resetButton.addEventListener("click", resetGame)








function celebrateConfetti() {
    if (window.confetti) {
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}