// Game engine module

function GameEngine () {
    const gameState = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: ''
    };

    let lastPlayer = ""

    const play = (position) => {
        position = Number(position)
        if (position < 1 || position > 9) {
            console.log("Invalid position " + position)
            return
        }
        if (gameState[position] != '') {
            console.log("This position is already taken")
            return
        }

        const currPlayer = lastPlayer === "X" ? "O" : "X"

        gameState[position] = currPlayer
        lastPlayer = currPlayer
    }

    const calculateWinner = () => {
        const winningCombos = [[1,2,3], [4,5,6], [7,8,9], // rows
                               [1,4,7], [2,5,8], [3,6,9], // columns
                               [1,5,9], [3,5,7]] // diagonals
        for (let combo of winningCombos) {
            const [a,b,c] = combo
            if (gameState[a] != '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a]
            }
        }
    }

    const resetGameState = () => {
        for(let i = 1; i <= 9; i++) {
            gameState[i] = ''
        }
    }

    const getGameState = () => {
        return gameState
    }

    return {
        play,
        getGameState,
        calculateWinner,
        resetGameState
    }
}

// Scoreboard module

function Scoreboard () {
    const score = {
        "X": 0,
        "O": 0 
    }

    let playerX = ""
    let playerO = ""

    const setPlayerNames = (x, o) => {
        playerX = x
        playerO = o
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
        if (player === "X") {
            score["X"]++
        }
        if (player === "O") {
            score["O"]++
        }
        render()
    }

    const render = () => {
        const scoreX = document.querySelector('#scoreboard-item-X .score')
        const scoreO = document.querySelector('#scoreboard-item-O .score')
        const x = document.querySelector('#scoreboard-item-X .playerName')
        const o = document.querySelector('#scoreboard-item-O .playerName')


        scoreX.textContent = score['X']
        scoreO.textContent = score['O']
        x.textContent = playerX
        o.textContent = playerO
    }

    return {
        resetScore,
        addPoint,
        setPlayerNames,
        render
    }
}

function Board (gameEngine, scoreboard) {

    const renderBoard = () => {
        const state = gameEngine.getGameState()
        for (let i = 1; i < 10; i++) {
            const value = state[i]
            const selector = `.cell[data-index="${i}"]`;
            const cell = document.querySelector(selector)
            cell.textContent = value
        }
    }

    const handleClick = (event) => {
        if (!event.target.classList.contains("cell")) return
        const position = event.target.dataset.index
        gameEngine.play(position)
        const winner = gameEngine.calculateWinner()
        renderBoard()
        if (winner != undefined) {
            scoreboard.addPoint(winner)
            setTimeout(() => {
                gameEngine.resetGameState()
                renderBoard()
            }, 500);
        }        
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
const board = Board(game, score)
board.init()

document.querySelector('#modal').showModal()
const submitButton = document.querySelector('#submit')


submitButton.onclick = () => {
    const x = document.querySelector('#playerX').value
    const o = document.querySelector('#playerO').value 

    score.setPlayerNames(x, o)
    score.render()
    document.querySelector('#modal').close()

    board.init()
}