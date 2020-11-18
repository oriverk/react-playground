import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
// @ts-ignore
import { useThrottle } from 'use-throttle';

function UseDebounceThrottle() {
  return (
    <div className='App'>
      <div className='debounce'>
        <Debounce />
      </div>
      <br />
      <div className='throttle'>
        <Throttle />
      </div>
    </div>
  )
}

export default UseDebounceThrottle;

function Debounce() {
  const [text, setText] = useState('Hello');
  const [value] = useDebounce(text, 1000);

  return (
    <div>
      <input
        defaultValue={'Hello'}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <p>Actual value: {text}</p>
      <p>Debounce value: {value}</p>
    </div>
  );
}

function Throttle() {
  const [text, setText] = useState('Hello');
  const throttledText = useThrottle(text, 1000);

  return (
    <div>
      <input
        defaultValue={'Hello'}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <p>Actual value: {text}</p>
      <p>Throttle value: {throttledText}</p>
    </div>
  );
}
