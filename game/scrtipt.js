let game = [
  {
    question: 'Как называют беспилотный летательный аппарат?',
    variants: ['дрон', 'фаэтон', 'махаон', 'десептикон'],
    answer: 0,
  },
  {
    question: 'В какой игре не используют мяч?',
    variants: ['волейбол', 'бейсбол', 'теннис', 'керлинг'],
    answer: 3,
  },
  {
    question: 'В честь кого назван один из видов насекомых из рода моцартелла?',
    variants: ['Жюля Верна', 'Людвига ван Бетховена', 'Марии Кюри', 'Поля Сезанна'],
    answer: 1,
  },
  {
    question: 'Что в сказках было семимильным?',
    variants: ['ковер', 'одежда', 'сапоги', 'мотоцикл'],
    answer: 0,
  },
  {
    question: 'Как в соцсетях называется публикация с несколькими фотографиями подряд?',
    variants: ['карусель', 'барабан', 'юла', 'рулетка'],
    answer: 0,
  },
  {
    question: 'Как называют специалиста, избавляющего лес от болезней и вредителей?',
    variants: ['лесник', 'лесовик', 'леший', 'лесопатолог'],
    answer: 3,
  },
  {
    question: 'Кто не шахматист?',
    variants: ['Ян Непомнящий', 'Магнус Карлсен', 'Сергей Карякин', 'Уле-Эйнар Бьорндален'],
    answer: 3,
  },
  {
    question: 'Какая из планет Солнечной системы самая горячая?',
    variants: ['Венера', 'Марс', 'Юпитре', 'Нептун'],
    answer: 0,
  },
  {
    question: 'Какой элемент получил свое название из-за синей линии в его спектре?',
    variants: ['родий', 'индий', 'церий', 'нептуний'],
    answer: 1,
  },
  {
    question:
      'Участники какой группы записали песню, которую случайно нашли на чердаке дома в Великобритании в ноябре 2021 года?',
    variants: ['«Битлз»', '«Квин»', '«Роллинг стоунз»', '«Пинк флойд»'],
    answer: 0,
  },
  {
    question: 'Что итальянцы называют «мадоннари»?',
    variants: ['рисунки на асфальте', 'вуаль', 'период в искусстве', 'сорт яблок'],
    answer: 0,
  },
  {
    question:
      'Какое слово Георгий Данелия собирался вынужденно заменить в комедии «Кин-дза-дза» уже при монтаже фильма?',
    variants: ['чатланин', 'ку', 'пацак', 'КЦ'],
    answer: 1,
  },
  {
    question: 'Чем в портовых городах с 18-го по начало 20-го века занимались крючники?',
    variants: ['ловили рыбу', 'переносили тяжести', 'плели сети', 'сплавляли бревна'],
    answer: 1,
  },
  {
    question: 'Что писатель Томас Пинчон назвал памятником уходу оторвавшейся Луны?',
    variants: ['Стоунхендж', 'пустыню Сахара', 'Большой Барьерный риф', 'Тихий океан'],
    answer: 3,
  },
  {
    question: 'Как называют звезду, которая указала волхвам место рождения Христа?',
    variants: ['Вифлеемская', 'Алькафрах', 'Алькараб', 'Далим'],
    answer: 0,
  },
];
const text = document.querySelector('.game__circle-title p');
const questionArea = document.querySelector('.game__question');
const variantArea = document.querySelectorAll('.game__variant');
const salary = document.querySelector('.game__header-count span');
const progress = document.querySelectorAll('.game__progress-price');
const callBlock = document.querySelector('.game__help-block:last-child');
const helpUserBlock = document.querySelector('.game__help-block');
const modal = document.querySelector('.modal');

let stage = 0;
let prize = '';
let answer = null;
let question = null;
let variants = null;
let newVariants = null;
salary.textContent = '0₴';

callBlock.addEventListener('click', () => {
  setRandomAnswer();
});

helpUserBlock.addEventListener('click', () => {
  helpUser();
});

variantArea.forEach((elem, i) => {
  elem.addEventListener('click', (e) => {
    onClickAnwser(i);
  });
});

modal.addEventListener('click', (e) => {
  if (e.target.parentNode.classList.contains('modal__close')) {
    modal.classList.remove('modal__show');
    document.body.style.overflow = 'scroll';
  }
});

function onClickAnwser(i) {
  if (answer === i) {
    salary.textContent = progress[stage].textContent + '₴';
    changeStage(++stage);
  } else {
    setPrize();
    showGameOver();
  }
}

function setPrize() {
  let num = stage + 1;
  if (num > 5 && num <= 10) {
    prize = `Вы выграли: ${progress[4].innerText}₴`;
  } else if (num > 10) {
    prize = `Вы выграли: ${progress[9].innerText}₴`;
  } else {
    prize = 'Вы ответили неправильно';
  }
}

function replaceGameText(question, variants) {
  questionArea.textContent = question;
  variantArea.forEach((elem, i) => {
    elem.style.display = 'block';
    elem.textContent = `${variants[i]}`;
  });
}

function changeStage(stage) {
  if (stage === 15) {
    showGameOver(true);
    return;
  }
  question = game[stage].question;
  variants = game[stage].variants;
  newVariants = game[stage].variants;
  answer = game[stage].answer;
  progress.forEach((item) => {
    item.classList.remove('progress__active');
    progress[stage].classList.add('progress__active');
  });
  replaceGameText(question, variants);
}

function helpUser() {
  let [rightAnswer] = variants.filter((_, index) => answer === index);
  let newVariant = variants.filter((item) => item != rightAnswer);
  newVariant.length = 1;
  let variant = newVariant[0];
  newVariants = [variant, rightAnswer];
  variantArea.forEach((item) => {
    if (item.textContent != variant && item.textContent != rightAnswer) {
      item.style.display = 'none';
    }
  });
  helpUserBlock.style.display = 'none';
}

function setRandomAnswer() {
  let elements = newVariants.length - 1;
  let index = Math.floor(Math.random() * (elements - 0 + 1)) + 0;
  showFriendAnswer(variantArea[index].textContent);
  callBlock.style.display = 'none';
}

function showGameOver(win = false) {
  document.body.style.overflow = 'hidden';
  let smile;
  let status;
  win ? (smile = '😃') : (smile = '😐');
  win ? (status = 'ВЫ МИЛЛИОНЕР!!!!') : (status = 'КОНЕЦ ИГРЫ');
  win ? (prize = 'ВЫ ВЫГРАЛИ 1000000₴!!!!!!') : (prize = prize);
  modal.classList.add('modal__show');
  modal.querySelector('.modal__wrapper').innerHTML = `
  <div class="modal__icon">${smile}</div>
  <div class="modal__title">${status}</div>
  <div class="modal__total">${prize}</div>
  <button class="restart">Начать заново</button>`;
  document.querySelector('.restart').addEventListener('click', restartGame);
}

function showFriendAnswer(text) {
  document.body.style.overflow = 'hidden';
  modal.classList.add('modal__show');
  modal.querySelector('.modal__wrapper').innerHTML = `
  <div class="modal__close">
  <i class="fa-regular fa-circle-xmark"></i>
  </div>
  <div class="modal__icon">🤔</div>
  <div class="modal__title">Я думаю, что ответ:</div>
  <div class="modal__text">${text}</div>`;
}

function restartGame() {
  stage = 0;
  prize = '';
  answer = null;
  question = null;
  variants = null;
  newVariants = null;
  salary.textContent = '0₴';
  callBlock.style.display = 'block';
  helpUserBlock.style.display = 'block';
  changeStage(stage);
  modal.classList.remove('modal__show');
  document.body.style.overflow = 'scroll';
}

changeStage(stage);

text.innerHTML = text.innerHTML
  .split('')
  .map((char, i) => `<span style="transform: rotate(${i * 12.5}deg)">${char}</span>`)
  .join('');
