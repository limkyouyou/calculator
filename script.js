
const operatorBtns = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const clearBtn = document.querySelector('#clear');
const backBtn = document.querySelector('#back');

const events = ['click', 'keydown'];
let currentNum =[];
let previousOperator;
let currentOperator;
let num1;
let num2;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1/num2;
}

function operate(currentOp, num1, num2) {
  if (currentOp === 'add') {
    return add(num1, num2);
  } else if (currentOp === 'subtract') {
    return subtract(num1, num2);
  } else if (currentOp === 'multiply') {
    return multiply(num1, num2);
  } else if (currentOp === 'divide' && num2 !== '0') {
    return divide(num1, num2);
  }
}

function storeDisplayNum(selected) {
  currentNum.push(selected.dataset.num);
  if (!currentOperator) {
    num1 = +(currentNum.join(''));
  } else {
    num2 = +(currentNum.join(''));
  }
  display.textContent = currentNum.join('');
}

function runOperator(e) {
    currentNum = [];
    currentOperator = e.target.dataset.op;
    if (previousOperator === 'divide' && num2 === 0) {
      alert('This is non sequitur.. ERROR.. ERROR.. Self-destruction mode initiated.. 5.. 4.. 3.. 2.. 1..');
      alert('BOOM!');
      return num2 = '';
    } else if (previousOperator && num2) {
      const solution = operate(previousOperator, num1, num2)
      num1 = solution;
      num2 = '';
      display.textContent = +(num1.toFixed(1));
    }
    previousOperator = currentOperator;
  }

function clear() {
  confirm("Clear all data?")
  if (confirm) {
    currentNum = [];
    num1 = '';
    num2 = '';
    currentOperator = '';
    previousOperator = '';
    display.textContent = '';
    alert("Data cleared");
  }
}

function backspace() {
  currentNum.splice(-1,1);
  if (!num2) {
    num1 = +(currentNum.join(''));
  } else {
    num2 = +(currentNum.join(''));
  }
  display.textContent = currentNum.join('');
}

function whichItem(e) {
  const numClick = document.querySelector(`button[data-num="${e.target.dataset.num}"]`)
  const numKey = document.querySelector(`button[data-num-key="${e.keyCode}"]`)
  if (numKey) {
    storeDisplayNum(numKey);
  } else if (numClick) {
    storeDisplayNum(numClick);
  }
  console.log(e.keyCode);
}

operatorBtns.forEach((btn) => btn.addEventListener('click', runOperator));
clearBtn.addEventListener('click', clear);
backBtn.addEventListener('click', backspace);
events.forEach((action) => window.addEventListener(action, whichItem));