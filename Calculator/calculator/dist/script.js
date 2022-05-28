import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
const { useState } = React;
const Calculator = () => {
  const [displayText, setDisplayText] = useState('0');
  const [calculationArray, setCalculationArray] = useState([]);
  const [calcHistory, setCalcHistory] = useState('');
  const [isNegative, setIsNegative] = useState(false);

  const clear = () => {
    setDisplayText('0');
    setCalculationArray([]);
    setCalcHistory('');
  };
  const addNumber = string => {
    //If the number already has a decimal return
    if (string === '.' && displayText.match(/[.]/)) return;
    setCalcHistory(prev => prev + string);
    setDisplayText(prev => {
      if (prev.length == 1 && prev === '0' || prev.match(/[^\d.]/) && isNegative === false) return string;else
      return prev += string;
    });
  };
  const addNegative = () => {
    //Check for invalid multiple negative signs 
    if (displayText.match(/[\-\+]/)) return false;
    setIsNegative(true);
    setDisplayText('-');
    return true;
  };
  const addCalculation = string => {
    if (displayText === '0') setCalcHistory('0');
    //if the prev input was a calc operation then change the operation to the new one and return
    if (displayText.match(/[^(^\d*\.?\d*$)]/)) {
      if (string === '-') {
        if (addNegative()) return;
      }
      setDisplayText(prev => {
        if (isNegative) {
          setCalculationArray(prev => [...prev.slice(0, -1), string]);
          return '';
        } else
        {
          setCalculationArray(prev => [...prev.slice(0, -1), string]);
          return string;
        }});
      return;
    };
    setIsNegative(false);
    setCalculationArray(prev => [...prev, displayText]);
    setCalculationArray(prev => [...prev, string]);
    setDisplayText(string);
    setCalcHistory(prev => prev + string);
  };
  const doCalculation = () => {
    if (displayText.match(/[^-?(^\d*\.?\d*$)]/) || displayText === '') return;
    let text = '';
    setCalculationArray(prev => {
      let newArray = [...prev, displayText];
      for (let i = 0; i < newArray.length; i += 3) {
        console.log(newArray);
        switch (newArray[i + 1]) {
          case '+':
            text = (parseFloat(newArray[i]) + parseFloat(newArray[i + 2])).toString();
            setDisplayText(text);
            break;
          case '-':
            text = (parseFloat(newArray[i]) - parseFloat(newArray[i + 2])).toString();
            setDisplayText(text);
            break;
          case 'x':
            text = (parseFloat(newArray[i]) * parseFloat(newArray[i + 2])).toString();
            setDisplayText(text);
            break;
          case '/':
            text = (parseFloat(newArray[i]) / parseFloat(newArray[i + 2])).toString();
            setDisplayText(text);
            break;}

        newArray = [text, ...newArray.slice(3)];
        if (newArray.length > 2) i = -3;
        console.log(newArray);
      }
      return newArray;
    });
    if (calculationArray.length > 0) setCalcHistory(prev => prev + '=' + text);
    setCalculationArray([]);
  };
  return /*#__PURE__*/(
    React.createElement("div", { className: "calc-container" }, /*#__PURE__*/
    React.createElement("div", { id: "display-container" }, /*#__PURE__*/
    React.createElement("p", { id: "calc-history" }, calcHistory), /*#__PURE__*/
    React.createElement("p", { id: "display" }, displayText)), /*#__PURE__*/

    React.createElement("div", { className: "grid" }, /*#__PURE__*/
    React.createElement("div", { id: "clear", className: "button",
      onClick: clear }, /*#__PURE__*/
    React.createElement("p", null, "AC")), /*#__PURE__*/

    React.createElement("div", { id: "divide", className: "button",
      onClick: () => addCalculation('/') }, /*#__PURE__*/
    React.createElement("p", null, "/")), /*#__PURE__*/

    React.createElement("div", { id: "multiply", className: "button",
      onClick: () => addCalculation('x') }, /*#__PURE__*/
    React.createElement("p", null, "x")), /*#__PURE__*/

    React.createElement("div", { id: "seven", className: "button",
      onClick: () => addNumber('7') }, /*#__PURE__*/
    React.createElement("p", null, "7")), /*#__PURE__*/

    React.createElement("div", { id: "eight", className: "button",
      onClick: () => addNumber('8') }, /*#__PURE__*/
    React.createElement("p", null, "8")), /*#__PURE__*/

    React.createElement("div", { id: "nine", className: "button",
      onClick: () => addNumber('9') }, /*#__PURE__*/
    React.createElement("p", null, "9")), /*#__PURE__*/

    React.createElement("div", { id: "subtract", className: "button",
      onClick: () => addCalculation('-') }, /*#__PURE__*/
    React.createElement("p", null, "-")), /*#__PURE__*/

    React.createElement("div", { id: "four", className: "button",
      onClick: () => addNumber('4') }, /*#__PURE__*/
    React.createElement("p", null, "4")), /*#__PURE__*/

    React.createElement("div", { id: "five", className: "button",
      onClick: () => addNumber('5') }, /*#__PURE__*/
    React.createElement("p", null, "5")), /*#__PURE__*/

    React.createElement("div", { id: "six", className: "button",
      onClick: () => addNumber('6') }, /*#__PURE__*/
    React.createElement("p", null, "6")), /*#__PURE__*/

    React.createElement("div", { id: "add", className: "button",
      onClick: () => addCalculation('+') }, /*#__PURE__*/
    React.createElement("p", null, "+")), /*#__PURE__*/

    React.createElement("div", { id: "one", className: "button",
      onClick: () => addNumber('1') }, /*#__PURE__*/
    React.createElement("p", null, "1")), /*#__PURE__*/

    React.createElement("div", { id: "two", className: "button",
      onClick: () => addNumber('2') }, /*#__PURE__*/
    React.createElement("p", null, "2")), /*#__PURE__*/

    React.createElement("div", { id: "three", className: "button",
      onClick: () => addNumber('3') }, /*#__PURE__*/
    React.createElement("p", null, "3")), /*#__PURE__*/

    React.createElement("div", { id: "equals", className: "button",
      onClick: doCalculation }, /*#__PURE__*/
    React.createElement("p", null, "=")), /*#__PURE__*/

    React.createElement("div", { id: "zero", className: "button",
      onClick: () => addNumber('0') }, /*#__PURE__*/
    React.createElement("p", null, "0")), /*#__PURE__*/

    React.createElement("div", { id: "decimal", className: "button",
      onClick: () => addNumber('.') }, /*#__PURE__*/
    React.createElement("p", null, ".")))));




};
const App = () => {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement(Calculator, null)));


};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#root'));