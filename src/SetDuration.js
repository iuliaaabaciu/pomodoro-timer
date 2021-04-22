import React, { useState } from 'react';
import './App.css';

const SetDuration = ({ increment, decrement, workMin, incrementPause, decrementPause, pauseMin }) => {
    return(
      <div className="item">
        <button onClick = {increment}>+</button>
        {workMin}
        <button onClick = {decrement}>-</button>
        <p></p>
        <button onClick = {incrementPause}>+</button>
        {pauseMin}
        <button onClick = {decrementPause}>-</button>
      </div>
    )
}

export default SetDuration;