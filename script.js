
const database = {
  'active number': ['0'],
  'active operand one': '0',
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

  const joinActiveNum = database['active number'].join('');

  displaySepNum(joinActiveNum, selected);

  (!database['active operator'])
    ? database['active operand one'] = database['active number'].join('')
    : database['active operand two'] = database['active number'].join('');
}

function addNumIf(array, num) {

  const isDecimalExist = checkDecimal(database['active number'])

  if (array[0] === '0' && array.length === 1 && num !== '.') { 
    // when a digit is selected and not the decimal point, the first array item is removed only when zero was the only item in the array

    array.splice(0, 1);
    array.push(num);

    return array;

  } else if (array.length === 0 && num === '.') {
    // add zero before decimal point when array was empty

    array = [0];
    array.push(num);

    return array;

  } else if (num === '.' && !isDecimalExist) {
    // if num = '.' then check for existing decimal point

    array.push(num);

    return array;

  } else if (num !== '.') {

    array.push(num);

    return array;

  } else {

    return array;
  }
}

function runOperation(selected) {

  const activeOperandOne = database['active operand one'];
  const activeOperandTwo = database['active operand two'];
  const activeOperator = database['active operator'];

  if (activeOperandOne !== '-' && !activeOperandTwo && selected) {

    displayOperation(activeOperandOne, selected);

    database['active operator'] = selected;

    database['active number'] = []; 
    // empty active number is nested inside every condition incase when runOperator is executed but no condition is met

  } else if (activeOperandTwo && selected) {

    database['operation record'].push(new CreateOprtnObj(activeOperandOne, activeOperandTwo, activeOperator));

    const tempSolution = operateObj(database['operation record'][database['operation record'].length - 1]);

    database['active operand one'] = tempSolution;
    database['active operand two'] = '';
    database['active operator'] = selected;

    displayOperation(tempSolution, selected);
    displaySepNum(tempSolution);

    addLiveHistory();

    database['active number'] = [];
    
  } else if (activeOperandTwo && !selected) { 

    database['operation record'].push(new CreateOprtnObj(activeOperandOne, activeOperandTwo, activeOperator));

    const tempSolution = operateObj(database['operation record'][database['operation record'].length - 1]);

    database['active operand one'] = tempSolution;
    database['active operand two'] = '';
    database['active operator'] = '';

    displayOperation(activeOperandOne, activeOperator, activeOperandTwo);
    displaySepNum(tempSolution);

    addLiveHistory();

    database['active number'] = [];
  }
}

function displayOperation(num1, operator, num2) {

  if (!num2) {

    const tempCommaOperandOne = addCommaSeperator(num1);

    operationDisplay.textContent = `${tempCommaOperandOne} ${operator}`

  } else {

    const tempCommaOperandOne = addCommaSeperator(num1);
    const tempCommaOperandTwo = addCommaSeperator(num2);

    operationDisplay.textContent = `${tempCommaOperandOne} ${operator} ${tempCommaOperandTwo} =`;
  }

}

function displaySepNum(num, selected) {

  const tempCommaSolution = addCommaSeperator(num);

  if (selected === '.') { // if selected is a decimal point, it is added again after its removal during the execution of addCommaSeperator function

    display.textContent = `${tempCommaSolution}${selected}`;

  } else {

    display.textContent = tempCommaSolution;

  }
}

function addCommaSeperator(string) {
  const commaArray = [];
  const splitPoint = string.split('.');
  const reverseWholeNum = splitPoint[0].split('').reverse();

  for (let i = 0; i < reverseWholeNum.length; i++) {

    commaArray.unshift(reverseWholeNum[i]);

    if ((i + 1) % 3 === 0 && !(i === reverseWholeNum.length - 1) && reverseWholeNum[i + 1] !== '-') {
      // comma seperator is added only when item index is divisible by 3 but not if it is the last index and not when the preceeding item is '-'

      commaArray.unshift(',');
    }
  }

  const joinWholeNumber = commaArray.join('');

  if (splitPoint[1]) {

    return `${joinWholeNumber}.${splitPoint[1]}`;

  } else {

    return joinWholeNumber;
  }
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
  displaySepNum(database['active operand one']);

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
  database['active operand one'] = database['active number'][0];
  database['active operand two'] = '';
  database['active operator'] = '';
  operationDisplay.textContent = '';
  display.textContent = database['active number'].join('');

}

function backspace(array, firstNum, secondNum, activeOp) {

  if (!secondNum && !activeOp) {

    array = firstNum.split(''); // array needs to be reassigned since it may be empty after passing the first condition of runOperation
    array.splice(-1,1);
    firstNum = array.join('');

    database['active operand one'] = firstNum;

  } else {

    array.splice(-1,1);
    secondNum = array.join('');

    database['active operand two'] = secondNum;
  }

  database['active number'] = array;

  const tempJoinArray = array.join('');

  displaySepNum(tempJoinArray, array[array.length - 1]);

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

  const tempCommaOperandOne = addCommaSeperator(array[arrayItem]['operandOne']);
  const tempCommaOperandTwo = addCommaSeperator(array[arrayItem]['operandTwo']);
  const tempCommaSolution = addCommaSeperator(tempSolution);

  divOperation.textContent = `${tempCommaOperandOne} ${array[arrayItem]['operator']} ${tempCommaOperandTwo} = `;
  divSolution.textContent = `${tempCommaSolution}`;

  historyBody.appendChild(divContainer);
  divContainer.appendChild(divOperation);
  divContainer.appendChild(divSolution);

}

function clearHistory(parentNode) {

  parentNode.removeChild(parentNode.firstChild);

}

function checkDecimal(array) {

  return array.includes('.');

}


const selectContents = document.querySelectorAll('span');

const arrayContents = Array.from(selectContents);

const addClickEvent = arrayContents.forEach((content) => {
  const getClassList = Array.from(content.classList);
  if (getClassList.includes('num')) {
    content.addEventListener('click', () => {
      storeDigit(content.textContent);
    });
  } else if (getClassList.includes('oprtor')) {
    content.addEventListener('click', () => {
      runOperation(content.textContent);
    });
  } else if (getClassList.includes('oprte')) {
    content.addEventListener('click', () => {
      runOperation();
    });
  }
});

// 
// function passWhichKey(e) {
// 
//   (e.shiftKey) 
//     ? passWithShiftKey(e)
//     : passNoShiftKey(e);
// 
// }
// 
// function passWhichKeyUp(e) {
// 
//   (e.shiftKey) 
//     ? passWithShiftKeyUp(e)
//     : passNoShiftKeyUp(e);
// 
// }
// 
// function passWithShiftKey(e) {
// 
//   const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
// 
//   if (opKey) { // run function only when opKey exists as to avoid error from running the function with null parameter
// 
//     runOperation(opKey.dataset.op);
// 
//     opKey.style.backgroundColor = '#262626';
//   }
// }
// 
// function passNoShiftKey(e) {
// 
//   const numKey = document.querySelector(`span[data-numcode="${e.keyCode}"]`);
//   const symbolKey = document.querySelector(`span[data-symbolcode="${e.keyCode}"]`);
//   const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
//   const assignKey = document.querySelector(`span[data-assigncode="${e.keyCode}"]`);
//   const enterKey = document.querySelector(`span[data-entercode="${e.keyCode}"]`);
//   const backspaceKey = document.querySelector(`span[data-backcode="${e.keyCode}"]`);
//   const activeEl = document.activeElement; // when there is an active/focused element, assign it to a variable
// 
//   if (numKey) {
// 
//     storeDigit(numKey.dataset.num);
// 
//     numKey.style.backgroundColor = '#262626';
// 
//   } else if (symbolKey && !isDecimalPresent(database['active number'])) {
// 
//     storeDigit(symbolKey.dataset.symbol);
// 
//     symbolKey.style.backgroundColor = '#262626';
// 
//   } else if (symbolKey) {
// 
//     symbolKey.style.backgroundColor = '#262626';
// 
//   } else if (assignKey) {
// 
//     runOperation(); // when +/= key is pressed, assignkey(=) parameter is accepted first and does not proceed to opKey condition
// 
//     assignKey.style.backgroundColor = '#002c28';
// 
//   } else if (enterKey) {
// 
//     passEnterKey(activeEl);
// 
//   } else if (opKey) { 
// 
//     runOperation(opKey.dataset.op);
// 
//     opKey.style.backgroundColor = '#262626';
// 
//   } else if (backspaceKey) {
// 
//     backspace(database['active number'], database['active operand one'], database['active operand two'], database['active operator']);
// 
//     backspaceKey.style.backgroundColor = '#262626';
//   }
// }
// 
// function passEnterKey(activeEl) {
// 
//   const childSpan = activeEl.firstElementChild;
// 
//   if (activeEl.getAttribute('class') === 'digit btn') { // when a digit is focused, run enterkey as clicking the focused button
// 
//     storeDigit(childSpan.dataset.num);
// 
//     childSpan.style.backgroundColor = '#262626';
//     
//   } else if (activeEl.getAttribute('class') === 'symbol btn' && !isDecimalPresent(database['active number'])) {
// 
//     storeDigit(childSpan.dataset.symbol);
// 
//     childSpan.style.backgroundColor = '#262626';
// 
//   } else if (activeEl.getAttribute('class') === 'symbol btn') {
// 
//     childSpan.style.backgroundColor = '#262626';
// 
//   } else if (activeEl.getAttribute('class') === 'operator btn') {
// 
//     runOperation(childSpan.dataset.op);
// 
//     childSpan.style.backgroundColor = '#262626';
// 
//   } else if (activeEl.getAttribute('class') === 'operate btn') {
// 
//     runOperation();
// 
//     childSpan.style.backgroundColor = '#002c28';
// 
//   } else if (activeEl.getAttribute('class') === 'clear btn') {
// 
//     clear();
// 
//     childSpan.style.backgroundColor = '#262626';
// 
//   } else if (activeEl.getAttribute('class') === 'clear-entry btn') {
// 
//     clearEntry();
// 
//     childSpan.style.backgroundColor = '#262626';
// 
//   } else if (activeEl.getAttribute('class') === 'back btn') {
// 
//     backspace(database['active number'], database['active operand one'], database['active operand two'], database['active operator']);
// 
//     childSpan.style.backgroundColor = '#262626';
// 
//   } else if (activeEl.getAttribute('class') === 'history btn') {
// 
//     toggleHistory();
// 
//     childSpan.style.backgroundColor = '#262626';
// 
//   } else { // when no activeEL, execute runOperator with no parameter
// 
//     const assignKey = document.querySelector(`span[data-assigncode="187"]`);
// 
//     assignKey.style.backgroundColor = '#002c28';
// 
//     runOperation();
//     
//   }
// }
// 
// function passEnterKeyUp(activeEl) {
// 
//   const childSpan = activeEl.firstElementChild;
// 
//   if (activeEl.getAttribute('class') === 'digit btn') {
// 
//     childSpan.style.backgroundColor = '#494848';
//     
//   } else if (activeEl.getAttribute('class') === 'symbol btn' && !isDecimalPresent(database['active number'])) {
// 
//     childSpan.style.backgroundColor = '#494848';
// 
//   } else if (activeEl.getAttribute('class') === 'symbol btn') {
// 
//     childSpan.style.backgroundColor = '#494848';
// 
//   } else if (activeEl.getAttribute('class') === 'operator btn') {
// 
//     childSpan.style.backgroundColor = '#363636';
// 
//   } else if (activeEl.getAttribute('class') === 'operate btn') {
// 
//     childSpan.style.backgroundColor = '#00564d';
// 
//   } else if (activeEl.getAttribute('class') === 'clear btn') {
// 
//     childSpan.style.backgroundColor = '#363636';
// 
//   } else if (activeEl.getAttribute('class') === 'clear-entry btn') {
// 
//     childSpan.style.backgroundColor = '#363636';
// 
//   } else if (activeEl.getAttribute('class') === 'back btn') {
// 
//     childSpan.style.backgroundColor = '#363636';
// 
//   } else if (activeEl.getAttribute('class') === 'history btn') {
// 
//     childSpan.style.backgroundColor = '#363636';
// 
//   } else {
// 
//     const assignKey = document.querySelector(`span[data-assigncode="187"]`);
// 
//     assignKey.style.backgroundColor = '#00564d';
//     
//   }
// }
// 
// function passWithShiftKeyUp(e) {
// 
//   const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
// 
//   if (opKey) {
// 
//     opKey.style.backgroundColor = '#363636';
//   }
// }
// 
// function passNoShiftKeyUp(e) {
// 
//   const numKey = document.querySelector(`span[data-numcode="${e.keyCode}"]`);
//   const symbolKey = document.querySelector(`span[data-symbolcode="${e.keyCode}"]`);
//   const assignKey = document.querySelector(`span[data-assigncode="${e.keyCode}"]`);
//   const enterKey = document.querySelector(`span[data-entercode="${e.keyCode}"]`);
//   const opKey = document.querySelector(`span[data-opcode="${e.keyCode}"]`);
//   const backspaceKey = document.querySelector(`span[data-backcode="${e.keyCode}"]`);
//   const activeEl = document.activeElement;
// 
//   if (numKey) {
// 
//     numKey.style.backgroundColor = '#494848';
// 
//   } else if (symbolKey) {
// 
//     symbolKey.style.backgroundColor = '#494848';
// 
//   } else if (assignKey) {
// 
//     assignKey.style.backgroundColor = '#00564d';
// 
//   } else if (enterKey) {
// 
//     passEnterKeyUp(activeEl);
// 
//   } else if (opKey) { 
// 
//     opKey.style.backgroundColor = '#363636';
// 
//   } else if (backspaceKey) {
// 
//     backspaceKey.style.backgroundColor = '#363636';
// 
//   } 
// }
// 
// function passClickBtn(e) {
// 
//   const numClick = document.querySelector(`span[data-num="${e.target.dataset.num}"]`);
//   const symbolClick = document.querySelector(`span[data-symbol="${e.target.dataset.symbol}"]`);
//   const opClick = document.querySelector(`span[data-op="${e.target.dataset.op}"]`);
//   const assignClick = document.querySelector(`span[data-assigncode="${e.target.dataset.assigncode}"]`);
//   const backClick = document.querySelector(`span[data-backcode="${e.target.dataset.backcode}"]`);
//   const clearClick = document.querySelector(`span[data-clearcode="${e.target.dataset.clearcode}"]`);
//   const clearEntryClick = document.querySelector(`span[data-clearentrycode="${e.target.dataset.clearentrycode}"]`);
//   const historyClick = document.querySelector(`span[data-historycode="${e.target.dataset.historycode}"]`);
//   const historyItemChildClick = document.querySelector(`div[data-item="${e.target.parentNode.dataset.item}"]`);
//   const historyItemParentClick = document.querySelector(`div[data-item="${e.target.dataset.item}"]`);
// 
//   if (numClick) {
// 
//     storeDigit(numClick.dataset.num);
// 
//   } else if (symbolClick && !isDecimalPresent(database['active number'])) {
// 
//     storeDigit(symbolClick.dataset.symbol);
// 
//   } else if (opClick) {
// 
//     runOperation(opClick.dataset.op);
// 
//   } else if (assignClick) {
// 
//     runOperation();
// 
//   } else if (backClick) {
// 
//     backspace(database['active number'], database['active operand one'], database['active operator']);
// 
//   } else if (clearClick) {
// 
//     clear();
// 
//   } else if (clearEntryClick) {
// 
//     clearEntry();
// 
//   } else if (historyClick) {
//     
//     toggleHistory();
// 
//   } else if (historyItemChildClick) {
// 
//     activateObj(historyItemChildClick.dataset.item);
// 
//   } else if (historyItemParentClick) {
// 
//     activateObj(historyItemParentClick.dataset.item);
// 
//   }
// }
// 
// 
// window.addEventListener('click', passClickBtn);
// window.addEventListener('keydown', passWhichKey);
// window.addEventListener('keyup', passWhichKeyUp);