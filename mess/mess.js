const cardsArray = [
    { name: 'apple', img: 'mess/icons/apple.png' },
    { name: 'banana', img: 'mess/icons/banana.png' },
    { name: 'blackberry', img: 'mess/icons/blackberry.png' },
    { name: 'pear', img: 'mess/icons/pear.png' },
    { name: 'watermelon', img: 'mess/icons/watermelon.png' },
    { name: 'strawberry', img: 'mess/icons/strawberry.png' },
    { name: 'lime', img: 'mess/icons/lime.png' },
    { name: 'blueberry', img: 'mess/icons/blueberry.png' },
];

const delay = 1200;
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;

const game = document.querySelector('.game-board');
const gameGrid = shuffleArray(cardsArray.concat(cardsArray));

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front'); // Corrected typo

    const back = document.createElement('div');
    back.style.backgroundImage = `url(${item.img})`;

    card.appendChild(front);
    card.appendChild(back);

    return card;
}

function initGameBoard() {
    gameGrid.forEach(item => {
        const card = createCard(item); // Corrected the function call
        game.appendChild(card);
    });
}

function handleCardClick(event) {
    const clicked = event.target;

    if (clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('match') ||
        clicked.parentNode.classList.contains('selected')) {
        return;
    }

    if (count < 2) {
        count++;
        clicked.parentNode.classList.add('selected', 'flipped');
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay); // Corrected placement of reset
            }
        }
        previousTarget = clicked;
    }
}

function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.add('match'));
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected'); // Fixed typo
    selected.forEach(card => card.classList.remove('selected', 'flipped'));
}

game.addEventListener('click', handleCardClick);

initGameBoard();
