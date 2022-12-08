const numBtns = document.querySelectorAll('.digit');
const display = document.querySelector('#display');
let currentNum =[];

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
}

numBtns.forEach((btn) => btn.addEventListener('click', storeDisplayNum));
