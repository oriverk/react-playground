import React, { useState, useEffect } from 'react';

function EffectSample() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `U clicked ${count} times.`
  })

  return (
    <div className='App'>
      <p>you clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

export default EffectSample;