const Play = ({ playme, isActive }) => {

    return(
      <div>
       <button onClick = {playme}>{isActive ? "Pause" : "Play"}</button>
      </div>
    )

}

export default Play;