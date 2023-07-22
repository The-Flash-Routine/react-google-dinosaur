import { useEffect, useState } from "react";
import RunTrackBlock from "./RunTrackBlock";

// Learnt a very important thing here..
// https://eight-bites.blog/en/2021/05/setinterval-setstate/
// https://stackoverflow.com/questions/53024496/state-not-updating-when-using-react-state-hook-within-setinterval
// Basically the setInterval was only using the initial state values..
// answer is two forms of setState function

// Learnt another important thing for using clearInterval in useEffect Hook
// https://www.codementor.io/@damianpereira/how-to-use-clearinterval-inside-react-s-useeffect-and-why-it-is-important-1si7mztjlk

function RunTrack() {

  const [runTrackBlocks,setRunTrackBlocks] = useState([])
  const moveRate = 10
  const moveIncrement = 5
  

  const getAddOrRemoveRate = (vMoveRate, vMoveIncrement, blockWidth) => {
    // movementPerSec = (moveIncrement/(moveRate/1000))
    // timeForCompleteMove = (width/movementPerSec)
    // addorRemoveRate = timeForCompleteMove * 1000
    let movementPerSec = vMoveIncrement/(vMoveRate/1000)
    let timeForCompleteMove = (blockWidth/movementPerSec)
    let addorRemoveRate = timeForCompleteMove * 1000
    return addorRemoveRate
  }

  const addRate = getAddOrRemoveRate(moveRate, moveIncrement, 50)
  const removeRate = getAddOrRemoveRate(moveRate, moveIncrement, 50)
  const possibleHeights = [50, 50, 50, 50, 100]

  const getBlockElement = (ld, randomColor, height) => {
    return(
      <RunTrackBlock leftDistance={ld} colory={randomColor} heighty={height}/>
    )
  }

  const initializeBlocks = () => {
    let iB = []
    for( let i=0; i<30; ++i ){
      let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      iB.push({"distance":(i*50), "color": randomColor, "height": 50})
    }
    setRunTrackBlocks(iB)
  }

  const moveBlocks = () => {
    return setInterval(()=>{
      setRunTrackBlocks(currentState => {
        let newState = currentState.map(element =>{
          return {"distance": (element["distance"] - moveIncrement), "color": element["color"], "height": element["height"]}
        })
        return newState
      })
    },moveRate)
    
  }

  const removeBlocks = () => {
    
    return setInterval(()=>{

      setRunTrackBlocks(currentState => {
        let newState = currentState.filter(element =>{
          return element["distance"] < -50 ? false : true
        })
        return newState
      })
    },removeRate)
  }

  const addBlocks = () => {
    return setInterval(()=>{
      let els = document.getElementsByClassName("RunTrackBlock")
      let lastElement = els[els.length - 1]
      let newElementPosition = parseInt(lastElement.style.left) + 50
      let newElementColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      let newElementHeight = possibleHeights[Math.floor(Math.random()*possibleHeights.length)]
      setRunTrackBlocks(currentState => {
        let addBigBlock = true
        for( let i = currentState.length-8 ; i<currentState.length; ++i){
          if(currentState[i]["height"] > 50){
            addBigBlock = false
            break
          }
        }
        if(addBigBlock){
          currentState.push({"distance": newElementPosition, "color": newElementColor, "height": newElementHeight })
        }else{
          currentState.push({"distance": newElementPosition, "color": newElementColor, "height": 50 })
        } 
        
        return(currentState)
      })
    },addRate)
  }

  useEffect(() => {
    initializeBlocks()
    let intervalMoveBlocks = moveBlocks()
    let intervalRemoveBlocks =removeBlocks()
    let intervalAddBlocks =addBlocks()

    return () => {
      clearInterval(intervalMoveBlocks)
      clearInterval(intervalRemoveBlocks)
      clearInterval(intervalAddBlocks)
    }
  },[])

  
  return (
    <div className="RunTrack" id="RunTrack">
      {runTrackBlocks.map(element =>  getBlockElement(element["distance"],element["color"], element["height"]))}
    </div>
  );
}

export default RunTrack;
