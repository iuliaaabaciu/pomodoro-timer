import { render } from '@testing-library/react';
import React, { useState, useEffect, useRef } from 'react';
import SetDuration from './SetDuration';
import Play from './Play';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);
  const ms = minutes * 60000;
  var countdown;

  useEffect(() => {
    console.log(minutes+seconds)
    if(minutes+seconds <= 0) {
      clearInterval(countRef.current)
      setIsActive(false);
    }
  })

  const increment = () => setMinutes(minutes + 1);
  const decrement = () => setMinutes(minutes - 1);

  const calculateTimeLeft = () => {
    let now = new Date().getTime();
    let milisec = countdown - now;
    let timeLeft = {
      min: Math.floor((milisec % (1000 * 60 * 60)) / (1000 * 60)),
      sec: Math.floor((milisec % (1000 * 60)) / 1000)
    }
    return timeLeft;
  }

  const startTimer = () => {
    console.log(minutes, seconds)
    if (minutes + seconds > 0) {
      setIsActive(true)
      countdown = new Date(new Date().getTime() + ms);
      // refs exist outside render cycle
      countRef.current = setInterval(() => {
        let { min, sec } = calculateTimeLeft();
        // stale closure if callback function was not used
        setMinutes(() => min);
        setSeconds(() => sec);
      }, 1000)
      } else {
        clearInterval(countRef.current);
        setIsActive(false)
      }
  }

  return (
    <div>
      <p>{minutes} : {seconds}</p>
      <SetDuration increment={increment} decrement={decrement}/>
      <Play playme={startTimer} isActive={isActive}/>
    </div>
  );
}

export default App;