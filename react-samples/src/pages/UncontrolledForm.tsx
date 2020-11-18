import React, { useState } from 'react';

function UncontrolledForm() {
  const [state, setState] = useState({})
  // @ts-ignore
  const handeSubmit = e => {
    e.preventDefault()
    setState({ ...state, second: e.target["second"].value })
    alert(JSON.stringify(state))
  }
  return (
    <div>
      <form onSubmit={handeSubmit}>
        <label htmlFor="second">second</label>
        <input name="second" id="second"></input>
        <button type="submit">submit</button>
      </form>
      {JSON.stringify(state)}
    </div>
  )
}

export default UncontrolledForm