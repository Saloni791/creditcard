import { useState } from "react";
import React from "react";
import "./App.css";

function App() {

  const [cardList, setCardList] = useState([]);

  function handleChange(e) {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");

    let fieldIntIndex = parseInt(fieldIndex, 10);
    console.log(value)
    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {

      const result = value.match(/.{1,4}/g) || []; //  ['abcd', 'abcd', 'abcd'] 
      console.log(result)

      if (fieldIntIndex < 4) {

        // Get the next input field using it's name
        const nextfield = document.querySelector(`input[name=text-${fieldIntIndex + 1}]`);
        console.log(nextfield)
        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    }
  };

  function handleSubmit(e) {

    e.preventDefault();
    console.log(e.target.length)
    const data = [];
    for (var i = 0; i < 4; i++) {
      data.push(e.target[i].value)
    }
    console.log(data)
    setCardList([...cardList, data.join(" ")])
  }
  console.log(cardList)


  function handleDelete(i) {
    cardList.splice(i, 1)
    setCardList([...cardList])
    console.log(i)
  }


  function handlePaste(e) {
    let data = e.clipboardData.getData("text/plain");
    let arr = data.split("")
    console.log(arr);
    //  6,5,4,3
    let arr1 = arr.splice(0, 4)
    let arr2 = arr.splice(0, 4)
    let arr3 = arr.splice(0, 4)
    //    let arr4 = arr.splice(0,4)
    arr2 = arr2.join("")
    arr3 = arr3.join("")
    arr = arr.join("")
    setCardList({...cardList,
      "secValue":arr2,
      "thirdValue":arr3,
      "fourthValue":arr,
  });
  }

  // 12345678912345678

  return (
    <div className="mail">
      <h2>
        Input Credit Card Number and Submit
      </h2>
      <form name="form1" onSubmit={handleSubmit}>
        <ul>
          <div className="input_text">
            <li >
              <input type="text" name="text-1" className="input1" maxLength={4} onChange={handleChange} onPaste={handlePaste} />
            </li>
            <li >
              <input type="text" name="text-2" className="input1" maxLength={4} onChange={handleChange} />
            </li>
            <li >
              <input type="text" name="text-3" className="input1" maxLength={4} onChange={handleChange} />
            </li>
            <li >
              <input type="text" name="text-4" className="input1" maxLength={4} onChange={handleChange} />
            </li>
          </div>
          <li>&nbsp;</li>
          <li className="submit">
            <input
              type="submit"
              name="submit"

            />
          </li>

          <li>&nbsp;</li>
        </ul>
      </form>

      <ul>
        {
          cardList.map((ele, index) => {
            return <>
              <li>
                {ele}
              </li>
              <li onClick={() => handleDelete(index)}>delete</li>
            </>
          })
        }
      </ul>
    </div>
  );
}

export default App;
