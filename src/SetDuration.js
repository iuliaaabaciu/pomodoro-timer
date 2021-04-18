import React, { useState } from 'react';
import './App.css';

const SetDuration = ({ increment, decrement, workMin, incrementPause, decrementPause, pauseMin }) => {
    return(
      <div className="duration">
        <button onClick = {increment}>+</button>
        {workMin}
        <button onClick = {decrement}>-</button>
        <br></br>
        <button onClick = {incrementPause}>+</button>
        {pauseMin}
        <button onClick = {decrementPause}>-</button>
      </div>
    )
}

export default SetDuration;