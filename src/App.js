import './App.css';
import RunTrack from './RunTrack';
import Character from './Character';
import Reload from './Reload';
import { useEffect, useState } from 'react';

function App() {

  const [ gameLost, setGameLost ] = useState(false)
  const characterWidth = 50 //px
  const characterStart = 300 //px

  const detectCollision = () => {
    
    let character = document.getElementById("Character")
    let blocks = document.getElementsByClassName("RunTrackBlock")

    Array.from(blocks).forEach(element => {
      // We should filter first VERTICALLY, but we should filter first HORIZONTALLY
      // Because remember our character is stationaly HORIZONTALLY, while jumping and running blocks.. it just give illusion
      // that it is moving HORIZONTALLY
      // Also if we do VERTICALLY first then we have to run both condition on all blocks..

      let boxStart = parseInt(element.style.left)

      if( boxStart > (characterStart-characterWidth) && boxStart < (characterStart+characterWidth) ){
        //This means they are partially collided in HORIZONTAL sense
        // Now detecting is they are in VERTICAL collision as well
        
        let boxHeight = parseInt(element.style.height)
        let characterFoot = parseInt(character.style.bottom)

        if(characterFoot < boxHeight){
            console.log("Collision Detected")
            setGameLost( currentState => true)
        }
      }

    });
  }

  useEffect(()=>{

    setInterval(()=>{
      detectCollision()
    },10)
    
  },[])

  return (
    <div className="App">
        {
          gameLost == false ? 
              <div className="AppContainer"><Character/> <RunTrack/></div> 
              : 
              <div className="AppContainer"><Reload/></div>
        }
    </div>
  );
}

export default App;
