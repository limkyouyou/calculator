
const database = {
  'active number': ['0'],
  'active operand one': '',
  'active operand two': '',
  'active operator': '',
  'operation record': [],
}

const display = document.querySelector('#display');
const operationDisplay = document.querySelector('#display-operation');

display.textContent = database['active number'].join('');

function CreateOprtnObj(operandOne, operandTwo, operator) {
  this.operandOne = operandOne;
  this.operandTwo = operandTwo;
  this.operator = operator;
}

function add(num1, num2) {
  return (+(+(num1) + +(num2)).toFixed(2)).toString();
}

function subtract(num1, num2) {
  return (+(+(num1) - +(num2)).toFixed(2)).toString();
}

function multiply(num1, num2) {
  return (+(+(num1) * +(num2)).toFixed(2)).toString();
}

function divide(num1, num2) {
  return (+(+(num1) / +(num2)).toFixed(2)).toString();
}

function operateObj(obj) {

  const operandOne = obj['operandOne'];
  const operandTwo = obj['operandTwo'];
  const operator = obj['operator'];

  if (operator === '+') {
    return add(operandOne, operandTwo);
  } else if (operator === '−') {
    return subtract(operandOne, operandTwo);
  } else if (operator === '×') {
    return multiply(operandOne, operandTwo);
  } else if (operator === '÷' && operandTwo !== '0') {
    return divide(operandOne, operandTwo);
  } else if (operator === '÷' && operandTwo === '0') {
    alert("Non sequitur. There's no logic to division by zero.. \nMust analyze...ana..l..y..ze...");
    clear();
  }
}

function storeDigit(selected) {

  database['active number'] = addNumIf(database['active number'], selected);

  display.textContent = database['active number'].join('');

  (!database['active operator'])
    ? database['active operand one'] = database['active number'].join('')
    : database['active operand two'] = database['active number'].join('');
}

function addNumIf(array, num) {
  if (array[0] === '0' && array.length === 1 && num !== '.') {
    array.splice(0, 1);
    array.push(num);
    return array;
  } else if (array.length === 0 && num === '.') {
    array = [0];
    array.push(num);
    return array;
  } else {
    array.push(num);
    return array;
  }
}

function runOperation(selected) {

  const activeOperandOne = database['active operand one'];
  const activeOperandTwo = database['active operand two'];
  const activeOperator = database['active operator'];

  if (activeOperandOne && !activeOperandTwo && selected) {

    displayOperation(activeOperandOne, selected);

    database['active operator'] = selected;

  } else if (activeOperandTwo && selected) {

    database['operation record'].push(new CreateOprtnObj(activeOperandOne, activeOperandTwo, activeOperator));

    const tempSolution = operateObj(database['operation record'][database['operation record'].length - 1]);

    database['active operand one'] = tempSolution;
    database['active operand two'] = '';
    database['active operator'] = selected;

    displayOperation(tempSolution, selected);
    display.textContent = tempSolution;

    addLiveHistory();
    
  } else if (activeOperandTwo && !selected) { 

    database['operation record'].push(new CreateOprtnObj(activeOperandOne, activeOperandTwo, activeOperator));

    const tempSolution = operateObj(database['operation record'][database['operation record'].length - 1]);

    database['active operand one'] = tempSolution;
    database['active operand two'] = '';
    database['active operator'] = '';

    displayOperation(activeOperandOne, activeOperator, activeOperandTwo);
    display.textContent = tempSolution;

    addLiveHistory();
  }

  database['active number'] = [];
}

function displayOperation(num1, operator, num2) {

  (!num2)
  ? operationDisplay.textContent = `${num1} ${operator}`
  : operationDisplay.textContent = `${num1} ${operator} ${num2} =`;

}

function addLiveHistory() {
  const historyBody = document.querySelector('.history-body');

  if (historyBody) {
    addHistoryContent(database['operation record'], database['operation record'].length - 1);
  }
}

function activateObj(item) {
  
  const tempOpRecord = database['operation record'];

  database['active operand one'] = operateObj(tempOpRecord[item]);

  displayOperation(tempOpRecord[item]['operandOne'], tempOpRecord[item]['operator'], tempOpRecord[item]['operandTwo']);
  display.textContent = database['active operand one'];
  
}

function clear() {

  database['active number'] = ['0'];
  database['active operand one'] = database['active number'][0];
  database['active operand two'] = '';
  database['active operator'] = '';
  database['operation record'] = [];
  operationDisplay.textContent = '';
  display.textContent = database['active number'].join('');

  const historyBody = document.querySelector('.history-body');

  while (historyBody.hasChildNodes()) {
    clearHistory(historyBody);
  }
}

function clearEntry() {

  database['active number'] = ['0'];
  database['active operand two'] = '';
  display.textContent = database['active number'].join('');

}

function backspace(array, firstNum, secondNum, activeOp) {

  if (!secondNum && !activeOp) {

    array = firstNum.split(''); // when operandOne need deleted after selecting operator, active number is empty
    array.splice(-1,1);
    firstNum = array.join('');

    database['active operand one'] = firstNum;

  } else {

    array.splice(-1,1);
    secondNum = array.join('');

    database['active operand two'] = secondNum;
  }

  database['active number'] = array;
  
  display.textContent = array.join('');
}

function toggleHistory() {

  const oprtnRecord = database['operation record'];

  const appBody = document.querySelector('#calc-container');
  const calculatorBody = document.querySelector('#calculator');
  const historyContainer = document.querySelector('#history');
  const historyBody = document.querySelector('#list-container');
  
  appBody.classList.toggle('calc-container-history');
  historyContainer.classList.toggle('history-container');
  calculatorBody.classList.toggle('calculator-history');
  historyBody.classList.toggle('history-body');

  if (historyBody.classList.contains('history-body')) {

    for (let i = 0; i < oprtnRecord.length; i++) {

      addHistoryContent(oprtnRecord, i);
    }

  } else {

    while (historyBody.hasChildNodes()) {
      clearHistory(historyBody);
    }
  }
}

function addHistoryContent(array, arrayItem) {

  const historyBody = document.querySelector('#list-container');

  const divContainer = document.createElement('div');
  const divOperation = document.createElement('div');
  const divSolution = document.createElement('div');

  divContainer.classList.add(`item-container`);
  divContainer.setAttribute('data-item', arrayItem);
  divOperation.classList.add(`history-operation`);
  divSolution.classList.add(`history-solution`);

  const tempSolution = operateObj(array[arrayItem]);

  divOperation.textContent = `${array[arrayItem]['operandOne']} ${array[arrayItem]['operator']} ${array[arrayItem]['operandTwo']} = `;
  divSolution.textContent = `${tempSolution}`;

  historyBody.appendChild(divContainer);
  divContainer.appendChild(divOperation);
  divContainer.appendChild(divSolution);

}

function clearHistory(parentNode) {
  parentNode.removeChild(parentNode.firstChild);
}

function isDecimalPresent(array) {

  return array.includes('.');

}


function whichKey(e) {

  (e.shiftKey) 
    ? withShiftKey(e)
    : noShiftKey(e);

}

function withShiftKey(e) {

  const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);

  if (opKey) { // run function when opKey exists as to avoid error by running function with null parameter

    runOperation(opKey.dataset.op);
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

    storeDigit(numKey.dataset.num);

  } else if (symbolKey && !isDecimalPresent(database['active number'])) {

    storeDigit(symbolKey.dataset.symbol);

  } else if (assignKey) {

    runOperation(); // when +/= key is pressed, assignkey(=) parameter is used first

  } else if (enterKey) {

    enterKeySwitch(activeEl);

  } else if (opKey) { 

    runOperation(opKey.dataset.op); // check

  } else if (backspaceKey) {

    backspace(database['active number'], database['active operand one'], database['active operand two'], database['active operator']);
  }
}

function enterKeySwitch(activeEl) {

    if (activeEl.getAttribute('class') === 'digit btn') { // when a digit is focused, run enterkey as clicking the focused button

      const childSpan = activeEl.firstElementChild;

      storeDigit(childSpan.dataset.num);

    } else if (activeEl.getAttribute('class') === 'symbol btn' && !isDecimalPresent(database['active number'])) {

      const childSpan = activeEl.firstElementChild;

      storeDigit(childSpan.dataset.symbol);

    } else if (

      activeEl.getAttribute('class') === 'operator btn' ||
      activeEl.getAttribute('class') === 'operate btn'

      ) { // when a operator/operate is focused, run enterkey as clicking the focused button

      const childSpan = activeEl.firstElementChild;

      runOperation(childSpan.dataset.op);

    } else if (activeEl.getAttribute('class') === 'clear btn') {

      clear();

    } else if (activeEl.getAttribute('class') === 'clear-entry btn') {

      clearEntry();

    } else if (activeEl.getAttribute('class') === 'back btn') {

      backspace(database['active number'], database['active operand one'], database['active operand two'], database['active operator']);

    } else { // when no activeEL, execute runOperator with no parameter

      runOperation();
    }
}

function clickBtn(e) {

  const numClick = document.querySelector(`span[data-num="${e.target.dataset.num}"]`);
  const symbolClick = document.querySelector(`span[data-symbol="${e.target.dataset.symbol}"]`);
  const opClick = document.querySelector(`span[data-op="${e.target.dataset.op}"]`);
  const assignClick = document.querySelector(`span[data-assigncode="${e.target.dataset.assigncode}"]`);
  const backClick = document.querySelector(`span[data-backcode="${e.target.dataset.backcode}"]`);
  const clearClick = document.querySelector(`span[data-clearcode="${e.target.dataset.clearcode}"]`);
  const clearEntryClick = document.querySelector(`span[data-clearentrycode="${e.target.dataset.clearentrycode}"]`);
  const historyClick = document.querySelector(`span[data-historycode="${e.target.dataset.historycode}"]`);
  const historyItemClick = document.querySelector(`div[data-item="${e.target.parentNode.dataset.item}"]`);

  if (numClick) {

    storeDigit(numClick.dataset.num);

  } else if (symbolClick && !isDecimalPresent(database['active number'])) {

    storeDigit(symbolClick.dataset.symbol);

  } else if (opClick) {

    runOperation(opClick.dataset.op);

  } else if (assignClick) {

    runOperation();

  } else if (backClick) {

    backspace(database['active number'], database['active operand one'], database['active operator']);

  } else if (clearClick) {

    clear();

  } else if (clearEntryClick) {

    clearEntry();

  } else if (historyClick) {
    
    toggleHistory();

  } else if (historyItemClick) {

    activateObj(historyItemClick.dataset.item);

  }
}


window.addEventListener('click', clickBtn);
window.addEventListener('keydown', whichKey);