
const display = document.querySelector('#display');


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
    currentOperator = selected.dataset.op;
    if (previousOperator === 'divide' && num2 === 0) {
      currentNum = [];
      alert('This is non sequitur.. ERROR.. ERROR.. Self-destruction mode initiated.. 5.. 4.. 3.. 2.. 1..');
      alert('BOOM!');
      clear();
    } else if (previousOperator && num2) {
      currentNum = [];
      const solution = operate(previousOperator, num1, num2);
      num1 = solution;
      num2 = '';
      display.textContent = +(num1.toFixed(1));
    } else if (currentOperator) { // when current operator exists, empty currentNum for a new set of number
      currentNum = [];
    }
    previousOperator = currentOperator;
  }

function confirmClear() {
  const askClear = confirm("Clear all data?");
  console.log(askClear)
  if (askClear) {
    clear();
  }
}

function clear() {
    currentNum = [];
    num1 = '';
    num2 = '';
    currentOperator = '';
    previousOperator = '';
    display.textContent = '';
    alert("Data cleared");
}

function backspace() {
  if (!num2) {
    currentNum = num1.toString().split('');
    currentNum.splice(-1,1);
    num1 = +(currentNum.join(''));
  } else {
    currentNum.splice(-1,1);
    num2 = +(currentNum.join(''));
  }
  display.textContent = currentNum.join('');
}

function whichItem(e) {
  if (e.shiftKey) {
    withShiftKey(e);
  } else {
    noShiftKey(e);
  }
}

function withShiftKey(e) {
  const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
  runOperator(opKey)
}

function noShiftKey(e) {
  const numKey = document.querySelector(`span[data-numcode="${e.keyCode}"]`);
  const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
  const assignKey = document.querySelector(`span[data-assigncode="${e.keyCode}"]`);
  const enterKey = document.querySelector(`span[data-entercode="${e.keyCode}"]`);
  const backspaceKey = document.querySelector(`span[data-backcode="${e.keyCode}"]`);
  const activeEl = document.activeElement;
  if (numKey) {
    storeDisplayNum(numKey);
  } else if (assignKey) {
    runOperator(assignKey);
  } else if (enterKey) {
    runOperator(enterKey); 
    if (activeEl.getAttribute('class') === 'digit btn') {
      const childSpan = activeEl.firstElementChild;
      storeDisplayNum(childSpan);
    }
    
  } else if (opKey) { // when = is pressed, + is not acknowledged becasue assignkey is executed before
    runOperator(opKey);
  } else if (backspaceKey) {
    backspace();
  }
}

function clickItem(e) {
  const numClick = document.querySelector(`span[data-num="${e.target.dataset.num}"]`);
  const opClick = document.querySelector(`span[data-op="${e.target.dataset.op}"]`);
  const assignClick = document.querySelector(`span[data-assigncode="${e.target.dataset.assigncode}"]`);
  const backClick = document.querySelector(`span[data-backcode="${e.target.dataset.backcode}"]`);
  const clearClick = document.querySelector(`span[data-escapecode="${e.target.dataset.escapecode}"]`);
  if (numClick) {
    storeDisplayNum(numClick);
  } else if (opClick) {
    runOperator(opClick);
  } else if (assignClick) {
    runOperator(assignClick);
  } else if (backClick) {
    backspace();
  } else if (clearClick) {
    confirmClear();
  }
}



window.addEventListener('click', clickItem);
window.addEventListener('keydown', whichItem);