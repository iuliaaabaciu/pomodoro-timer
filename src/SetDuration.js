import { render } from '@testing-library/react';
import React, { useState } from 'react';

const SetDuration = ({ increment, decrement }) => {

    return(
      <div>
        <button onClick = {increment}>+</button>
        <button onClick = {decrement}>-</button>
      </div>
    )

}

export default SetDuration;