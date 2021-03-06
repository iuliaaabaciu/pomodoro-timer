import React, { useState, useEffect, useRef } from 'react';
import SetDuration from './SetDuration';
import Play from './Play';
import Reset from './Reset';
import './App.css';

const audio = new Audio('https://ccrma.stanford.edu/~jos/mp3/JazzTrio.mp3');

function App() {
  const [minutes] = useState(25);
  const [seconds] = useState(0);
  const [work, setWork] = useState(25*60);
  const [pause, setPause] = useState(1*10);
  const [timer, setTimer] = useState(25*60);
  const [isWorkActive, setIsWorkActive] = useState(false);
  const [isPauseActive, setIsPauseActive] = useState(false);
  const countRef = useRef(null);

  // if timer < 0, timer stops. useEffect tracks timer changes
  useEffect(() => {
    // when work time ends, start pause countdown
      if (timer === 0 && isWorkActive === true) {
        audio.play();
        clearInterval(countRef.current)
        setIsWorkActive(false);
        setIsPauseActive(true);
       // setWork(work);
        startPauseCountdown();
      }
      // when pause time ends, start work countdown
      if (timer === 0 && isPauseActive === true) {
        audio.play();
        clearInterval(countRef.current);
        setIsPauseActive(false);
        setIsWorkActive(true);
        setTimer(work);
        startTimer();
      }
  }, [timer])

  // max increment value is 4h and 1 min
  const increment = () => {
   // setTimer(work);
    if (work <= 14400) {
      setWork(work + 60);
      setTimer(timer + 60);
    } else {
      console.error('Unexpected error in increment');
    }
  };
  
  const decrement = () => {
    if (work > 60) {
      setWork(work - 60);
      setTimer(timer - 60);
    } else {
      console.error('Unexpected error in decrement');
    }
  }
console.log(work)
  const incrementPause = () => {
    if (pause <= 14400) {
      setPause(pause + 60)
    } else {
      console.error('Unexpected error in increment');
    }
  };
  
  const decrementPause = () => {
    if (pause > 60) {
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
    else if (work > 0) {
      setIsWorkActive(true);
      // refs exist outside render cycle
      countRef.current = setInterval(() => {
        setTimer((work) => work - 1) // stale closure if callback function was not used
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
          setTimer((pause) => pause - 1) // stale closure if callback function was not used
      }, 1000)
  }
  
  const formatTime = () => {
    let min = Math.floor(work / 60);
    let sec = work % 60;
    let pauseMin = Math.floor(pause / 60);
    let pauseSec = pause % 60;

    let timerMin = Math.floor(timer /60);
    let timerSec = timer % 60;
    return { min, sec, pauseMin, pauseSec, timerMin, timerSec }
  }

  let { min, sec, pauseMin, pauseSec, timerMin, timerSec } = formatTime();

  const resetWork = () => {
    if (isWorkActive) {
      clearInterval(countRef.current);
      setIsWorkActive(false);
      setTimer(25*60);
      setWork(25*60);
    } else if (!isWorkActive) {
      setWork(25*60);
    }
  }

  const resetPause = () => {
    if (isPauseActive) {
      clearInterval(countRef.current);
      setIsPauseActive(false);
      setTimer(25*60);
      setPause(5*60);
    } else if (!isPauseActive) {
      setPause(5*60);
    }
  }  
  
  return (
    <div className="center flex">
    <div><p className="duration">Timer: {timerMin} : {timerSec}</p></div>
    <br></br>
    <div><p className="duration">Work: {min} : {sec}</p></div>
    <div><p className="duration">Pause: {pauseMin} : {pauseSec}</p></div>
    <Reset resetPause={resetPause} />
      <SetDuration increment={increment} decrement={decrement} incrementPause={incrementPause} decrementPause={decrementPause}/>
      <Play playme={startTimer} isWorkActive={isWorkActive} /> 
      <Reset resetWork={resetWork} />
      <button onClick={resetWork}>RW</button>
    </div>
  );
}

export default App;