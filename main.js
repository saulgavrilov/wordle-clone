const tileDisplay = document.querySelector('.tile-container');
const messageDisplay = document.querySelector('.message-container');
const keyboard = document.querySelector('.keyboard-container');

const wordle = 'SUPER';

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '<<',
];

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement('div');

  rowElement.setAttribute('id', `guessRow-${guessRowIndex}`);

  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement('div');

    tileElement.setAttribute(
      'id',
      `guessRow-${guessRowIndex}-tile-${guessIndex}`
    );

    tileElement.classList.add('tile');

    rowElement.appendChild(tileElement);
  });

  tileDisplay.appendChild(rowElement);
});

keys.forEach((key) => {
  const buttonElement = document.createElement('button');

  buttonElement.textContent = key;

  buttonElement.setAttribute('id', key);

  buttonElement.addEventListener('click', () => handleClick(key));

  keyboard.appendChild(buttonElement);
});

const handleClick = (letter) => {
  if (letter === '<<') {
    deleteLetter();
    return;
  } else if (letter === 'ENTER') {
    checkRow();
    return;
  } else {
    addLetter(letter);
  }
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    );

    tile.textContent = letter;

    tile.setAttribute('data', letter);
    guessRows[currentRow][currentTile] = letter;
    currentTile += 1;
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile -= 1;

    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    );

    tile.textContent = '';
    tile.setAttribute('data', '');
    guessRows[currentRow][currentTile] = '';
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join('');
  flipTile();
  if (currentTile > 4) {
    if (wordle === guess) {
      showMessage('Good Job !');
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        showMessage('Game Over !');
        isGameOver = true;
        return;
      }

      if (currentRow < 5) {
        currentRow += 1;
        currentTile = 0;
      }
    }
  }
};

const flipTile = () => {
  const rowTiles = document.getElementById(`guessRow-${currentRow}`).childNodes;
  let checkWordle = wordle;
  const guess = [];

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute('data'), color: 'gray-overlay' });
  });

  guess.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = 'green-overlay';
      checkWordle = checkWordle.replace(guess.letter, '');
    }
  });

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'yellow-overlay';
      checkWordle = checkWordle.replace(guess.letter, '');
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};

const addColorToKey = (key, color) => {
  document.getElementById(key).classList.add(color);
};

const showMessage = (msg) => {
  const messageElement = document.createElement('p');

  messageElement.textContent = msg;
  messageDisplay.append(messageElement);
  setTimeout(() => {
    messageDisplay.childNodes.forEach((m) => messageDisplay.removeChild(m));
  }, 2000);
};
