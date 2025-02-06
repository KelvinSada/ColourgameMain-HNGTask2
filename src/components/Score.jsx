import React from "react";


function Score(prop){
  return <span className="score" data-testid="score">{prop.no}</span>
}

export default Score;