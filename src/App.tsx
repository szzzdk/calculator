import "./App.css";
import { useState } from "react";
import { Button } from "./Button";
import { OPERATORS } from "./constants/constants";

function App() {
  const [result, setResult] = useState<string>("");
  const [currValue, setCurrValue] = useState<string>("0");
  const [prevValue, setPrevValue] = useState<string>("0");
  const [operator, setOperator] = useState<OPERATORS | null>(null);

  const handleInput = (value?: string) => {
    setCurrValue((prev) => {
      if (prev === "0") {
        return String(value);
      } else if (prev === "-0") {
        return "-" + value;
      } else {
        return prev + value;
      }
    });
  };

  const handleOperator = (op?: string) => {
    if (!op) return;

    if ((op as OPERATORS) === OPERATORS.plusMinus) {
      if (currValue === "0") {
        setCurrValue("-0");
      } else if (currValue.startsWith("-")) {
        setCurrValue(currValue.slice(1));
      } else {
        setCurrValue("-" + currValue);
      }
      return;
    }

    if ((op as OPERATORS) === OPERATORS.dot) {
      if (currValue === "0") {
        setCurrValue(currValue.slice(1) + "0" + "." + currValue);
      } 
      return;
    }

    if ((op as OPERATORS) === OPERATORS.percent) {
      const calculationResult = performCalculation(
        0,
        Number(currValue),
        OPERATORS.percent
      );
      setCurrValue(String(calculationResult));
    } else if((op as OPERATORS) === OPERATORS.dot) {
      const calculationResult = performCalculation(
        0,
        Number(currValue),
        OPERATORS.dot
      );
      setCurrValue(String(calculationResult));
    } else {
      if (op) {
        const calculationResult = performCalculation(
          Number(prevValue),
          Number(currValue),
          op as OPERATORS
        );
        setResult(String(calculationResult));
        setPrevValue(String(calculationResult));
        setCurrValue("");
      } else {
        setPrevValue(currValue);
        setCurrValue("");
      }
    }

    setOperator(op as OPERATORS);
  };

  console.log("curr", currValue);
  console.log("prev", prevValue);

  const handleCalculate = () => {
    if (operator && currValue) {
      const calculationResult = performCalculation(
        Number(prevValue),
        Number(currValue),
        operator
      );

      setResult(calculationResult.toString() || "0");
      setPrevValue("");
      setCurrValue(calculationResult.toString() || "0");
      setOperator(null);
    }
  };

  const handleReset = () => {
    setCurrValue("0");
    setPrevValue("");
    setResult("");
    setOperator(null);
  };

  const performCalculation = (
    prev: number,
    curr: number,
    operator: OPERATORS | null
  ) => {
    switch (operator) {
      case OPERATORS.sum:
        return curr + prev;
      case OPERATORS.subtract:
        return prev - curr;
      case OPERATORS.multiply:
        return prev * curr;
      case OPERATORS.division:
        return prev / curr;
      case OPERATORS.plusMinus:
        return -(curr || prev);
      case OPERATORS.percent:
        return curr / 100;
      case OPERATORS.dot:
        return "." + curr;
      default:
        return curr;
    }
  };

  return (
    <>
      <div className="bg-black">
        <div className="flex items-end justify-end h-10 text-white">
          {currValue ? currValue : result}
        </div>
        <div className="buttons">
          <div className="flex">
            <div className="flex">
              <Button key="AC" onClick={handleReset}>
                AC
              </Button>
              <Button onClick={handleOperator}>{OPERATORS.plusMinus}</Button>
              <Button key="%" onClick={handleOperator}>
                {OPERATORS.percent}
              </Button>
              <Button onClick={handleOperator}>{OPERATORS.division}</Button>
            </div>
          </div>
          <div className="flex">
            {["7", "8", "9"].map((btn) => (
              <Button key={btn} onClick={handleInput}>
                {btn}
              </Button>
            ))}
            <Button key={OPERATORS.multiply} onClick={handleOperator}>
              {OPERATORS.multiply}
            </Button>
          </div>
          <div className="flex">
            {["4", "5", "6"].map((btn) => (
              <Button key={btn} onClick={handleInput}>
                {btn}
              </Button>
            ))}
            <Button key={OPERATORS.subtract} onClick={handleOperator}>
              {OPERATORS.subtract}
            </Button>
          </div>
          <div className="flex">
            {["1", "2", "3"].map((btn) => (
              <Button key={btn} onClick={handleInput}>
                {btn}
              </Button>
            ))}
            <Button key={OPERATORS.sum} onClick={handleOperator}>
              {OPERATORS.sum}
            </Button>
          </div>
          <div className="flex">
            <Button key="0" className="w-24" onClick={handleInput}>
              0
            </Button>
            <Button key="." onClick={handleOperator}>
              .
            </Button>
            <Button key="=" onClick={handleCalculate}>
              =
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
