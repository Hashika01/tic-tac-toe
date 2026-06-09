const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

let xScore = 0;
let oScore = 0;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick(e){

    const index = e.target.dataset.index;

    if(board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;

    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if(gameActive){
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner(){

    for(let combo of winningCombinations){

        const [a,b,c] = combo;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            gameActive = false;

            statusText.textContent =
            `🎉 Player ${board[a]} Wins!`;

            if(board[a] === "X"){
                xScore++;
                xScoreText.textContent = xScore;
            }else{
                oScore++;
                oScoreText.textContent = oScore;
            }

            launchConfetti();

            return;
        }
    }

    if(!board.includes("")){
        gameActive = false;
        statusText.textContent = "🤝 Draw!";
    }
}

function restartGame(){

    board = ["","","","","","","","",""];

    gameActive = true;
    currentPlayer = "X";

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent = "";
        cell.classList.remove("x","o");
    });
}

function launchConfetti(){

    confetti({
        particleCount: 300,
        spread: 180,
        origin: { y: 0.6 }
    });

}