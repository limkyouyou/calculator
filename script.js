
const database = {
  'active number': ['0'],
  'active operand one': '',
  'active operand two': '',
  'active operator': '',
  'operation record': [],
  'decimal point': false,
}

const display = document.querySelector('#display');
const operationDisplay = document.querySelector('#display-operation');

display.textContent = database['active number'].join('');

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

function operateLastObj() {
  const tempOprtnRecord = database['operation record'];
  const operandOne = tempOprtnRecord[tempOprtnRecord.length - 1]['operandOne'];
  const operandTwo = tempOprtnRecord[tempOprtnRecord.length - 1]['operandTwo'];
  const operator = tempOprtnRecord[tempOprtnRecord.length - 1]['operator'];
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


function CreateOprtnObj(operandOne, operandTwo, operator) {
  this.operandOne = operandOne;
  this.operandTwo = operandTwo;
  this.operator = operator;
}


function storeDigit(selected) {
  database['active number'] = isFirstDigit(database['active number'], selected);
  display.textContent = database['active number'].join('');
  if (!database['active operator']) {
    database['active operand one'] = database['active number'].join('');
  } else if (database['active operator']) {
    database['active operand two'] = database['active number'].join('');
  }
}

function isFirstDigit(array, num) {
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
  if (activeOperandOne && !activeOperandTwo && selected) {
    database['active operator'] = selected;
    displayOperation(database['active operand one'], database['active operator']);
    database['decimal point'] = false;
  } else if (activeOperandTwo && selected) { 
    const activeOperator = database['active operator'];
    database['operation record'].push(new CreateOprtnObj(activeOperandOne, activeOperandTwo, activeOperator));
    const tempSolution = operateLastObj();
    database['active operand one'] = tempSolution;
    database['active operand two'] = '';
    database['active operator'] = selected;
    database['decimal point'] = false;
    displayOperation(database['active operand one'], database['active operator']);
    display.textContent = tempSolution;
  } else if (activeOperandTwo && !selected) { 
    const activeOperator = database['active operator'];
    database['operation record'].push(new CreateOprtnObj(activeOperandOne, activeOperandTwo, activeOperator));
    const tempSolution = operateLastObj();
    database['active operand one'] = tempSolution;
    database['active operand two'] = '';
    database['active operator'] = '';
    database['decimal point'] = false;
    displayOperation(activeOperandOne, activeOperator, activeOperandTwo);
    display.textContent = tempSolution;
  }
  database['active number'] = [];
}

function displayOperation(num1, operator, num2) {
  (!num2)
  ? operationDisplay.textContent = `${num1} ${operator}`
  : operationDisplay.textContent = `${num1} ${operator} ${num2} =`;
}

function clear() {
  database['active number'] = [0];
  database['active operand one'] = database['active number'][0];
  database['active operand two'] = '';
  database['active operator'] = '';
  database['operation record'] = [];
  database['decimal point'] = false;
  operationDisplay.textContent = '';
  display.textContent = database['active number'].join('');
}

function backspace(array, firstNum, secondNum, activeOp) {
  isIncludeDecimal(database['active number']); // if decimal point is the deletion target , assign decimal point false
  if (!secondNum && !activeOp) {
    array = firstNum.split('');
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

function isIncludeDecimal(numArray) {
  if (numArray[numArray.length - 1] === '.') {
    database['decimal point'] = false;
  }
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
    storeDigit(numKey.dataset.num); //check
  } else if (symbolKey && !database['decimal point']) {
    database['decimal point'] = true;
    storeDigit(symbolKey.dataset.symbol);
  } else if (assignKey) {
    runOperation(); // when +/= key is pressed, assignkey(=) parameter is used first, check 
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
    } else if (activeEl.getAttribute('class') === 'symbol btn') {
      database['decimal point'] = true;
      const childSpan = activeEl.firstElementChild;
      storeDigit(childSpan.dataset.symbol);
    } else if (
      activeEl.getAttribute('class') === 'operator btn' ||
      activeEl.getAttribute('class') === 'operate btn'
      ) { // when a operator/operate is focused, run enterkey as clicking the focused button
      const childSpan = activeEl.firstElementChild;
      runOperation(childSpan.dataset.op); // check
    } else if (activeEl.getAttribute('class') === 'clear btn') {
      clear();
    } else if (activeEl.getAttribute('class') === 'back btn') {
      backspace(database['active number'], database['active operand one'], database['active operand two'], database['active operator']);
    } else { // when no activeEL, execute runOperator with no parameter
      runOperation();  //check
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
    storeDigit(numClick.dataset.num); // check
  } else if (symbolClick && database['decimal point'] === false) {
    database['decimal point'] = true;
    storeDigit(symbolClick.dataset.symbol);
  } else if (opClick) {
    runOperation(opClick.dataset.op); // check
  } else if (assignClick) {
    runOperation(); //check
  } else if (backClick) {
    backspace(database['active number'], database['active operand one'], database['active operator']);
  } else if (clearClick) {
    clear();
  }
}


window.addEventListener('click', clickBtn);
window.addEventListener('keydown', whichKey);