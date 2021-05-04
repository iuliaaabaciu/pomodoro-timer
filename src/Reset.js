const Reset = ({ resetWork, resetPause }) => {

  if (resetWork) {
    return <button onClick={resetWork}>RW</button>
  } else if (resetPause) {
    return <button onClick = {resetPause}>Reset Pause</button>
  }
}

export default Reset;