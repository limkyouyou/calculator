
const display = document.querySelector('#display');
const operationDisplay = document.querySelector('#display-operation');



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
    backspace(currentNum, num1, num2, previousOperator);
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
      backspace(currentNum, num1, num2, previousOperator);
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