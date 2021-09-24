import React from 'react'
import styled from 'styled-components'
import bomb from "../../assets/bomb.svg"
import {useGlobalContext} from '../../context.js'


const Cell=({value,state,row,column,bomb,flag,size})=>{
    const {revealCell}=useGlobalContext();

    let classes=['cell'];
    let cellValue=null;
    if(flag){
        classes.push('flag')
    }
  if(state===2){
      classes.push('revealed')
      if(bomb){
          classes.push('bomb')
      }
      else if(value===0){
          cellValue=''
      }
      else{
          cellValue=value;
              classes.push(`cell-${value}`);
          
      }
      
  }
    classes=classes.join(' ')
    
    
    return <Wrapper size={size}>
        <button className={classes}  state={state} value={cellValue} row={row} column={column} onMouseDown={revealCell} onContextMenu={(e)=> e.preventDefault()}>
            
          {cellValue}
            
            </button>
        
        </Wrapper>
}

const Wrapper=styled.div`
.cell{
height:${props=>props.size}px;
width:${props=>props.size}px;
border-width:${props=>props.size*0.1}px;
cursor:pointer;
background-color:var(--primary-color);
background-position: center;
background-repeat: no-repeat;
background-size:${props=>props.size*0.8}px;;
display: flex;
justify-content: center;
align-items: center;
border-color: #fff var(--primary-color-dark) var(--primary-color-dark) #fff;



}
.revealed{
    border-color:var(--primary-color-dark) #fff #fff var(--primary-color-dark);

}

.cell.bomb{
    background-color:var(--alarm-color);
}

`


export default Cell