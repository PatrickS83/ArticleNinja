class ArticleNinja {
  constructor() {
    this.currentWord = {};
    this.words = [
      {
        art: 'die',
        word: 'Katze',
        prio: 0
      },
      {
        art: 'das',
        word: 'Bier',
        prio: 3
      },
      {
        art: 'der',
        word: 'Wein',
        prio: 3
      },
      {
        art: 'die',
        word: 'Matratze',
        prio: 2
      },
      {
        art: 'der',
        word: 'Baum',
        prio: 1
      },
      {
        art: 'der',
        word: 'Mensch',
        prio: 4
      }
    ];
  }

  // gets a random word out of the array based on weighted probabilities
  getWord() {
    const randomNumber = Math.floor((Math.random() * 100));
    let pickedPrio;
    if (randomNumber <= 3) pickedPrio = 0;
    else if (randomNumber > 3 && randomNumber <= 10) pickedPrio = 4;
    else if (randomNumber > 10 && randomNumber <= 25) pickedPrio = 3;
    else if (randomNumber > 10 && randomNumber <= 40) pickedPrio = 2;
    else if (randomNumber > 40 && randomNumber <= 100) pickedPrio = 1;

    const newWords = this.words.filter(word => word.prio === pickedPrio);
    const randomWord = newWords[Math.floor(Math.random() * newWords.length)];
    this.currentWord = randomWord;
    return randomWord;
  }

  checkAnswer(btnArticle) {
    if (btnArticle === this.currentWord.art) {
      ui.displayAnswer('correct');
    } else {
      ui.displayAnswer('wrong');
    }
  }
}

// handles everything browser display related
class UI {
  constructor() {
    this.elements = {
      askedWord: document.querySelector('.askedWord'),
      answerWord: document.querySelector('#answer')
    };
    this.init();
  }

  init() {
    this.displayQuestion();
  }

  // display random word from array in the browser flashcard component
  displayQuestion() {
    const wordToDisplay = app.getWord();
    this.elements.askedWord.innerText = wordToDisplay.word;
    this.elements.answerWord.style.display = 'none';
    this.elements.answerWord.innerText = `${wordToDisplay.art} ${wordToDisplay.word}`;
  }

  // shows answer in browser
  displayAnswer(answered) {
    const answerSpan = this.elements.answerWord;
    if (answered === 'correct') {
      answerSpan.innerText = `${app.currentWord.art} ${app.currentWord.word}`;
      answerSpan.style.color = 'inherit';
      answerSpan.style.display = 'inherit';
    } else if (answered === 'wrong') {
      answerSpan.innerText = 'Try again :(';
      answerSpan.style.color = 'red';
      answerSpan.style.display = 'inherit';
    }
  }
}

// handles all events and button clicks
class Controller {
  constructor() {
    this.init();
  }

  init() {
    this.answerButtonListener();
  }

  // listens to clickevent on answerbuttons
  answerButtonListener() {
    const btnContainer = document.querySelector('.answer_buttons');
    btnContainer.addEventListener('click', e => app.checkAnswer(e.target.dataset.art));
  }
}

const app = new ArticleNinja();
const ui = new UI();
const controller = new Controller();

