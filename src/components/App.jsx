import React, {useState} from "react";
import Score from "./Score";
import "./styles.css";

function App() {
const sixRandomColors = [];
const [,setUserPass] = useState();
const [colorSelected,setColorSelected] = useState(false)   //toggle the animation class
const [wins,setwins] = useState(0);
const [displayMessage,setDisplayMessage] = useState("");
const [,setRestart] = useState(false)
const [shake, setShake] = useState(false);

function getSixColors(){
  for (var i=0;i<6;i++){
    sixRandomColors[i] = [Math.floor((Math.random()*256)),Math.floor((Math.random()*256)),Math.floor((Math.random()*256))]
  }
}
getSixColors();

let showColor = sixRandomColors[Math.floor(Math.random()*6)]    //Creating the Random colour
const showColorIndex = sixRandomColors.indexOf(showColor)
const displayColor =`rgb(${showColor[0]},${showColor[1]},${showColor[2]})`


function correctGuess (){
  setUserPass(true)
  setTimeout(() => setUserPass(), 500);
  setwins(prev=>{
    return prev+1;
  })
  setDisplayMessage("Correct pick 🏆")
  setTimeout(() => setDisplayMessage(""), 500);
  setShake(true);
}

function wrongGuess(){
    setUserPass(false)
    setwins(prev=>{
      return prev;
    })
    setDisplayMessage("Wrong, Keep going")
    setTimeout(() => setDisplayMessage(""), 500);
    setShake(false);
}

function getIndexValue(id){
  setColorSelected(true); 
  setTimeout(()=>setColorSelected(false),500);

  id===showColorIndex?correctGuess():wrongGuess();
    
  setTimeout(() => setShake(false), 500);
}

  function restartAction(){
    setRestart(true)
    setwins(0)
    setUserPass(false)
    setDisplayMessage("")
  }

  return (
    <main>
      <header data-testid="gameInstructions" className="header">GUESS THE <span className="color-title">COLOR</span></header>
      
      <div className="scoreSection">
        <div class="scoree">Score: <Score no={wins}/></div>
        <button onClick={restartAction} data-testid="newGameButton" >Reset</button>
      </div>
      
      <div>
        <div style={{backgroundColor:displayColor}} className="colorBox" data-testid="colorBox">
        </div>
      </div>
      
      <div className={colorSelected && shake ? "shake" :
      colorSelected && !shake? "loss":
      null} data-testid="gameStatus">
        <p className="status">{displayMessage}</p>
      </div>
      
      <div className="colorOptionsContainer">
        {sixRandomColors.map((x,index)=>(
          <div 
          onClick={()=>getIndexValue(index)}
          className="colorPicks"
          key={index}
          id={index}
          style={{backgroundColor:`rgb(${x[0]},${x[1]},${x[2]})`}}>
          </div>
        ))}
      </div>

    </main>
  );
}
export default App;
