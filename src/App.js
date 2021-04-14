import { render } from '@testing-library/react';
import React, { useState, useEffect, useRef } from 'react';
import SetDuration from './SetDuration';
import Play from './Play';
import Reset from './Reset';
import './App.css';

const audio = new Audio('https://ccrma.stanford.edu/~jos/mp3/JazzTrio.mp3');

function App() {
  const [minutes] = useState(25);
  const [seconds] = useState(0);
  const [timer, setTimer] = useState(25*60);
  const [isActive, setIsActive] = useState(false);
  const [pause, setPause] = useState(5*60);
  const countRef = useRef(null);

  // if timer < 0, timer stops. useEffcet tracks timer changes
  useEffect(() => {
    if (timer == 0) {
      audio.play();
      clearInterval(countRef.current)
      setIsActive(false);
      startPauseCountdown();
    }
  }, [timer, minutes])

  // max increment value is 4h and 1 min
  const increment = () => {
    if (timer <= 14400) {
      setTimer(timer + 60)
    } else {
      console.error('Unexpected error in increment');
    }
  };
  
  const decrement = () => {
    if (timer > 0) {
      setTimer(timer - 60);
    } else {
      console.error('Unexpected error in decrement');
    }
  }

  const startTimer = () => {
    // if timer is active,pause
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

  const startPauseCountdown = () => {
      setTimer(5*60);
      setIsActive(true)
      countRef.current = setInterval(() => {
        setTimer((timer) => timer - 1) // stale closure if callback function was not used
      }, 1000)      

  }
  
  const formatTime = () => {
    let min = Math.floor(timer / 60);
    let sec = timer % 60;
    return { min, sec }
  }

  let { min, sec } = formatTime();

  const reset = () => {
    if (isActive) {
      clearInterval(countRef.current);
      setIsActive(false)
    }
    setTimer(25*60)
  }
  
  return (
    <div>
      <p>{min} : {sec}</p>
      <SetDuration increment={increment} decrement={decrement}/> 
      <Play playme={startTimer} isActive={isActive} />
      <Reset reset={reset} />
      <button onClick={() => startPauseCountdown()}>Sound</button>
    </div>
  );
}

export default App;