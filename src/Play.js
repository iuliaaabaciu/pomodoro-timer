const Play = ({ playme, isWorkActive }) => {

    return(
      <div>
       <button onClick = {playme}>{isWorkActive ? "Pause" : "Play"}</button>
      </div>
    )

}

export default Play;