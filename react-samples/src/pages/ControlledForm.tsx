import React, { useState } from 'react';

function ControlledForm() {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('coconut')
  const [checked, setChecked] = useState(false)

  const handleSubmit = () => {
    alert('input: ' + inputValue + ', select: ' + selectValue + ', checked?: ' + checked);
  }

  // const handleChecked = () => {
  //   return checked ? setChecked(!checked) : setChecked(checked)
  // }

  return (
    <div className='App'>
      <form onSubmit={() => handleSubmit()}>
        <label>
          Name:
          <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          Name: {inputValue}
        </label>
        <br></br>
        <label>
          Pick your favorite flovor:
          <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value='grape'>Grape</option>
            <option value='Lime'>Lime</option>
            <option value='coconut'>Coconut</option>
            <option value='mango'>Mango</option>
          </select>
          selected: {selectValue}
        </label>
        <br />
        <label>
          checked?:
          <input name='isGoing' type='checkbox' checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        </label>
        <input type='submit' value='submit' />
      </form>
    </div>
  )
}

export default ControlledForm;