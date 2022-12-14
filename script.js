
const display = document.querySelector('#display');
const operationDisplay = document.querySelector('#display-operation');


let currentNum =[];
let previousOperator;
let currentOperator;
let num1;
let num2;
let DecimalPoint = false;

function add(num1, num2) {
  return +(num1) + +(num2);
}

function subtract(num1, num2) {
  return +(num1) - +(num2);
}

function multiply(num1, num2) {
  return +(num1) * +(num2);
}

function divide(num1, num2) {
  return +(num1) / +(num2);
}

function operate(currentOp, num1, num2) {
  if (currentOp === '+') {
    return add(num1, num2);
  } else if (currentOp === '−') {
    return subtract(num1, num2);
  } else if (currentOp === '×') {
    return multiply(num1, num2);
  } else if (currentOp === '÷' && num2 !== '0') {
    return divide(num1, num2);
  }
}

function storeDisplay(selected) {
 isFirstNumZero(currentNum, selected)
  if (!currentOperator) {
    num1 = currentNum.join('');
  } else if (currentOperator && !num2) {
    previousOperator = currentOperator;
    num2 = currentNum.join('');
  } else {
    num2 = currentNum.join('');
  }
  display.textContent = currentNum.join('');
}

function isFirstNumZero(array, num) {
  if (array[0] === '0') {
    currentNum.splice(0, 1);
    currentNum.push(num);
  } else {
    currentNum.push(num);
  }
}

function runOperator(selected) {
    if (previousOperator === '÷' && num2 === '0') {
      currentNum = [];
      alert("Non sequitur. There's no logic in division by zero.. Must analyze...ana..l..y..ze...");
      clear();
    } else if (num1 && !num2) {
      currentOperator = selected;
      operationDisplay.textContent = `${num1} ${currentOperator}`;
      DecimalPoint = false;
      currentNum = [];
    } else if (num2) {
      const solution = operate(previousOperator, num1, num2);
      num1 = (+(solution.toFixed(1))).toString(); // make it have one decimal point, when tenths is 0, it is omitted, then turn into a string to work with backspace function
      isNaN(num1);
      display.textContent = num1;
      operationDisplay.textContent += ` ${num2} = `;
      DecimalPoint = false;
      currentNum = [];
      num2 = '';
      previousOperator = '';
      currentOperator = '';
    }
  }

function isNaN(solution) {
  if (solution === 'NaN') {
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
    operationDisplay.textContent = '';
    DecimalPoint = false;
}

function backspace() {
  isIncludeDecimal(currentNum); // if decimal point is the deletion target , assign isDecimalPoint false
  if (!num2 && !previousOperator) {
    currentNum = num1.split('');
    currentNum.splice(-1,1);
    num1 = currentNum.join('');
  } else {
    currentNum.splice(-1,1);
    num2 = currentNum.join('');
  }
  display.textContent = currentNum.join('');
}

function isIncludeDecimal(numArray) {
  if (numArray[numArray.length - 1] === '.') {
    DecimalPoint = false;
  }
}

function whichKey(e) {
  if (e.shiftKey) {
    withShiftKey(e);
  } else {
    noShiftKey(e);
  }
}

function withShiftKey(e) {
  const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
  if (opKey) { // run function when opKey exists as to avoid error by running function with null parameter
    runOperator(opKey.dataset.op);
  }
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
    storeDisplay(numKey.dataset.num);
  } else if (symbolKey && !DecimalPoint) {
    DecimalPoint = true;
    storeDisplay(symbolKey.dataset.symbol);
  } else if (assignKey) {
    runOperator(); // when +/= key is pressed, assignkey(=) parameter is used first 
  } else if (enterKey) {
    enterKeySwitch(activeEl);
  } else if (opKey) { 
    runOperator(opKey.dataset.op);
  } else if (backspaceKey) {
    backspace();
  }
}

function enterKeySwitch(activeEl) {
    if (activeEl.getAttribute('class') === 'digit btn') { // when a digit is focused, run enterkey as clicking the focused button
      const childSpan = activeEl.firstElementChild;
      storeDisplay(childSpan.dataset.num);
    } else if (activeEl.getAttribute('class') === 'symbol btn') {
      DecimalPoint = true;
      const childSpan = activeEl.firstElementChild;
      storeDisplay(childSpan.dataset.symbol);
    } else if (
      activeEl.getAttribute('class') === 'operator btn' ||
      activeEl.getAttribute('class') === 'operate btn'
      ) { // when a operator/operate is focused, run enterkey as clicking the focused button
      const childSpan = activeEl.firstElementChild;
      runOperator(childSpan.dataset.op);
    } else if (activeEl.getAttribute('class') === 'clear btn') {
      clear();
    } else if (activeEl.getAttribute('class') === 'back btn') {
      backspace();
    } else { // when no activeEL, execute runOperator with no parameter
      runOperator();
    }
}

function clickBtn(e) {
  const numClick = document.querySelector(`span[data-num="${e.target.dataset.num}"]`);
  const symbolClick = document.querySelector(`span[data-symbol="${e.target.dataset.symbol}"]`);
  const opClick = document.querySelector(`span[data-op="${e.target.dataset.op}"]`);
  const assignClick = document.querySelector(`span[data-assigncode="${e.target.dataset.assigncode}"]`);
  const backClick = document.querySelector(`span[data-backcode="${e.target.dataset.backcode}"]`);
  const clearClick = document.querySelector(`span[data-escapecode="${e.target.dataset.escapecode}"]`);
  if (numClick) {
    storeDisplay(numClick.dataset.num);
  } else if (symbolClick && DecimalPoint === false) {
    DecimalPoint = true;
    storeDisplay(symbolClick.dataset.symbol);
  } else if (opClick) {
    runOperator(opClick.dataset.op);
  } else if (assignClick) {
    runOperator();
  } else if (backClick) {
    backspace();
  } else if (clearClick) {
    clear();
  }
}


window.addEventListener('click', clickBtn);
window.addEventListener('keydown', whichKey);