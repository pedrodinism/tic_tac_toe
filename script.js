// Game engine module

function GameEngine () {
    const gameState = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
    };

    let lastPlayer = ""

    const play = (position) => {
        if (position < 1 || position > 9) {
            console.log("Invalid position " + position)
            return
        }
        if (gameState[position] != 0) {
            console.log("This position is already taken")
            return
        }

        let currPlayer = ""

        if (lastPlayer === "O" || lastPlayer === "") {
            currPlayer = "X"
        }
        
        if (lastPlayer === "X") {
            currPlayer = "O"
        }

        gameState[position] = currPlayer
        lastPlayer = currPlayer
    }

    const calculateWinner = () => {
        const winningCombos = [[1,2,3], [4,5,6], [7,8,9], // rows
                               [1,4,7], [2,5,8], [3,6,9], // columns
                               [1,5,9], [3,5,7]] // diagonals
        for (let combo of winningCombos) {
            const [a,b,c] = combo
            if (gameState[a] != 0 && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a]
            }
        }
    }

    const getGameState = () => {
        return gameState
    }

    return {
        play,
        getGameState,
        calculateWinner
    }
}

// Scoreboard module

function Scoreboard () {
    const score = {
        "X": 0,
        "O": 0 
    }

    const resetScore = () => {
        score["X"] = 0
        score["O"] = 0
    }

    const addPoint = (player) => {
        if (player != "X" && player != "O") {
            console.log("Invalid player " + player)
            return
        }
        if (player = "X") {
            score["X"]++
        }
        if (player = "O") {
            score["O"]++
        }
    }

    const getPlayerScore = (player) => {
        if (player != "X" && player != "O") {
            console.log("Invalid player " + player)
            return
        }
        return score[player]
    }

    return {
        resetScore,
        addPoint,
        getPlayerScore
    }
}

function Board (gameEngine) {

    const renderBoard = () => {
        const state = gameEngine.getGameState()
        for (let i = 1; i < 10; i++) {
            const value = state[i]
            if (value === 0) {
                continue
            }
            const selector = `.cell[data-index="${i}"]`;
            const cell = document.querySelector(selector)
            cell.textContent = value
        }
    }

    const handleClick = (event) => {
        const position = event.target.dataset.index
        gameEngine.play(position)
        renderBoard()
    }

    const init = () => {
        const board = document.querySelector("#board") 
        board.addEventListener("click", handleClick)
    }

    return {
        init
    }
}

const game = GameEngine()
const score = Scoreboard()
const board = Board(game).init()