import React, {Component} from 'react';

import Spider from "./Spider";
import Lines from "./Lines";
import Modal from "./Modal";
import LevelCounter from "./LevelCounter";
import checkIfSolved from '../utils/checkIfSolved';

import level1DataJSON from '../levels/level1.json';
import level2DataJSON from '../levels/level2.json';
import level3DataJSON from '../levels/level3.json';

class Spiders extends Component {
 
  constructor(props) {
    super(props);
  
    this.deltaX = undefined;  //delta between current position of cursor and center of a spider when dragging starts (X coordinate)
    this.deltaY = undefined;  //delta between current position of cursor and center of a spider when dragging starts (Y coordinate)
    this.state = {  
      spiders:null,           //collection of spiders. Initially null - these are loaded from JSON in componentDidMount()
      lines:null,             //collection of lines between spiders. Initially null - these are loaded from JSON in componentDidMount()
      linesCrossed: {},       //collection of lines crossed with other lines
      levelCompleted: false,  //set true if level completed - will trigger congratulations modal
      level: 0                //current level
    };
  }

  // loads spiders and lines from JSON file for the current level (level defined in state)
  loadLevelData(level) {
    
    let levelDataJSON = level3DataJSON;
    switch(level) {
      case 1: {
        levelDataJSON = level1DataJSON;
        break;
      }
      case 2: {
        levelDataJSON = level2DataJSON;
        break;
      }
      case 3: {
        levelDataJSON = level3DataJSON;
        break;
      }
    }

    const levelData = JSON.parse(JSON.stringify(levelDataJSON)); //parse from JSON to Object
    return levelData;
  }

  componentDidMount() {
    
    this.nextLevel();
    this.identifyCrossedLines();

  }
   
  identifyCrossedLines() {
    if( this.state.spiders !== null & this.state.lines !== null ) {
      const linesCrossed = checkIfSolved(this.state.spiders, this.state.lines);
      const levelCompleted = Object.keys(linesCrossed).length > 0 ? false : true;
      const newState = {
        ...this.state,
        linesCrossed: linesCrossed,
        levelCompleted: levelCompleted
      };

      this.setState( newState );
    };

  }

  spiderDragged(e, spiderId) {
    // updates spider's position accodring to current cursor's one. An adjustemen (deltaX and deltaY) are added do that a spider is placed considering position of a mose on the spider
    if (e.clientY !== 0 & e.clientX !== 0) {
      e.preventDefault();
      const newState = {
        ...this.state     
      }
      newState.spiders[spiderId] = {
        x:e.clientX+this.deltaX, 
        y:e.clientY+this.deltaY
      }
      this.setState( newState );
    }
   
    this.identifyCrossedLines();
  
  }

  setDeltas(e, spiderId) {
    // this is called when dragging starts. The aim is to record position of the cursor on a spider so that it can be later on used to properly place the spider whe dragging ends 
    this.deltaX = this.state.spiders[spiderId].x - e.clientX;
    this.deltaY = this.state.spiders[spiderId].y - e.clientY;
  }
  
  nextLevel() {
    //triggers loading data for the next level and closes the modal with congratulations  
    const nextLevel = this.state.level + 1;
    const levelData = this.loadLevelData(nextLevel);
    
    const newState = {
      ...this.state,
      spiders: levelData.spiders,
      lines: levelData.lines,
      linesCrossed: {},
      level: nextLevel,
      levelCompleted: false
    }
    this.setState(newState);
  }

  render() {
    
    let spiders = <div>loading spiders...</div>
    if (this.state.spiders) { //first check if spiders have been loaded from the external JSON file
      spiders = (
        <div>
          {Object
            .keys(this.state.spiders)
            .map( spiderId => 

              <Spider 
                key={spiderId} 
                id={spiderId}
                x={this.state.spiders[spiderId].x} 
                y={this.state.spiders[spiderId].y}
                onDrag={e => this.spiderDragged(e, spiderId)}
                onMouseDown={e => this.setDeltas(e, spiderId)} 
              />
              
          )}
        </div>
      )
    }

    let lines = <div></div>
    if (this.state.lines) { //first check if lines have been loaded from external JSON file
      lines =  <Lines state={this.state} />
    }

    return (
      <div>
        {/* this is the modal which appears when a level is completed */}
        <Modal 
            show={this.state.levelCompleted}
            modalClosed={this.nextLevel.bind(this)}>
            <div>
              <h3>Gratulacje!</h3>
              <br/>
              <p>jesteś niezły w rozplątywaniu pajęczyny!</p>
              <p>teraz będzie trudniej...</p>
            </div>       
        </Modal>

        <LevelCounter level={this.state.level}/>
        
        {/* draw spiders based on their collection in the state */}
        { spiders }
            
        {/* draw lines between spiders */}
        {lines}
  
      </div>
    )
  }
}

export default Spiders;