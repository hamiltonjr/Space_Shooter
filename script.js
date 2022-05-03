// elementos da tela
const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
const pointsCounter = document.querySelector('.points');

// números mágicos
const HERO_TOP = 0;
const HERO_BOTTOM = 550; 
const HERO_LEFT = 250;
const HERO_SHIFT = 25;

const LASER_HEIGHT = 25;
const LASER_RIGHT = 400;
const LASER_SHIFT = 10;

const ALIEN_HEIGHT = 30;
const ALIEN_LEFT = 50;
const ALIEN_RIGHT = 400;
const ALIEN_TOP = 50;
const ALIEN_BOTTOM = 350;
const ALIEN_SHIFT = 3;
const ALIEN_TIME = 2;       // one alien each 2 seconds

const MILISSECONDS = 1000;  // 1 second in milisseconds
const WEAPON_POSITION = 20;

// anumação do alien
let alienInterval;

// pontuação
let points = 0;

/**
 * Função que captura ações dos botões.
 * @param {*} event 
 */
let flyShip = (event) => {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if (event.key === " " || event.key === 'ArrowRight') {
        event.preventDefault();
        fireLaser();
    }
}

/**
 * Função que move a nave do herói para cima.
 * @returns 
 */
let moveUp = () => {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    
    if (topPosition !== `${HERO_TOP}px`) {
        let position = parseInt(topPosition) - HERO_SHIFT;
        yourShip.style.top = `${position}px`;
    }
}

/**
 * Função que move a nave do herói para baixo.
 * @returns 
 */
let moveDown = () => {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

    if (topPosition !== `${HERO_BOTTOM}px`) {
        let position = parseInt(topPosition) + HERO_SHIFT;
        yourShip.style.top = `${position}px`;
    }
}

/**
 * Função de tiro.
 */
let fireLaser = () => {
    let laser = createLaserElement();
    
    playArea.appendChild(laser);
    moveLaser(laser);
}

/**
 * Função que cria o laser.
 * @returns 
 */
let createLaserElement = () => {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - WEAPON_POSITION}px`;
    
    return newLaser;
}

/**
 * Função que move o laser na tela.
 * @param {*} laser 
 */
let moveLaser = (laser) => {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => {
            if (checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
                points += 10;
                pointsCounter.innerHTML = `${points}`;
            }
        });

        if (xPosition >= LASER_RIGHT) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + LASER_SHIFT}px`;
        }
    }, 10);
}

/**
 * Função para criar inimigos aleatoriamente.
 */
let createAliens = () => {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)];
    
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = `${ALIEN_RIGHT}px`;
    newAlien.style.top = `${Math.floor(Math.random() * (ALIEN_BOTTOM - ALIEN_TOP)) + ALIEN_TOP}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

/**
 * Função de movimento dos inimigos.
 * @param {*} alien 
 */
let moveAlien = (alien) => {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if (xPosition <= ALIEN_LEFT) {
            if (Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - ALIEN_SHIFT}px`;
        }
    }, 30);
}

/**
 * Função para colisão.
 * @param {*} laser 
 * @param {*} alien 
 * @returns 
 */
let checkLaserCollision = (laser, alien) => {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - LASER_HEIGHT;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - ALIEN_HEIGHT;
    
    if (laserLeft >= 340 && laserLeft + 40 >= alienLeft) {
        return (laserTop <= alienTop && laserTop >= alienBottom);
    }

    return false;
}

/**
 * Função que associa o inicio do jogo ao botão START.
 */
startButton.addEventListener('click', (event) => {
    playGame();
})

//função de inicio do jogo
let playGame = () => {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';

    window.addEventListener('keydown', flyShip);
    
    pointsCounter.style.display = 'block';
    pointsCounter.innerHTML = `${points}`;

    alienInterval = setInterval(() => {
        createAliens();
    }, ALIEN_TIME * MILISSECONDS);
}

/**
 * Função de fim de jogo.
 */
let gameOver = () => {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    
    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = `${HERO_LEFT}px`;
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}
