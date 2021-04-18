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
  const [work, setWork] = useState(25*60);
  const [isWorkActive, setIsWorkActive] = useState(false);
  const [isPauseActive, setIsPauseActive] = useState(false);
  const [pause, setPause] = useState(5*60);
  const countRef = useRef(null);

  // if timer < 0, timer stops. useEffcet tracks timer changes
  useEffect(() => {
      if (work == 0) {
        audio.play();
        clearInterval(countRef.current)
        setIsWorkActive(false);
        startPauseCountdown();
      }
  }, [work])

  // max increment value is 4h and 1 min
  const increment = () => {
    if (work <= 14400) {
      setWork(work + 60)
    } else {
      console.error('Unexpected error in increment');
    }
  };
  
  const decrement = () => {
    if (work > 0) {
      setWork(work - 60);
    } else {
      console.error('Unexpected error in decrement');
    }
  }

  const incrementPause = () => {
    if (pause <= 14400) {
      setPause(pause + 60)
    } else {
      console.error('Unexpected error in increment');
    }
  };
  
  const decrementPause = () => {
    if (pause > 0) {
      setPause(pause - 60);
    } else {
      console.error('Unexpected error in decrement');
    }
  }

  const startTimer = () => {
    // if timer is active, pause
    if (isWorkActive) {
      clearInterval(countRef.current);
      setIsWorkActive(false);
    }
    else if (minutes + seconds > 0) {
      setIsWorkActive(true);
      // refs exist outside render cycle
      countRef.current = setInterval(() => {
        setWork((work) => work - 1) // stale closure if callback function was not used
      }, 1000)
    }
  }

  const startPauseCountdown = () => {
      setTimer(pause);
      if (isPauseActive) {
        clearInterval(countRef.current);
        setIsPauseActive(false);        
      } else if (pause > 0)
        setIsPauseActive(true);
        countRef.current = setInterval(() => {
          setTimer((timer) => timer - 1) // stale closure if callback function was not used
      }, 1000)
  }
  
  const formatTime = () => {
    let min = Math.floor(work / 60);
    let sec = work % 60;
    let pauseMin = Math.floor(pause / 60);
    let workMin = Math.floor(work / 60);
    return { min, sec, pauseMin, workMin }
  }

  let { min, sec, pauseMin, workMin } = formatTime();

  const reset = () => {
    if (isWorkActive) {
      clearInterval(countRef.current);
      setIsWorkActive(false)
    }
    setTimer(25*60)
  }
  
  return (
    <div className="center">
      <p>{min} : {sec}</p>
      <SetDuration increment={increment} decrement={decrement} workMin={workMin} incrementPause={incrementPause} decrementPause={decrementPause} pauseMin={pauseMin}/>
      <Play playme={startTimer} isWorkActive={isWorkActive} />
      <Reset reset={reset} />
      <button onClick={() => startPauseCountdown()}>Sound</button>
    </div>
  );
}

export default App;