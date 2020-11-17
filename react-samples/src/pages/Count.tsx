import React, { useState } from 'react';
import './../App.css';

function Count() {
  const [count, setCount] = useState(0);
  return (
    <div className='App'>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>Now, this count is {count}.</p>
    </div>
  );
}

export default Count;