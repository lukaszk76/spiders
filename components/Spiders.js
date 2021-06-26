import React, {Component} from 'react';

import Spider from "./Spider";
import Lines from "./Lines";
import Modal from "./Modal";
import StopWatch from './StopWatch';
import checkIfSolved from '../utils/checkIfSolved';

//import of level data (spiders and lines between)
import level1DataJSON from '../levels/level1.json';
import level2DataJSON from '../levels/level2.json';
import level3DataJSON from '../levels/level3.json';
import level4DataJSON from '../levels/level4.json';
import level5DataJSON from '../levels/level5.json';
import level6DataJSON from '../levels/level6.json';

class Spiders extends Component {
 
  constructor(props) {
    super(props);
    
    this.deltaX = undefined;  //delta between current position of cursor and center of a spider when dragging starts (X coordinate)
    this.deltaY = undefined;  //delta between current position of cursor and center of a spider when dragging starts (Y coordinate)
    this.size = 100;          //size of a spider
    this.state = {  
      spiders:null,           //collection of spiders. Initially null - these are loaded from JSON in componentDidMount()
      lines:null,             //collection of lines between spiders. Initially null - these are loaded from JSON in componentDidMount()
      linesCrossed: {},       //collection of lines crossed with other lines
      levelCompleted: false,  //set true if level completed - will trigger congratulations modal
      level: 0,               //current level
      stoperActive: false,    //triggers the stopwatch
      time: 0                 //initial time for the stopwatch
    };
  }

  // loads spiders and lines from JSON file for the current level (level defined in state)
  loadLevelData(level) {
    
    let levelDataJSON = level6DataJSON;
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
      case 4: {
        levelDataJSON = level4DataJSON;
        break;
      }
      case 5: {
        levelDataJSON = level5DataJSON;
        break;
      }
      case 6: {
        levelDataJSON = level6DataJSON;
        break;
      }
    }

    const levelData = JSON.parse(JSON.stringify(levelDataJSON)); //parse from JSON to Object
    return levelData;
  }

  componentDidMount() {
    this.nextLevel();             //triggers loading data for the first level
    this.identifyCrossedLines();  //mark lines which a crossed
  }
   
  // identifies which lines are crossed and if initiates actions releted to completion of the level
  identifyCrossedLines() {
    if( this.state.spiders !== null & this.state.lines !== null ) {                 
      const linesCrossed = checkIfSolved(this.state.spiders, this.state.lines);     //build collection of crossed lines
      const levelCompleted = Object.keys(linesCrossed).length > 0 ? false : true;   //if no lines crossed were detected this means that the level is completed
      const newState = {
        ...this.state,
        linesCrossed: linesCrossed,
        levelCompleted: levelCompleted,
        stoperActive: !levelCompleted,
      };

      this.setState( newState );
      
    };
  }

  // updates spider's position accodring to current cursor's one. An adjustemen (deltaX and deltaY) are added do that a spider is placed considering position of a mose on the spider
  spiderDragged(e, spiderId) {
    
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

  // this is called when dragging starts. The aim is to record position of the cursor on a spider so that it can be later on used to properly place the spider whe dragging ends
  setDeltas(e, spiderId) {
    this.deltaX = this.state.spiders[spiderId].x - e.clientX;
    this.deltaY = this.state.spiders[spiderId].y - e.clientY;
  }
  
  // triggers loading data for the next level and closes the modal with congratulations
  nextLevel() {
    const nextLevel = this.state.level + 1;
    const levelData = this.loadLevelData(nextLevel);    //load data for the next level 
    
    const newState = {
      ...this.state,
      spiders: levelData.spiders,
      lines: levelData.lines,
      linesCrossed: {},
      level: nextLevel,
      levelCompleted: false,
      stoperActive: true
    }
    this.setState(newState);
  }

  render() {
    
    let spiders = <div>loading spiders...</div>
    if (this.state.spiders) {                   //first check if spiders have been loaded from the external JSON file
      spiders = (
        <div>
          {Object
            .keys(this.state.spiders)
            .map( spiderId =>                   // draw a spider for each one defined in the loaded data

              <Spider 
                key={spiderId} 
                id={spiderId}
                x={this.state.spiders[spiderId].x} 
                y={this.state.spiders[spiderId].y}
                onDrag={e => this.spiderDragged(e, spiderId)}
                onDragStart={e => this.setDeltas(e, spiderId)}
                size={this.size} 
              />
              
          )}
        </div>
      )
    }

    let lines = <div></div>
    if (this.state.lines) {                     // first check if lines have been loaded from external JSON file
      lines =  <Lines state={this.state} size={this.size}/>
    }

    return (
      <div>
        
        {/* the panel with stopwatch and information about the level on the left side of the page */}
        <StopWatch 
          isActive={this.state.stoperActive} 
          level={this.state.level}
        />

        {/* this is the modal which appears when a level is completed */}
        <Modal 
            show={this.state.levelCompleted}
            modalClosed={this.nextLevel.bind(this)}
            level={this.state.level}
        />     
        

        {/* draw spiders based on their collection in the state */}
        { spiders }
            
        {/* draw lines between spiders */}
        {lines}
  
      </div>
    )
  }
}

export default Spiders;