import React, { useEffect, useState } from "react";
import Keypad from "../components/Keypad";
import ButtonConvert from "../components/ButtonConvert";
import "../style/logout-button.css";
import "../style/calculator-page.css";
import angkaTerbilang from "@develoka/angka-terbilang-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CalculatorPages = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL_PRODUCTION;
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {}, [op, nextValue, prevValue]);
  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };
  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };
  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };
  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };
  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
  };
  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearData();
    } else if (value === ".") {
      insertDot();
    }
  };
  const pembilang = angkaTerbilang(nextValue);
  const convertToBahasa = () => {
    alert(`Angka ini terbilang ${pembilang}`);
  };
  const handleLogout = async () => {
    let token = localStorage.getItem("token");
    let data = {};
    let setHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const logout = await axios.post(`${baseUrl}/logout`, data, setHeaders);
    if (logout.data.success === true) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="main-logout">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="calculator">
        <div className="calculator-input">
          <div className="result">{nextValue}</div>
        </div>
        <div className="calculator-keypad">
          <div className="keys-function">
            <ButtonConvert keyValue={"Pembilang"} onClick={convertToBahasa} />
            <Keypad keyValue={"c"} onClick={handleOperation} />
          </div>
          <div className="keys-operators">
            <Keypad keyValue={"+"} onClick={handleOperation} />
            <Keypad keyValue={"-"} onClick={handleOperation} />
            <Keypad keyValue={"*"} onClick={handleOperation} />
            <Keypad keyValue={"/"} onClick={handleOperation} />
            <Keypad keyValue={"="} onClick={handleOperation} />
          </div>
          <div className="keys-numbers">
            <Keypad keyValue={9} onClick={handleOperation} />
            <Keypad keyValue={8} onClick={handleOperation} />
            <Keypad keyValue={7} onClick={handleOperation} />
            <Keypad keyValue={6} onClick={handleOperation} />
            <Keypad keyValue={5} onClick={handleOperation} />
            <Keypad keyValue={4} onClick={handleOperation} />
            <Keypad keyValue={3} onClick={handleOperation} />
            <Keypad keyValue={2} onClick={handleOperation} />
            <Keypad keyValue={1} onClick={handleOperation} />
            <Keypad
              className="key-dot"
              keyValue={"."}
              onClick={handleOperation}
            />
            <Keypad
              className="key-zero"
              keyValue={0}
              onClick={handleOperation}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CalculatorPages;
