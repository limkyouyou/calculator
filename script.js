
const database = {
  'active number': ['0'],
  'active operand one': '0',
  'active operand two': '',
  'active operator': '',
  'operation record': [],
  'button nodes': [],
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

  }
}

function storeDigit(selected) {

  const activeNum = addNumIf(database['active number'], selected);

  database['active number'] = activeNum;

  const joinActiveNum = activeNum.join('');

  displaySepNum(joinActiveNum);

  (!database['active operator'])
    ? database['active operand one'] = joinActiveNum
    : database['active operand two'] = joinActiveNum;

}

function addNumIf(array, num) {

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

  } else {

    array.push(num);

    return array;
  }

}

function runOperation(selected) {

  const activeOperandOne = database['active operand one'];
  const activeOperandTwo = database['active operand two'];
  const activeOperator = database['active operator'];

  if (activeOperandTwo === '0' && activeOperator === '÷') {

    clearEntry();
    display.textContent = "Nonsense."
    
  } else if (activeOperandOne && activeOperandOne !== '-' && !activeOperandTwo && selected) {

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

  const tempNum1 = (+(num1)).toString(); //omits decimal point as the last character

  if (!num2) {

    const tempCommaOperandOne = addCommaSeperator(tempNum1);

    operationDisplay.textContent = `${tempCommaOperandOne} ${operator}`

  } else {

    const tempNum2 = (+(num2)).toString();

    const tempCommaOperandOne = addCommaSeperator(tempNum1);
    const tempCommaOperandTwo = addCommaSeperator(tempNum2);

    operationDisplay.textContent = `${tempCommaOperandOne} ${operator} ${tempCommaOperandTwo} =`;
  }

}

function displaySepNum(num) {

  const tempCommaSolution = addCommaSeperator(num);

  display.textContent = tempCommaSolution;

}

function addCommaSeperator(string) {
  const checkLastDecimal = string.split('');
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

  } else if (checkLastDecimal[checkLastDecimal.length - 1] === '.'){

    return `${joinWholeNumber}.`;

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

  if (historyBody) {

    while (historyBody.hasChildNodes()) {

    clearHistory(historyBody);
    
    }
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
  divOperation.setAttribute('data-item', arrayItem);
  divSolution.classList.add(`history-solution`);
  divSolution.setAttribute('data-item', arrayItem);

  const tempSolution = operateObj(array[arrayItem]);
  const tempNum1 = (+(array[arrayItem]['operandOne'])).toString();
  const tempNum2 = (+(array[arrayItem]['operandTwo'])).toString();

  const tempCommaOperandOne = addCommaSeperator(tempNum1);
  const tempCommaOperandTwo = addCommaSeperator(tempNum2);
  const tempCommaSolution = addCommaSeperator(tempSolution);

  divOperation.textContent = `${tempCommaOperandOne} ${array[arrayItem]['operator']} ${tempCommaOperandTwo} = `;
  divSolution.textContent = `${tempCommaSolution}`;

  historyBody.appendChild(divContainer);
  divContainer.appendChild(divOperation);
  divContainer.appendChild(divSolution);

  divContainer.addEventListener('mouseover', () => {

    divContainer.style.backgroundColor = '#363636';
    divContainer.style.borderTopLeftRadius = '8px';
    divContainer.style.borderTopRightRadius = '8px';

  })

  divContainer.addEventListener('mouseleave', () => {

    divContainer.style.backgroundColor = '';
    divContainer.style.borderTopLeftRadius = '';
    divContainer.style.borderTopRightRadius = '';

  })
}

function clearHistory(parentNode) {

  parentNode.removeChild(parentNode.firstChild);

}

function checkDecimal(array) {

  return array.includes('.');

}


function NodesInterface(node, mainClass, text, keyCode, parentClass) {
  this.node = node;
  this.mainClass = mainClass;
  this.text = text;
  this.keyCode = keyCode;
  this.parentClass = parentClass;

  if (this.mainClass.includes('num')) {

    this.activeClass = 'num-active';

    this.perform = storeDigit;

    this.node.addEventListener('mousedown', () => {
      this.perform(this.text);
    });

  } else if (this.mainClass.includes('symbol')) {

    this.activeClass = 'num-active';

    this.perform = storeDigit;

    this.node.addEventListener('mousedown', () => {

      const isDecimalExist = checkDecimal(database['active number']);

      if (!isDecimalExist) {

        this.perform(this.text);

      }
    });

  } else if (this.mainClass.includes('oprtor')) {

    this.activeClass = 'function-active';

    this.perform = runOperation;

    this.node.addEventListener('mousedown', () => {
      this.perform(this.text);
    });

  } else if (this.mainClass.includes('oprte')) {

    this.activeClass = 'oprte-active';

    this.perform = runOperation;

    this.node.addEventListener('mousedown', () => {
      this.perform();
    });

  } else if (this.mainClass.includes('clear-entry')) {

    this.activeClass = 'function-active';

    this.perform = clearEntry;

    this.node.addEventListener('mousedown', () => {
      this.perform();
    });

  } else if (this.mainClass.includes('clear')) {

    this.activeClass = 'function-active';

    this.perform = clear;

    this.node.addEventListener('mousedown', () => {
      this.perform();
    });

  } else if (this.mainClass.includes('delete')) {

    this.activeClass = 'function-active';

    this.perform = backspace;

    this.node.addEventListener('mousedown', () => {
      this.perform(database['active number'], database['active operand one'], database['active operator']);
    });

  } else if (this.mainClass.includes('history')) {

    this.activeClass = 'function-active';

    this.perform = toggleHistory;

    this.node.addEventListener('mousedown', () => {
      this.perform();
    });

  }
}

const selectContents = document.querySelectorAll('span');

Array.from(selectContents).forEach((content) => {
  
  database['button nodes'].push(new NodesInterface(content, content.className, content.textContent, content.dataset.code, content.parentElement.className))

});

window.addEventListener('click', passLiveClick); // for the live history list

function passLiveClick(e) {

  if (e.target.dataset.item) {
    
    activateObj(e.target.dataset.item);
  }

}

window.addEventListener('keydown', passLiveKeyDown);
window.addEventListener('keyup', passLiveKeyUp);

 function passLiveKeyDown(e) {
 
   (e.shiftKey)
 
      ? passDownWithShift(e)
      : passEnterKeyDown(e);
 
 }

function passDownWithShift(e) {

   database['button nodes'].forEach((item) => {

    if (item.keyCode === e.keyCode.toString() && item.mainClass.includes('oprtor')) {

      item.node.classList.add(item.activeClass);
      item.perform(item.text);

    } 
   });

}

function passEnterKeyDown(e) {
  
  (e.keyCode !== 13)
  ? passNoFocus(e)
  : passActiveEl();
}

function passNoFocus(e) {

  database['button nodes'].forEach((item => {

    if ( item.mainClass.includes('num') && item.keyCode === e.keyCode.toString()
      || e.keyCode === 189 && item.keyCode === e.keyCode.toString()
      || e.keyCode === 191 && item.keyCode === e.keyCode.toString()
      ) {
      
      item.node.classList.add(item.activeClass);
      item.perform(item.text);

    } else if (item.mainClass.includes('symbol') && item.keyCode === e.keyCode.toString()) {

      const isDecimalExist = checkDecimal(database['active number']);

      item.node.classList.add(item.activeClass);
      if (!isDecimalExist) {

        item.perform(item.text);

      }

    } else if (item.keyCode === e.keyCode.toString() && item.mainClass.includes('oprte')) {

      item.node.classList.add(item.activeClass);
      item.perform();

    } else if (item.keyCode === e.keyCode.toString() && item.mainClass.includes('delete')) {

      item.node.classList.add(item.activeClass);
      item.perform(database['active number'], database['active operand one'], database['active operator']);

    }
  }));

}

function passActiveEl() {

  const activeElText = matchActiveEl();
  
  (activeElText)
    ? runActiveEl(activeElText)
    : runOperation();
}

function runActiveEl(activeElText) {

  database['button nodes'].forEach((item) => {

    if ( item.text === activeElText && item.mainClass.includes('num') 
      || item.text === activeElText && item.mainClass.includes('oprtor')
      ) {
      
      item.node.classList.add(item.activeClass);
      item.perform(item.text);

    } else if (item.text === activeElText && item.mainClass.includes('symbol')) {
    
      const isDecimalExist = checkDecimal(database['active number']);
    
      item.node.classList.add(item.activeClass);
      if (!isDecimalExist) {
      
        item.perform(item.text);
      
      }
    
    } else if (item.text === activeElText && item.mainClass.includes('delete')) {
    
      item.node.classList.add(item.activeClass);
      item.perform(database['active number'], database['active operand one'], database['active operator']);
    
    } else if (item.text === activeElText) {
    
      item.node.classList.add(item.activeClass);
      item.perform();
    
    }
  });
}

function passLiveKeyUp() {

  database['button nodes'].forEach((item) => {

    if (item.node.className.includes(item.activeClass)) {

      item.node.classList.remove(item.activeClass);

    }
  });

}

function matchActiveEl() {

  const getActiveEl = document.activeElement;

  const getActiveElClass = getActiveEl.getAttribute('class');
  
  if (database['button nodes'].map((item) => item.parentClass).includes(getActiveElClass)) {

    return getActiveEl.firstElementChild.textContent;

  } else {

    return false;
  }
}