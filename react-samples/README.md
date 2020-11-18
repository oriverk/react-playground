# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## this repository contents
is below
- react routing(whole page)
  - yarn add react-router-dom
  - reference is https://github.com/ReactTraining/react-router
- count+- with useState
- controlled form
  - this is usuall and normal form for react
- uncontrolled form
  - reference is https://blog.ojisan.io/react-form-control
- useDebounce and useThrottle
  - yarn add use-debounce
    - reference is https://github.com/xnimorz/use-debounce
  - yarn add use-throttle
    - reference is https://github.com/bhaskarGyan/use-throttle

### count
```jsx
function Count() {
  const [count, setCount] = useState(0);
  return (
    <div className='App'>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <p>Now, this count is {count}</p>
    </div>
  );
}
```

### uncontrolled form
```jsx
function UncontrolledForm() {
  const [state, setState] = useState({})
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
```

### use debounce
```jsx
import React from 'react'

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
```

### use throttle
```jsx
import React from 'react'

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
```
