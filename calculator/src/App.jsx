import { useState } from 'react'
import './App.css'

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
    
    const resultStr = result === "Error" ? "Error" : result.toString().replace(".", ",");
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
      secondOperand: result.toString().replace(".", ","),
    });
  };

  return (
    <div className="container">

      <div className="calculator">
        <div className="screens">
          <span className="first-screen">{display}</span>
          <span className="second-screen">{calc.secondOperand || "0"}</span>
        </div>

        <div className="inputsWrapper">
          <button className="featured" onClick={handleClear}>C</button>
          <button className="featured" onClick={handlePlusMinus}>+/-</button>
          <button className="featured" onClick={handlePercent}>%</button>
          <button className="featured" onClick={() => handleOperator("+")}>+</button>
          <button
            className="img-button img-button-7"
            onClick={() => handleNumber("7")}
          >
            7
          </button>
          <button
            className="img-button img-button-8"
            onClick={() => handleNumber("8")}
          >
            8
          </button>
          <button
            className="img-button img-button-9"
            onClick={() => handleNumber("9")}
          >
            9
          </button>
          <button className="featured" onClick={() => handleOperator("x")}>x</button>
           <button
            className="img-button img-button-4"
            onClick={() => handleNumber("4")}
          >
            4
          </button>
          <button
            className="img-button img-button-5"
            onClick={() => handleNumber("5")}
          >
            5
          </button>
          <button
            className="img-button img-button-6"
            onClick={() => handleNumber("6")}
          >
            6
          </button>
          <button className="featured" onClick={() => handleOperator("-")}>-</button>
          <button
            className="img-button img-button-1"
            onClick={() => handleNumber("1")}
          >
            3
             </button>
            <button
            className="img-button img-button-2"
            onClick={() => handleNumber("2")}
          >
            3
             </button>
          <button
            className="img-button img-button-3"
            onClick={() => handleNumber("3")}
          >
            3
          </button>
          <button className="featured" onClick={() => handleOperator("÷")}>÷</button>
          <button onClick={()=>handleNumber(",")}>,</button>
          <button onClick={()=>handleNumber("0")}>0</button>
          <button onClick={handleBackspace}>⌫</button>
          <button className="featured" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}
