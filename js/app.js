class ArticleNinja {
  constructor() {
    this.currentWord = {};
    this.words = [
      {
        art: 'die',
        word: 'Katze',
        prio: 1
      },
      {
        art: 'das',
        word: 'Bier',
        prio: 5
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
    // placeholder for next random word
    let randomWord;

    // repeats until  current word and next word are different
    do {
      // get random word algorithm
      const randomNumber = Math.floor((Math.random() * 100));
      let pickedPrio;
      // example: 5% probability for priority 0
      if (randomNumber < 5) pickedPrio = 5;
      else if (randomNumber >= 5 && randomNumber < 15) pickedPrio = 4;
      else if (randomNumber >= 15 && randomNumber < 30) pickedPrio = 3;
      else if (randomNumber >= 30 && randomNumber < 50) pickedPrio = 2;
      else if (randomNumber >= 50 && randomNumber <= 100) pickedPrio = 1;
      const newWords = this.words.filter(word => word.prio === pickedPrio);
      randomWord = newWords[Math.floor(Math.random() * (newWords.length - 1))];
    } while (!randomWord || this.currentWord.word === randomWord.word);
    this.currentWord = randomWord;
    return randomWord;
  }

  // checks if answer by user is correct
  checkAnswer(btnArticle) {
    const answerIndex = this.words.findIndex(word => this.currentWord.word === word.word);
    const activeWord = this.words[answerIndex];
    if (btnArticle === this.currentWord.art) {
      ui.displayAnswer('correct');
      this.nextQuestion();
      if (activeWord.prio !== 1) activeWord.prio -= 1;
    } else {
      ui.displayAnswer('wrong');
      if (activeWord.prio !== 5) activeWord.prio += 1;
    }
    console.table(this.words);
  }

  nextQuestion() {
    setTimeout(() => {
      ui.displayQuestion();
    }, 800);
  }

  // add new word to the list of words
  addNewWord() {
    const priorityBtns = Array.from(document.querySelectorAll('[data-priority]'));
    const priorityValue = priorityBtns.filter(btn => btn.checked);

    const newWord = {
      art: document.getElementById('artikel').value,
      word: document.getElementById('word').value,
      prio: Number(priorityValue[0].dataset.priority)
    };
    this.words.push(newWord);
    ui.resetForm();
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

  // reset form
  resetForm() {
    document.getElementById('artikel').value = '';
    document.getElementById('word').value = '';
    const priorityBtns = document.querySelectorAll('[data-priority]');
    priorityBtns.forEach(btn => btn.checked = false);
  }

  // start app
  toggleSetupAndStart() {
    document.querySelector('.setup').style.display = 'none';
  }
}

// handles all events and button clicks
class Controller {
  constructor() {
    this.init();
  }

  init() {
    this.answerButtonListener();
    this.addWordBtnListener();
    this.startAppBtnListener();
  }

  // listens to clickevent on answerbuttons
  answerButtonListener() {
    const btnContainer = document.querySelector('.answer_buttons');
    btnContainer.addEventListener('click', e => app.checkAnswer(e.target.dataset.art));
  }

  addWordBtnListener() {
    const addWordBtn = document.querySelector('#addWordBtn');
    addWordBtn.addEventListener('click', e => app.addNewWord());
  }

  startAppBtnListener() {
    const startAppBtn = document.querySelector('#startBtn');
    startAppBtn.addEventListener('click', e => ui.toggleSetupAndStart());
    const setupBtn = document.querySelector('#setupBtn');
    setupBtn.addEventListener('click', (e) => {
      document.querySelector('.setup').style.display = 'inherit';
    });
  }
}

const app = new ArticleNinja();
const ui = new UI();
const controller = new Controller();

