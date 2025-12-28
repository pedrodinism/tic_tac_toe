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

    const play = (player, position) => {
        if (player != "O" && player != "X") {
            console.log("Invalid player " + player)
            return
        }
        if (position < 1 || position > 9) {
            console.log("Invalid position " + position)
            return
        }
        if (gameState[position] != 0) {
            console.log("This position is already taken")
            return
        }
        if (lastPlayer === player) {
            console.log("This player cannot play again since it was the last one to play")
            return
        }
        gameState[position] = player
        lastPlayer = player
    }

    return {
        play,
        gameState
    }
}