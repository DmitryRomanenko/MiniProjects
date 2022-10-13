const minInput = document.querySelector('.min');
const maxInput = document.querySelector('.max');
const amountInput = document.querySelector('.amount');
const checkbox = document.querySelector('.switch_1');
const resultBLock = document.querySelector('.result');
const btn = document.querySelector('.generator__button');

let min = null;
let max = null;
let amount = null;
let uniq = false;

maxInput.addEventListener('input', (e) => {
  max = e.target.value;
});
minInput.addEventListener('input', (e) => {
  min = e.target.value;
});
amountInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D|^0{1}/, '');
  amount = e.target.value;
});

checkbox.addEventListener('click', () => (uniq = !uniq));
btn.addEventListener('click', () => {
  resultBLock.classList.remove('copied');
  showGenerateResult(min, max, amount);
});

function showGenerateResult() {
  if (min > max) {
    max = `${+min + 1}`;
    maxInput.value = max;
    minInput.value = min;
  }
  if (!min) {
    min = '1';
    minInput.value = min;
  }
  if (!max) {
    max = '100';
    maxInput.value = max;
  }
  if (!amount) {
    amount = '1';
    amountInput.value = amount;
  }
  if (amount === '0') {
    amount = '1';
    amountInput.value = amount;
  }
  if (amount > 99999) {
    amount = '1';
    amountInput.value = amount;
  }
  if (+min <= -1000000000) {
    min = '1';
    minInput.value = min;
  }
  if (+max >= 1000000000) {
    max = '100';
    maxInput.value = max;
  }

  if (min && max && amount) {
    let maxVal = +max;
    let minVal = +min;
    let amountVal = +amount;
    let totalVal = maxVal - minVal + 1;
    let randomNumArr = [];
    let randomNumSet = new Set();
    for (let i = 0; i < amountVal; i++) {
      let randomNum = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
      if (uniq) {
        if (totalVal >= amountVal) {
          randomNumSet.has(randomNum) ? i-- : randomNumSet.add(randomNum);
        } else {
          resultBLock.classList.add('hide');
          document.querySelector('.result__error').classList.remove('hide');
          return;
        }
      } else {
        randomNumArr.push(randomNum);
      }
    }
    let res = randomNumArr.length > 0 ? randomNumArr.join(',') : [...randomNumSet].join(',');
    document.querySelector('.result__error').classList.add('hide');
    resultBLock.classList.remove('hide');
    let newRes = res.length > 40 ? res.substring(0, 40) + '...' : res;
    resultBLock.children[0].textContent = newRes;
    resultBLock.addEventListener('click', () => {
      navigator.clipboard.writeText(res).then(() => {
        resultBLock.classList.add('copied');
        resultBLock.children[0].textContent = 'Значения скопированы! :)';
      });
    });
  }
}
