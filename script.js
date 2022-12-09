
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

function runOperator(selected) {
    currentNum = [];
    currentOperator = selected.dataset.op;
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
    console.log(num1)
    console.log(num2)
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
  if (e.shiftKey) {
    withShiftKey(e);
  } else if (!e.shiftKey) {
    noShiftKey(e);
  }
}

function withShiftKey(e) {
  const opKey = document.querySelector(`button[data-opcode="${e.keyCode}"]`);
  if (opKey){
    runOperator(opKey)
  }
}

function noShiftKey(e) {
  const numKey = document.querySelector(`button[data-numcode="${e.keyCode}"]`);
  const opKey = document.querySelector(`button[data-opcode="${e.keyCode}"]`);
  const assignKey = document.querySelector(`button[data-assigncode="${e.keyCode}"]`)
  if (numKey) {
    storeDisplayNum(numKey);
  } else if (opKey && assignKey) {
    runOperator(assignKey);
  } else if (opKey && !assignKey) {
    runOperator(opKey);
  } 
}

function clickItem(e) {
  const numClick = document.querySelector(`button[data-num="${e.target.dataset.num}"]`);
  const opClick = document.querySelector(`button[data-op="${e.target.dataset.op}"]`);
  const assignClick = document.querySelector(`button[data-assigncode="${e.target.dataset.assigncode}"]`)
  if (numClick) {
    storeDisplayNum(numClick);
  } else if (opClick) {
    runOperator(opClick);
  } else if (assignClick) {
    runOperator(assignClick);
  }
}

clearBtn.addEventListener('click', clear);
backBtn.addEventListener('click', backspace);
window.addEventListener('click', clickItem);
window.addEventListener('keydown', whichItem);