
const display = document.querySelector('#display');


let currentNum =[];
let previousOperator;
let currentOperator;
let num1;
let num2;
let isDecimalPoint = false;

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
  currentNum.push(selected);
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
      isDecimalPoint = false;
      currentNum = [];
      const solution = operate(previousOperator, num1, num2);
      num1 = solution;
      num2 = '';
      display.textContent = +(num1.toFixed(1));
    } else if (currentOperator) { // when current operator exists, empty currentNum for a new set of number
      isDecimalPoint = false;
      currentNum = [];
    }
    previousOperator = currentOperator;
  }

function clear() {
    currentNum = [];
    num1 = '';
    num2 = '';
    currentOperator = '';
    previousOperator = '';
    display.textContent = '';
    isDecimalPoint = false;
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
  const symbolKey = document.querySelector(`span[data-symbolcode="${e.keyCode}"]`);
  const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
  const assignKey = document.querySelector(`span[data-assigncode="${e.keyCode}"]`);
  const enterKey = document.querySelector(`span[data-entercode="${e.keyCode}"]`);
  const backspaceKey = document.querySelector(`span[data-backcode="${e.keyCode}"]`);
  const activeEl = document.activeElement; // when there is an active/focused element, assign it to a variable
  if (numKey) {
    storeDisplayNum(numKey.dataset.num);
  } else if (symbolKey && !isDecimalPoint) {
    isDecimalPoint = true;
    storeDisplayNum(symbolKey.dataset.symbol);
  } else if (assignKey) {
    runOperator(assignKey); // when +/= key is pressed, assignkey(=) parameter is used first 
  } else if (enterKey) {
    enterKeySwitch(activeEl);
  } else if (opKey) { 
    runOperator(opKey);
  } else if (backspaceKey) {
    backspace();
  }
}

function enterKeySwitch(activeEl) {
      if (!activeEl) { // When there is no focus run enterkey as operate
      runOperator(enterKey); 
    } else if (activeEl.getAttribute('class') === 'digit btn') { // when a digit is focused, run enterkey as clicking the focused button
      const childSpan = activeEl.firstElementChild;
      storeDisplayNum(childSpan);
    } else if (activeEl.getAttribute('class') === 'operator btn' || activeEl.getAttribute('class') === 'operate btn') { // when a operator/operate is focused, run enterkey as clicking the focused button
      const childSpan = activeEl.firstElementChild;
      runOperator(childSpan);
    } 
}

function clickItem(e) {
  const numClick = document.querySelector(`span[data-num="${e.target.dataset.num}"]`);
  const symbolClick = document.querySelector(`span[data-symbol="${e.target.dataset.symbol}"]`);
  const opClick = document.querySelector(`span[data-op="${e.target.dataset.op}"]`);
  const assignClick = document.querySelector(`span[data-assigncode="${e.target.dataset.assigncode}"]`);
  const backClick = document.querySelector(`span[data-backcode="${e.target.dataset.backcode}"]`);
  const clearClick = document.querySelector(`span[data-escapecode="${e.target.dataset.escapecode}"]`);
  if (numClick) {
    storeDisplayNum(numClick.dataset.num);
  } else if (symbolClick && isDecimalPoint === false) {
    isDecimalPoint = true;
    storeDisplayNum(symbolClick.dataset.symbol);
  } else if (opClick) {
    runOperator(opClick);
  } else if (assignClick) {
    runOperator(assignClick);
  } else if (backClick) {
    backspace();
  } else if (clearClick) {
    clear();
  }
}



window.addEventListener('click', clickItem);
window.addEventListener('keydown', whichItem);