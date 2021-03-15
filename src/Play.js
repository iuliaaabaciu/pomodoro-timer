import { render } from '@testing-library/react';

const Play = ({ playme, isActive }) => {

    return(
      <div> 
        <button onClick = {playme}>{isActive ? "Pause" : "Start"}</button>
      </div>
    )

}

export default Play;