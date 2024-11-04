import React, { useState } from "react";

const Expense = () => {
  const [inputVal, setInputValue] = useState({
    home: "",
    rentAmount: "",
    foodAmount: "",
    entertainmentAmount: "",
    utilitiesAmount: "",
    personalAmount: "",
    othersAmount: "",
  });
  const [selectRadio, setSelectRadio] = useState("own");

  const setVal = (e) => {
    const { name, value } = e.target;

    if (name === "home") {
      setSelectRadio(value);

      setInputValue((prev) => ({
        ...prev,
        home: value,
        rentAmount: value === "own" ? "" : prev.rentAmount,
      }));
    } else {
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    const {
      home,
      rentAmount,
      foodAmount,
      entertainmentAmount,
      utilitiesAmount,
      personalAmount,
      othersAmount,
    } = inputVal;
  
    if (home === "rent" && rentAmount.trim() === "") {
      return alert("Please enter your rent.");
    } else if (foodAmount.trim() === "") {
      return alert("Please enter your food cost.");
    } else if (entertainmentAmount.trim() === "") {
      return alert("Please enter your entertainment cost.");
    } else if (utilitiesAmount.trim() === "") {
      return alert("Please enter your utilities cost.");
    } else if (personalAmount.trim() === "") {
      return alert("Please enter your personal cost.");
    } else if (othersAmount.trim() === "") {
      return alert("Please enter your others cost.");
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:6999/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          home,
          rentAmount: home === "rent" ? rentAmount : null,
          foodAmount,
          entertainmentAmount,
          utilitiesAmount,
          personalAmount,
          othersAmount,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Error saving expense");
      }
  
      alert("Expense saved successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <form>
        {/* home */}
        <label htmlFor="home">Home:</label>
        <input
          type="radio"
          name="home"
          id="HomeOwn"
          value="own"
          checked={selectRadio === "own"}
          onChange={setVal}
        />
        Own
        <input
          type="radio"
          name="home"
          id="HomeRent"
          value="rent"
          checked={selectRadio === "rent"}
          onChange={setVal}
        />
        Rent
        <input
          id="rentAmount"
          type="text"
          name="rentAmount"
          placeholder={selectRadio === "rent" ? "Enter Your Rent" : "0"}
          disabled={selectRadio === "own"}
          value={inputVal.rentAmount}
          onChange={setVal}
        />
        {/* food */}
        <label htmlFor="foodAmount">Food:</label>
        <input
          id="foodAmount"
          type="text"
          onChange={setVal}
          name="foodAmount"
          value={inputVal.foodAmount}
          placeholder="Enter Your Food Cost"
        />
        {/* entertainment */}
        <label htmlFor="entertainmentAmount">Entertainment:</label>
        <input
          id="entertainmentAmount"
          type="text"
          name="entertainmentAmount"
          onChange={setVal}
          value={inputVal.entertainmentAmount}
          placeholder="Enter Your Entertainment Cost"
        />
        {/* utilities */}
        <label htmlFor="utilitiesAmount">Utilities:</label>
        <input
          id="utilitiesAmount"
          type="text"
          name="utilitiesAmount"
          onChange={setVal}
          value={inputVal.utilitiesAmount}
          placeholder="Enter Your utilities Cost"
        />
        {/* personal */}
        <label htmlFor="personalAmount">Personal:</label>
        <input
          id="personalAmount"
          type="text"
          name="personalAmount"
          onChange={setVal}
          value={inputVal.personalAmount}
          placeholder="Enter Your personal Cost"
        />
        {/* other */}
        <label htmlFor="othersAmount">Others:</label>
        <input
          id="othersAmount"
          type="text"
          name="othersAmount"
          onChange={setVal}
          value={inputVal.othersAmount}
          placeholder="Enter Your others Cost"
        />
        <button type="button" onClick={addExpense}>
          Submit
        </button>
        <button type="button">Cancel</button>
      </form>
    </>
  );
};

export default Expense;
