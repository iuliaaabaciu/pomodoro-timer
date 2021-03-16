
const Play = ({ playme, isActive, stopme }) => {

    return(
      <div>

      <button onClick = {playme}>{isActive ? "Pause" : "Play"}</button>
      </div>
    )

}

export default Play;