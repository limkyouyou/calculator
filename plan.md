
1. Create functions for each operator (add, subtract, multiply, divide) that takes two parameters and return solution.

2. Create an 'operate' function that takes two numbers and call on one of operator functions.

3. Create a basic HTML calculator with ... 
    - buttons for each digits
    - buttons for each operator
    - an equals button
    - a clear button
    - display for the calculator

3. Create a function that populates the display when number button is clicked.
    - store the display value in a variable

4. Store the displayed number when an operator button is clicked
    - if a number is already stored, execute operate function and store its return instead

5. Store which operation is chosen and then operate on them when equals button is clicked
    - once operate function is called, update the display with the solution

Steps
  1. clicked '1' 
    - store '1' to currentNum array as the first item 
    - display = currentNum value as string
    >> function1(num) -> currentNum.push(num); display = currentNum.join('');
  2. clicked '0' 
    - store '0' to the currentNum array as the second item
    - display = currentNum value as string
    >> function1(num) -> currentNum.push(num); display = currentNum.join('');
  3. clicked '+' 
    - store currentNum value as string '10' to num1
    - clear currentNum = display
    - store 'addition' as currentOperator
    >> operator = operator button data value
    >> function2(operator, currentNum) -> if !num1 then num1 = currentNum.join(''); else then num2 = currentNum.join(''); if currentOperator then num1 = operate(currentOperator, num1, num2) -> currentOperator(num1, num2); currentOperator = operator; display = currentNum.join(''); currentNum = [];
  4. clicked '2' 
    - store '2' to currentNum array as the first item
    - display = currentNum value as string '2'
    >> function1(num) -> currentNum.push(num); display = currentNum.join('');
  5. clicked '*' 
    - store currentNum value as string '2' to num2
    - run operate with num1, num2, and currentOperator
    - store result as the new num1 and currentNum
    - display = currentNum value as string
    - store '*' as the new currentOperator
    >> operator = operator button data value
    >> function2(operator, currentNum) -> if !num1 then num1 = currentNum.join(''); else then num2 = currentNum.join(''); if currentOperator then num1 = operate(currentOperator, num1, num2) -> currentOperator(num1, num2); currentOperator = operator; display = currentNum.join(''); currentNum = [];
  6. clicked '4' 
    - clear currentNum = display
    - store '4' to currentNum array as the first item
    - display = currentNum value as string '4'
    >> function1(num) -> currentNum.push(num); display = currentNum.join('');
  7. clicked '-' 
    - store currentNum value '4' to num2
    - run operate with num1, num2, and currentOperator
    - store result as the new num1, and currentNum
    - display = currentNum value as string
    - store '-' as the new currentOperator
    >> operator = operator button data value
    >> function2(operator, currentNum) -> if !num1 then num1 = currentNum.join(''); else then num2 = currentNum.join(''); if currentOperator then num1 = operate(currentOperator, num1, num2) -> currentOperator(num1, num2); currentOperator = operator; display = currentNum.join(''); currentNum = [];
  8. clicked '3' 
    - clear currentNum = display
    - store '3' to currentNum array as the first item
    - display = currentNum as string
    >> function1(num) -> currentNum.push(num); display = currentNum.join('');
  9. clicked '=' 
    - store currentNum value as string '3' to num2
    - run operate with num1, num2, and currentOperator
    - store result as the new num1 and currentNum
    - display = currentNum value as string
    >> operator = operator button data value
    >> function2(operator, currentNum) -> if !num1 then num1 = currentNum.join(''); else then num2 = currentNum.join(''); if currentOperator then num1 = operate(currentOperator, num1, num2) -> currentOperator(num1, num2); currentOperator = operator; display = currentNum.join(''); currentNum = [];
  10. clicked 'clear' - prompt warning msg, when clicked okay, clear currentNum, num1, num2, currentOperator

** the calculator should evaluate single pair of numbers at a time.
** round answers with long decimals.
** solution for clicking equals button before entering all the numbers or an operator.
** clicking clear button should wipe out all the existing data.
** solution for a case where user tries to divide by 0.

6. Add '.' button, no more than 1 decimal input

7. Add design to the calculator.

8. Add backspace button.

9. Add keyboard support.