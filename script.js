const numBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
let currentNum =[];
let num1;

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
  if (currentOp === add) {
    return add(num1, num2);
  } else if (currentOp === subtract) {
    return subtract(num1, num2);
  } else if (currentOp === multiply) {
    return multiply(num1, num2);
  } else if (currentOp === divide) {
    return divide(num1, num2);
  }
}

function storeDisplayNum(e) {
  currentNum.push(e.target.dataset.num);
  display.textContent = currentNum.join('');
  num1 = currentNum.join('');
}

function runOperator(e) {
  if (num1) {
    currentOperator = e.target.dataset.key;
    console.log(currentOperator);
  }
}

numBtns.forEach((btn) => btn.addEventListener('click', storeDisplayNum));
operatorBtns.forEach((btn) => btn.addEventListener('click', runOperator));
