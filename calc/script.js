let number = '';
let number2 = '';
let action = '';
let sum = null;
const calcArea = document.querySelector('.calc__area');

document.querySelectorAll('.calc__button.action').forEach((button) => {
  button.addEventListener('click', (e) => {
    if (!button.classList.contains('perc')) {
      validateActions(e.target.firstChild.data);
      transformFont();
    }
  });
});

document.querySelector('.clear').addEventListener('click', (e) => {
  clearAll();
  transformFont();
});

document.querySelectorAll('.num').forEach((button) => {
  button.addEventListener('click', (e) => {
    !action
      ? (number = validateNumbers(number, e.target.firstChild.data))
      : (number2 = validateNumbers(number2, e.target.firstChild.data));
    transformFont();
  });
});

document.querySelector('.equal').addEventListener('click', (e) => {
  if (number && number2 && action) {
    let result = calcSum();
    checkResult(result);
    number2 = '';
    action = '';
    sum = null;
  }
});

document.querySelector('.perc').addEventListener('click', (e) => {
  if (number && !number2 && !action) {
    let { num, prevStr } = converToPerc(number);
    number = num.toString();
    calcArea.value = calcArea.value.substring(0, calcArea.value.length - +prevStr) + number;
    transformFont();
  } else if (number && number2) {
    let { num, prevStr } = converToPerc(number2);
    number2 = num.toString();
    calcArea.value = calcArea.value.substring(0, calcArea.value.length - +prevStr) + number2;
    transformFont();
  }
});

function converToPerc(num) {
  let prevNum;
  num === '.' ? (prevNum = 0) : (prevNum = num);
  return {
    num: prevNum / 100,
    prevStr: prevNum.toString().length,
  };
}

function validateActions(currentAction) {
  let replaceAcBfNum1 = number === '' && number2 === '' && action;
  let replaceAcBfNum2 = number != '' && action && !action.includes(currentAction) && number2 === '';
  let isRepeatedBfNum2 = number != '' && action.includes(currentAction) && number2 === '';
  let isCalc = action && number && number2;
  if (replaceAcBfNum1) {
    action = currentAction;
    calcArea.value = action;
  } else if (isRepeatedBfNum2) {
    calcArea.value = calcArea.value;
  } else if (replaceAcBfNum2) {
    action = currentAction;
    calcArea.value = calcArea.value.substring(0, calcArea.value.length - 1) + action;
  } else {
    if (isCalc) {
      calcSum();
      number = sum.toString();
      number2 = '';
    }
    action = currentAction;
    calcArea.value += currentAction;
  }
}

function validateNumbers(num, currentValue) {
  let isDot = num.toString().includes('.') && currentValue === '.';
  let isZero = num.toString().includes('0') && num.toString().length === 1;
  let setZero = isZero && currentValue === '0';
  let replaceZero = isZero && currentValue != 0 && currentValue != '.';

  if (isDot) {
    return num;
  } else if (setZero) {
    return num;
  } else if (replaceZero) {
    calcArea.value = calcArea.value.substring(0, calcArea.value.length - 1) + currentValue;
    return currentValue;
  } else {
    if (!number && action) {
      number = '0';
    }
    calcArea.value += currentValue;
    return (num += currentValue);
  }
}

function calcSum() {
  switch (action) {
    case '+':
      sum = +number + +number2;
      return checkSum(sum);
    case '-':
      sum = +number - +number2;
      return checkSum(sum);
    case 'X':
      sum = +number * +number2;
      return checkSum(sum);
    case '/':
      if (+number2 === 0) {
        return 'На ноль делить нельзя';
      }
      sum = +number / +number2;
      return checkSum(sum);
    default:
      throw new Error('Unexpected action');
  }
}

function checkSum(sum) {
  return Number.isInteger(sum) ? sum : sum.toFixed(3);
}

function checkResult(res) {
  if (res === 'На ноль делить нельзя') {
    showError(res);
  } else if (isNaN(res)) {
    showError(`Некорректный ввод`);
  } else {
    calcArea.value = res;
    number = res.toString();
  }
}

function showError(message) {
  calcArea.value = '';
  calcArea.placeholder = message;
  transformFont();
  setTimeout(() => {
    calcArea.placeholder = 'Ввод';
    transformFont();
  }, 1000);
  number = '';
}

function clearAll() {
  number = '';
  calcArea.value = '';
  number2 = '';
  action = '';
  sum = null;
}

function transformFont() {
  if (calcArea.value.length >= 18 || calcArea.placeholder.length >= 18) {
    calcArea.style.fontSize = 12 + 'px';
  } else {
    calcArea.style.fontSize = 22 + 'px';
  }
}
