const colorBox = document.getElementById('colorBox');
const colorOptionsContainer = document.getElementById('colorOptions');
const gameStatus = document.getElementById('gameStatus');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('newGameButton');

let targetColor = '';
let score = 0;

const generateRandomColor = () => {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const generateColorOptions = (correctColor) => {
	const options = [correctColor];
	while (options.length < 6) {
		const newColor = generateRandomColor();
		if (!options.includes(newColor)) {
			options.push(newColor);
		}
	}
	return options.sort(() => Math.random() - 0.5);
};

const startNewGame = () => {
	targetColor = generateRandomColor();
	colorBox.style.backgroundColor = targetColor;
  gameStatus.classList.contains('opacity-100') && gameStatus.classList.remove('opacity-100');
	gameStatus.classList.add('opacity-0');

	const colorOptions = generateColorOptions(targetColor);
	colorOptionsContainer.innerHTML = '';

	colorOptions.forEach((color) => {
		const button = document.createElement('button');
		button.setAttribute('data-testid', 'colorOption');
		button.style.backgroundColor = color;
    button.style.border = '1px solid rgba(0, 0, 0, 0.35)';
		button.onclick = () => handleGuess(color);
		colorOptionsContainer.appendChild(button);
	});

  scoreDisplay.textContent = `Score: ${score}`;
};

const handleGuess = (color) => {
	if (color === targetColor) {
		gameStatus.textContent = 'Correct!';
		gameStatus.className = 'text-2xl font-semibold text-green-600 opacity-100';
		score++;
		setTimeout(startNewGame, 1500);
	} else {
		gameStatus.textContent = 'Wrong! Try again.';
		gameStatus.className = 'text-2xl font-semibold text-red-600 opacity-100';
	}
	scoreDisplay.textContent = `Score: ${score}`;
};

newGameButton.addEventListener('click', () => {
  score = 0;
  startNewGame();
});

document.addEventListener('DOMContentLoaded', startNewGame);
