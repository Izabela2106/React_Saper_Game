import React, { useState, useContext, useEffect,useReducer} from 'react'
import { useCallback } from 'react'
import reducer from './reducer'


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    
    
    const initialState={
        width:0,
        height:0,
        mines:0,
        minesArray:[],
        fieldArray:[],
        flagsToPlace:10,
        cellsToReveal:0,
        startCellsToReveal:0,
        gameActive:false,
        timer:0,
        interval:null,
        isModalActive:false,
        cellSize:10
        
        
    }
    
    const [state,dispatch]=useReducer(reducer,initialState);
    
    const newGame=()=>{
    


    }

    const difficultyButton=(e)=>{
      dispatch({type:"HANDLE_DIFFICULTY_BUTTON",payload:e.target})
      dispatch({type:'GENERATE_CELLS'});
      dispatch({type:'PLACE_MINES'})
      dispatch({type:'PLACE_NUMBERS'})
      
     
       
    }
    
    

    const revealCell=(e)=>{
      dispatch({type:"HANDLE_CLICK",payload:e})
    }
    
   

    

  return <AppContext.Provider value={{...state,revealCell,newGame,difficultyButton}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }