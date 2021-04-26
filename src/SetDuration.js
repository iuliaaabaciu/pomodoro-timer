import React, { useState } from 'react';
import './App.css';

const SetDuration = ({ increment, decrement, incrementPause, decrementPause }) => {
    return(
      <div className="item">
        <button onClick = {increment}>+</button>
        <button onClick = {decrement}>-</button>
        <p></p>
        <button onClick = {incrementPause}>+</button>
        <button onClick = {decrementPause}>-</button>
      </div>
    )
}

export default SetDuration;