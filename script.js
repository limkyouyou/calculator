
const display = document.querySelector('#display');
const operationDisplay = document.querySelector('#display-operation');


function add(num1, num2) {
  return (+(num1) + +(num2)).toString();
}

function subtract(num1, num2) {
  return (+(num1) - +(num2)).toString();
}

function multiply(num1, num2) {
  return (+(num1) * +(num2)).toString();
}

function divide(num1, num2) {
  return (+(num1) / +(num2)).toString();
}

function operateLastObj() {
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
  }
}




const database = { // 0.
  'active number': [],
  'active operator': '',
  'operation record': [],
}


function CreateOprtnObj(operandOne, operator) {
  this.operandOne = operandOne;
  this.operator = operator;
}




function storeDigit(selected) { // 1. store selected number
  const tempDigit = database['active number']
  tempDigit.push(selected);
  display.textContent = tempDigit.join('');
}

function runOperation(selected) {
  tempActiveNum = database['active number'].join('');
  tempOprtnRecord = database['operation record'];
  if (tempOprtnRecord.length === 0) { // 2. if operation record is empty 
    database['operation record'].push(new CreateOprtnObj(tempActiveNum, selected)) // 3. create operation obj in operation record with active number and selected operator
    database['active operator'] = selected; // 4. Save the selected operator to the active operator in database
  } else if ('operandTwo' in tempOprtnRecord[tempOprtnRecord.length - 1] === false) { // 6. if the last item of operation record does not have operandTwo
    tempOprtnRecord[tempOprtnRecord.length - 1]['operandTwo'] = tempActiveNum; // 7. assign active number to operandTwo in last operation record last item
  } else if ('operandTwo' in tempOprtnRecord[tempOprtnRecord.length - 1] && selected) { // 9. if the last item of operation record have operandTwo and selected exist
    const tempSolution = operateLastObj() // 10. get solution from the last operation record item
    database['operation record'].push(new CreateOprtnObj(tempSolution, selected)) // 11. Create new operation obj in operation record with the last solution as operandOne and selected operator
    database['active operator'] = selected; // 12. save the selected operator to the active operator in databases
    tempOprtnRecord[tempOprtnRecord.length - 1]['operandTwo'] = tempActiveNum; // 13. assign active number to operandTwo in the new last operation record's last item
  } else if ('operandTwo' in tempOprtnRecord[tempOprtnRecord.length - 1] && !selected) { // 15. if the last item of operation record have operandTwo and selected does not exist
    const tempSolution = operateLastObj() // 16. get solution from the last operation record item
    const tempActiveOperator = database['active operator']
    database['operation record'].push(new CreateOprtnObj(tempSolution, tempActiveOperator)); // 17. save as previous but create new oprtnObj with solution and active operator
    tempOprtnRecord[tempOprtnRecord.length - 1]['operandTwo'] = tempActiveNum; // 18. assign active number to operandTwo in the new last operation record's last item
  }
  database['active number'] = []; // 5, 8, 14. empty active number for next input

  console.log(database['operation record']);
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
  } else if (symbolKey && !DecimalPoint) {
    DecimalPoint = true;
    storeDisplay(symbolKey.dataset.symbol);
  } else if (assignKey) {
    runOperation(); // when +/= key is pressed, assignkey(=) parameter is used first 
  } else if (enterKey) {
    enterKeySwitch(activeEl);
  } else if (opKey) { 
    runOperation(opKey.dataset.op); // check
  } else if (backspaceKey) {
    backspace(currentNum, num1, num2, previousOperator);
  }
}

function enterKeySwitch(activeEl) {
    if (activeEl.getAttribute('class') === 'digit btn') { // when a digit is focused, run enterkey as clicking the focused button
      const childSpan = activeEl.firstElementChild;
      storeDigit(childSpan.dataset.num);
    } else if (activeEl.getAttribute('class') === 'symbol btn') {
      DecimalPoint = true;
      const childSpan = activeEl.firstElementChild;
      storeDisplay(childSpan.dataset.symbol);
    } else if (
      activeEl.getAttribute('class') === 'operator btn' ||
      activeEl.getAttribute('class') === 'operate btn'
      ) { // when a operator/operate is focused, run enterkey as clicking the focused button
      const childSpan = activeEl.firstElementChild;
      runOperation(childSpan.dataset.op);
    } else if (activeEl.getAttribute('class') === 'clear btn') {
      clear();
    } else if (activeEl.getAttribute('class') === 'back btn') {
      backspace(currentNum, num1, num2, previousOperator);
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
  const clearClick = document.querySelector(`span[data-escapecode="${e.target.dataset.escapecode}"]`);
  if (numClick) {
    storeDigit(numClick.dataset.num); // check
  } else if (symbolClick && DecimalPoint === false) {
    DecimalPoint = true;
    storeDisplay(symbolClick.dataset.symbol);
  } else if (opClick) {
    runOperation(opClick.dataset.op); // check
  } else if (assignClick) {
    runOperation();
  } else if (backClick) {
    backspace();
  } else if (clearClick) {
    clear();
  }
}


window.addEventListener('click', clickBtn);
window.addEventListener('keydown', whichKey);