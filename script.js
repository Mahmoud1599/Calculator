// LightDark Theme
/*eslint-disable*/

const toggleButton = document.querySelector('.themes__toggle');

const darkTheme = () => toggleButton.classList.toggle('themes__toggle--isActive');

const darkThemeKeyEnter = (event) => (event.key === 'Enter') && darkTheme();

toggleButton.addEventListener('click', darkTheme);
toggleButton.addEventListener('keydown', darkThemeKeyEnter);

// project logic

let curruntNumber = '';
let storedNumber = '';
let operation = '';

const resultNumber = document.querySelector('.calc__result');
const keys = document.querySelectorAll('[data-type]');

const updateScreen = (value) => { resultNumber.innerHTML = !value ? '0' : value; };

const resetButtonHandler = () => {
  curruntNumber = '';
  storedNumber = '';
  operation = '';
  updateScreen(curruntNumber);
};

const deleteButtonHandler = () => {
  if(curruntNumber && !storedNumber){
      if (!curruntNumber || curruntNumber === '0') return;
      if (curruntNumber.length === 1) {
            curruntNumber = '';
      } else {
          curruntNumber = curruntNumber.slice(0, curruntNumber.length - 1);
       }
        updateScreen(curruntNumber);
// } else {
//       if( storedNumber.length === 1){
//         let temp = storedNumber;
//            temp = '';
//             updateScreen(temp);
//       }else {
//         let temp = storedNumber;
//         temp = temp.substring(0, curruntNumber.length - 1);
//   updateScreen(temp);
// }

}


}
;

const excutionOperation = () => {
  if (curruntNumber&&storedNumber){
    switch(operation){
        case '+':
        storedNumber= parseFloat(storedNumber) + parseFloat(curruntNumber);
        break;
        case '-':
        storedNumber = parseFloat(storedNumber) - parseFloat(curruntNumber);
        break;
        case '*':
        storedNumber= parseFloat(storedNumber) * parseFloat(curruntNumber);
        break;
        case '/':
        storedNumber= parseFloat(storedNumber) / parseFloat(curruntNumber);
        break;
    }
    curruntNumber = '';
    updateScreen(storedNumber);
  }
  
};

const operationButtonHandler = (operationValue) => {
  if (!curruntNumber && !storedNumber) return;

  if (curruntNumber && !storedNumber){
    storedNumber = curruntNumber;
    curruntNumber = '';
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (curruntNumber) excutionOperation();
  }
};

const numberButtonHandler = (value) => {
  if (value === '.' && curruntNumber.includes('.')) return;
  if (value === '0' && !curruntNumber) return;
  if (curruntNumber.length === 18) return;
  curruntNumber += value;
  updateScreen(curruntNumber);
};

const keyHandler = (key) => {
  key.addEventListener('click', () => {
    if (key.dataset.type === 'number') {
      numberButtonHandler(key.dataset.value);
    } else if (key.dataset.type === 'operation') {
      switch (key.dataset.value) {
        case 'c':
          resetButtonHandler();
          break;
        case 'Backspace':
          deleteButtonHandler();
          break;
        case 'Enter':
          excutionOperation();
          break;
        default:
          operationButtonHandler(key.dataset.value);
      }
    }
  });
};

keys.forEach(keyHandler);

const availableNumbers = ["0","1","2","3","4","5","6","7","8","9",".",];
const availableOperations = ["+", "-", "*", "/"];
const availableKeys = [...availableNumbers,...availableOperations,"Backspace","Enter","c",];

window.addEventListener("keydown", (event) => {
  keyboardWithHover(event.key);
});

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {

    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();
    setTimeout(() => elem.classList.remove("hover"), 100);
  }
};
