import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'



let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

//Creating a loop for the game to flow through
function main(currentTime) {
    if (gameOver){
        if(confirm('You Lost! Press ok to restart')){
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondSinceLastRender < 1 / SNAKE_SPEED) return
    
    
    lastRenderTime = currentTime
    
 //the two major functions the game is built on   
    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake() 
    updateFood()
    checkDeath()
}
function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard) 
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
