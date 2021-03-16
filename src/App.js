import { render } from '@testing-library/react';
import React, { useState, useEffect, useRef } from 'react';
import SetDuration from './SetDuration';
import Play from './Play';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(25*60);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    if (timer == 0) {
      clearInterval(countRef.current)
      setIsActive(false);
    }
  }, [timer, minutes])

  const increment = () => setTimer(timer + 60);
  const decrement = () => setTimer(timer - 60);

  const startTimer = () => {
    if (isActive) {
      clearInterval(countRef.current);
      setIsActive(false)
    }
    else if (minutes + seconds > 0) {
      setIsActive(true)
      // refs exist outside render cycle
      countRef.current = setInterval(() => {
        setTimer((timer) => timer - 1) // stale closure if callback function was not used
      }, 1000)
    }
  }
  
  const formatTime = () => {
    let min = Math.floor(timer / 60);
    let sec = timer % 60;
    return { min, sec }
  }

  let { min, sec } = formatTime();

  const stopTimer = () => {
    clearInterval(countRef.current);
    setIsActive(false);
  }
 
  return (
    <div>
      <p>{min} : {sec}</p>
      <SetDuration increment={increment} decrement={decrement}/> 
      <Play playme={startTimer} isActive={isActive} />
    </div>
  );
}

export default App;