import { useState } from 'react'
import './App.css'

function formatResult(value) {
  if (typeof value !== 'number' || !isFinite(value)) {
    return value.toString();
  }

  const maxLen = 10;
  const isNegative = value < 0;
  const sign = isNegative ? '-' : '';
  const abs = Math.abs(value);

  for (let decimals = 8; decimals >= 0; decimals--) {
    let rounded = abs.toFixed(decimals);
    if (decimals > 0) {
      rounded = rounded.replace(/\.0+$/, '').replace(/\.([^0]*)0+$/, '.$1');
      rounded = rounded.replace(/\.$/, '');
    }
    let str = sign + rounded.replace('.', ',');
    if (str.length <= maxLen) {
      return str;
    }
  }

  const intStr = Math.trunc(abs).toString();
  let intResult = sign + intStr;
  if (intResult.length <= maxLen) {
    return intResult;
  }

  let exp = value.toExponential(3).replace('.', ',');
  if (exp.length > maxLen) {
    exp = exp.slice(0, maxLen);
  }
  return exp;
}

export default function App() {
  const [calc, setCalc] = useState({
    firstOperand: null,
    secondOperand: null,
    operator: "=",
  });
  const [display, setDisplay] = useState("0");

  const handleNumber = (number) => {
    if(calc.secondOperand !== null && calc.secondOperand.length >= 10) return;
    if(calc.secondOperand === "0" && number === "0") return;  
    if(calc.secondOperand?.includes(",") && number === ",")return;
    let l_calc={}
    if(calc.secondOperand === null && number === ","){
      l_calc={
        ...calc, 
        secondOperand: "0,"  
      }
    } else{
      l_calc={
        ...calc,
      secondOperand: 
        calc.secondOperand !== null ? calc.secondOperand + number : number,
    }

    }
    setCalc(l_calc);
  };

  const handleOperator = (op) => {
    if (calc.secondOperand === null) return;
    
    let result = calc.firstOperand;
    const current = parseFloat(calc.secondOperand.replace(",", "."));
    
    if (calc.firstOperand !== null) {
      const first = parseFloat(calc.firstOperand.toString().replace(",", "."));
      
      switch (calc.operator) {
        case "+":
          result = first + current;
          break;
        case "-":
          result = first - current;
          break;
        case "x":
          result = first * current;
          break;
        case "÷":
          result = current !== 0 ? first / current : "Error";
          break;
        default:
          result = current;
      }
    } else {
      result = current;
    }
    
    const resultStr = result === "Error" ? "Error" : result.toString().replace(".", ",");
    setDisplay(calc.secondOperand + " " + op);
    
    setCalc({
      firstOperand: result,
      secondOperand: null,
      operator: op,
    });
  };

  const handleEquals = () => {
    if (calc.secondOperand === null || calc.firstOperand === null) return;
    
    const first = parseFloat(calc.firstOperand.toString().replace(",", "."));
    const second = parseFloat(calc.secondOperand.replace(",", "."));
    let result;
    
    switch (calc.operator) {
      case "+":
        result = first + second;
        break;
      case "-":
        result = first - second;
        break;
      case "x":
        result = first * second;
        break;
      case "÷":
        result = second !== 0 ? first / second : "Error";
        break;
      default:
        result = second;
    }

    const resultStr = result === "Error" ? "Error" : formatResult(result);
    setDisplay(calc.firstOperand.toString().replace(".", ",") + " " + calc.operator + " " + calc.secondOperand);
    
    setCalc({
      firstOperand: null,
      secondOperand: resultStr,
      operator: "=",
    });
  };

  const handleClear = () => {
    setCalc({
      firstOperand: null,
      secondOperand: null,
      operator: "=",
    });
    setDisplay("0");
  };

  const handleBackspace = () => {
    if (calc.secondOperand === null || calc.secondOperand.length === 0) return;
    
    const newValue = calc.secondOperand.slice(0, -1);
    setCalc({
      ...calc,
      secondOperand: newValue.length > 0 ? newValue : null,
    });
  };

  const handlePlusMinus = () => {
    if (calc.secondOperand === null) return;
    
    if (calc.secondOperand.startsWith("-")) {
      setCalc({
        ...calc,
        secondOperand: calc.secondOperand.slice(1),
      });
    } else {
      setCalc({
        ...calc,
        secondOperand: "-" + calc.secondOperand,
      });
    }
  };

  const handlePercent = () => {
    if (calc.secondOperand === null) return;
    
    const value = parseFloat(calc.secondOperand.replace(",", "."));
    const result = value / 100;
    setCalc({
      ...calc,
      secondOperand: formatResult(result),
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>My Calculator App</h1>
        <p>Prepared by: Bibingkinitan</p>
      </div>

      <div className="calculator">
        <div className="screens">
          <span className="first-screen">{display}</span>
          <span className="second-screen">{calc.secondOperand || "0"}</span>
        </div>

        <div className="inputsWrapper">
          <button
            className="img-button img-button-c"
            onClick={() => handleClear("c")}
          >
           
          </button>
          <button className="img-button img-button-sign" onClick={handlePlusMinus}></button>
          <button className="img-button img-button-percent" onClick={handlePercent}></button>
          <button className="img-button img-button-plus" onClick={() => handleOperator("+")}></button>
          <button
            className="img-button img-button-7"
            onClick={() => handleNumber("7")}
          >
           
          </button>
          <button
            className="img-button img-button-8"
            onClick={() => handleNumber("8")}
          >
           
          </button>
          <button
            className="img-button img-button-9"
            onClick={() => handleNumber("9")}
          >
          
          </button>
          <button className="img-button img-button-x" onClick={() => handleOperator("x")}></button>
           <button
            className="img-button img-button-4"
            onClick={() => handleNumber("4")}
          >
           
          </button>
          <button
            className="img-button img-button-5"
            onClick={() => handleNumber("5")}
          >
           
          </button>
          <button
            className="img-button img-button-6"
            onClick={() => handleNumber("6")}
          >
            
          </button>
          <button className="img-button img-button-minus" onClick={() => handleOperator("-")}></button>
          <button
            className="img-button img-button-1"
            onClick={() => handleNumber("1")}
          >
            
             </button>
            <button
            className="img-button img-button-2"
            onClick={() => handleNumber("2")}
          >
            
             </button>
          <button
            className="img-button img-button-3"
            onClick={() => handleNumber("3")}
          >
           
          </button>
          <button className="img-button img-button-divide" onClick={() => handleOperator("÷")}></button>
           <button
            className="img-button img-button-coma"
            onClick={() => handleNumber(",")}
          >
           
          </button>
          <button className="img-button img-button-0" onClick={()=>handleNumber("0")}></button>
          <button className="img-button img-button-backspace" onClick={handleBackspace}></button>
          <button className="img-button img-button-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}
