import React, { useEffect, useRef, useState } from 'react'
import './mouse.css';

function useDebounce(value, timeout) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);
    return () => clearTimeout(handler);
  }, [value, timeout]);

  return state;
};

const Mouse = () => {
  const [quadrant, setQuadrant] = useState('');

  const [mouse, setMouse] = useState([0, 0]);
  const delay = 500; // millisecondes
  const debouncedMouse = useDebounce(mouse, delay);

  const boxRef = useRef(null);

  let rect;
  let boxCenter = { x: 0, y: 0 };

  useEffect(() => {
    // eslint-disable-next-line
    rect = boxRef?.current?.getBoundingClientRect();
    // eslint-disable-next-line
    boxCenter = {
      x: rect?.left + (rect?.right - rect?.left) / 2,
      y: rect?.top + (rect?.bottom - rect?.top) / 2
    };
  }, [boxRef.current, boxCenter]);

  useEffect(() => {
    const [mouseX_G, mouseY_G] = debouncedMouse;
    const mouseX_L =
      (mouseX_G - boxCenter.x) / ((rect?.right - rect?.left) / 2);
    const mouseY_L =
      (-1 * (mouseY_G - boxCenter.y)) / ((rect?.bottom - rect?.top) / 2);

    if (mouseX_L > 0 && mouseY_L > 0) setQuadrant("1st");
    else if (mouseX_L < 0 && mouseY_L > 0) setQuadrant("2nd");
    else if (mouseX_L < 0 && mouseY_L < 0) setQuadrant("3rd");
    else if (mouseX_L > 0 && mouseY_L < 0) setQuadrant("4th");
    else setQuadrant("");
    // eslint-disable-next-line
  }, [...debouncedMouse]);

  const handleMouseMove = e => {
    setMouse([e.clientX, e.clientY]);
  };

  return (
    <div>
      <div
        onMouseMove={e => handleMouseMove(e)}
        style={{}}
        ref={boxRef}
        id="mouse_example"
      >
        {quadrant} quadrant
      </div>
      <div id="delay">Delay - {delay} milliseconds</div>
    </div>
  );
}

export default Mouse;
