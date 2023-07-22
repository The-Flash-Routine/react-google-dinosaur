import { useEffect } from "react";
import DinosaurIcon from './dragon.png'
// Very interesting reason for this hook creation
// I was in exact same issue
// Read about issue: https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
// Read about issue: https://stackoverflow.com/questions/55265255/react-usestate-hook-event-handler-using-initial-state
import useReferredState from "./CustomReferredHook";


function Character() {

  const initialCharacterPosition = 50

  const changeTick = 15
  const increaseOrDecreaseBy = 5

  const [characterPosition, setCharacterPosition] = useReferredState(initialCharacterPosition)

  const handleJump = (event) => {
    var key = event.key;
    let rise = true
    if (key === " "){
      console.log( "Spacebar pressed" )
      
      let change = setInterval( () => {

        if( rise ){
          let newPosition = characterPosition.current + increaseOrDecreaseBy
          if(newPosition > 225){
            rise = false
          }else{
            setCharacterPosition(newPosition)
          }
          
          
        } else {
          let newPosition = characterPosition.current - increaseOrDecreaseBy
          if(newPosition < initialCharacterPosition){
            clearInterval(change)
          }else{
            setCharacterPosition(newPosition)
          }
        }
      },changeTick)
      
    }
    
  }

  useEffect( () => {
      document.getElementById("Character").style.bottom = characterPosition.current + "px"
    }, 
    [characterPosition.current]
  )

  useEffect( () => {
      document.addEventListener('keydown', handleJump)
    }, 
    []
  )

  ;

  return (
    <div id="Character" className="Character">
      <img src={DinosaurIcon}/>
    </div>
  );
}

export default Character;
