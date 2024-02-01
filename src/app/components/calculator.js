import React, { useState } from "react";
import styles from "./calculator.module.css";

function Key({ label, type, span, selected, onClick }) {
    return (
      <div className={`${styles.key} ${styles[type]}`} onClick={onClick}>
        {label}
      </div>
    );
  }
function Alert({text}){
    return(
        alert(text)
    );
}
function Calculator() {
  //currentNumber = "x" means user inputting first operand
  const [currentNumber, setCurrentNumber] = useState("x");
  const [operandA, setOperandA] = useState("");
  const [operandB, setOperandB] = useState("");
  const [operator, setOperator] = useState(null);
  const displayValue =
    currentNumber === "x" || operandB === "" ? operandA : operandB;

  function onClear() {
    setCurrentNumber("x");
    setOperandA("");
    setOperator(null);
    setOperandB("");
  }

  function onNumberClick(number) {
    const operand = currentNumber === "x" ? operandA : operandB;
    const setOperand = currentNumber === "x" ? setOperandA : setOperandB;
    if (operand === "ERROR" || operand === "Infinity"){
        setOperand(number.toString());
    } else{
        setOperand(operand + number);
    }
  }

  function onDecimalPointClick() {
    const operand = currentNumber === "x" ? operandA : operandB;
    const setOperand = currentNumber === "x" ? setOperandA : setOperandB;

    if (!operand.includes(".")) {
      setOperand(operand + ".");
    }
  }

  function onOperatorClick(operator) {
    //currentNumber = "y" means user inputting second operand
    if (currentNumber === "y") {
      onEqualsClick();
    }
    if (
      operandA === "" ||
      Number(operandA) === Infinity ||
      isNaN(Number(operandA))   
    ) {
      return;
    }
    setOperator(operator);
    setCurrentNumber("y");
  }

  function onPlusMinus() {
    const operand = currentNumber === "x" ? operandA : operandB;
    const setOperand = currentNumber === "x" ? setOperandA : setOperandB;

    if (operand.startsWith("-")) {
      setOperand(operand.substring(1));
    } else {
      setOperand("-" + operand);
    }
  }

  function onEqualsClick() {
    if (
      operandA === "" ||
      operandB === "" ||
      isNaN(Number(operandA)) ||
      isNaN(Number(operandB)) ||
      operator === null
    ) {
      alert("Set the operation!")
      setOperandA("ERROR")
      return;
    }
    const operandAAsNumber = parseFloat(operandA);
    const operandBAsNumber = parseFloat(operandB);
    let result;

    if (operator === "Plus") {
      result = operandAAsNumber + operandBAsNumber;
    } else if (operator === "Minus") {
      result = operandAAsNumber - operandBAsNumber;
    } else if (operator === "Multiply") {
      result = operandAAsNumber * operandBAsNumber;
    } else if (operator === "Divide") {
      result = operandAAsNumber / operandBAsNumber;
    } else if (operator === "Power") {
      result = operandAAsNumber ** operandBAsNumber;
    } else if (operator === "Modulo") {
      result = operandAAsNumber % operandBAsNumber;
    }
    
    if (result.toString() === "Infinity"){
        alert("The result is infinite!")
    }
    setOperandA(result.toString());
    setOperator(null);
    setOperandB("");
    setCurrentNumber("x");
  }

  return (
    <div className={styles.calculator}>
      <p className={styles.header}>QuickCalc 1.0</p>
      <input value={displayValue} readOnly />
      <div className={styles.row}>
        <Key
          label="^"
          type="primary"
          onClick={() => {
            onOperatorClick("Power");
          }}
          selected={operator === "Power"}
        />
        <Key
          label="%"
          type="primary"
          onClick={() => {
            onOperatorClick("Modulo");
          }}
          selected={operator === "Modulo"}
        />
        <Key label="±" type="primary" onClick={onPlusMinus} />
        <Key
          label="/"
          type="primary"
          onClick={() => {
            onOperatorClick("Divide");
          }}
          selected={operator === "Divide"}
        />
        <Key label="7" type="secondary" onClick={() => onNumberClick(7)} />
        <Key label="8" type="secondary" onClick={() => onNumberClick(8)} />
        <Key label="9" type="secondary" onClick={() => onNumberClick(9)} />
        <Key
          label="×"
          type="primary"
          onClick={() => {
            onOperatorClick("Multiply");
          }}
          selected={operator === "Multiply"}
        />
        <Key label="4" type="secondary" onClick={() => onNumberClick(4)} />
        <Key label="5" type="secondary" onClick={() => onNumberClick(5)} />
        <Key label="6" type="secondary" onClick={() => onNumberClick(6)} />
        <Key
          label="+"
          type="primary"
          onClick={() => {
            onOperatorClick("Plus");
          }}
          selected={operator === "Plus"}
        />
        <Key label="1" type="secondary" onClick={() => onNumberClick(1)} />
        <Key label="2" type="secondary" onClick={() => onNumberClick(2)} />
        <Key label="3" type="secondary" onClick={() => onNumberClick(3)} />
        <Key
          label="-"
          type="primary"
          onClick={() => {
            onOperatorClick("Minus");
          }}
          selected={operator === "Minus"}
        />
        <Key label="C" type="tertiary" onClick={onClear} />
        <Key
          label="0"
          span={2}
          type="secondary"
          onClick={() => onNumberClick(0)}
        />
        <Key label="." type="secondary" onClick={onDecimalPointClick} />
        <Key label="=" type="primary" onClick={onEqualsClick} />
      </div>
    </div>
  );
}

export default Calculator;
