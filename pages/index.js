import React, {Component} from 'react';
import Head from "next/head"

//custom components
import Spider from "../components/Spider";
import Lines from "../components/Lines";
import Modal from "../components/Modal";
import StopWatch from '../components/StopWatch';

//utils
import checkIfSolved from '../utils/checkIfSolved';
import loadLevelData from '../utils/loadLevelData';

class Spiders extends Component {
 
  constructor(props) {
    super(props);
    
    this.deltaX = undefined;  //delta between current position of cursor and center of a spider when dragging starts (X coordinate)
    this.deltaY = undefined;  //delta between current position of cursor and center of a spider when dragging starts (Y coordinate)
    this.size = 100;          //size of a spider
    this.maxLevel = 13;       //number of levels
    this.state = {  
      spiders:null,           //collection of spiders. Initially null - these are loaded from JSON in componentDidMount()
      lines:null,             //collection of lines between spiders. Initially null - these are loaded from JSON in componentDidMount()
      linesCrossed: {},       //collection of lines crossed with other lines
      levelCompleted: false,  //set true if level completed - will trigger congratulations modal
      level: 0,               //current level
      stoperActive: false,    //triggers the stopwatch
      crossPoints: {}         //coordinates of all points where lines are crossed
    };
  }
  
  componentDidMount() {
    this.nextLevel();             //triggers loading data for the first level
    this.identifyCrossedLines();  //mark lines which a crossed
  }
  
  // identifies which lines are crossed and if initiates actions releted to completion of the level
  identifyCrossedLines() {
    if( this.state.spiders !== null & this.state.lines !== null ) {                 
      const [linesCrossed, crossPoints] = checkIfSolved(this.state.spiders, this.state.lines, this.size);     //build collection of crossed lines
      const levelCompleted = Object.keys(linesCrossed).length > 0 ? false : true;   //if no lines crossed were detected this means that the level is completed
      const newState = {
        ...this.state,
        linesCrossed: linesCrossed,
        crossPoints: crossPoints,
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
      
      newState.spiders[spiderId] = {      //update position of the spider to cursor coordinates. 
        x:e.clientX+this.deltaX,          //remember that cursor is not on the corner of spider so that the delta correction is needed       
        y:e.clientY+this.deltaY
      }
      
      this.setState( newState );
    }
   
    this.identifyCrossedLines();          // TODO: as setState is asynchronous this executes too fast and do not mark crossed lines properly. Find a method to mark crossed lines at the beginning of a level
  }

  // this is called when dragging starts. The aim is to record position of the cursor on a spider so that it can be later on used to properly place the spider whe dragging ends
  setDeltas(e, spiderId) {

    this.deltaX = this.state.spiders[spiderId].x - e.clientX;
    this.deltaY = this.state.spiders[spiderId].y - e.clientY;
  }
  
  // triggers loading data for the next level and closes the modal with congratulations
  nextLevel() {

    let nextLevel = this.state.level + 1;
    if (nextLevel > this.maxLevel) {              // check if it is not the last level. If so let's start again from level 1
      nextLevel = 1;
    }
    const levelData = loadLevelData(nextLevel);    //load data for the next level 
    
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
            )
          }
        </div>
      )
    }

    let lines = <div></div>
    if (this.state.lines) {                     // first check if lines have been loaded from external JSON file
      lines =  <Lines state={this.state} size={this.size}/>
    }

    return (
      <div>
         <Head>
            <title>Spiders</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet"></link>
        </Head>
    
        <main>
    
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
              maxLevel={this.maxLevel}
            />     
            

            {/* draw spiders based on their collection in the state */}
            { spiders }
                
            {/* draw lines between spiders */}
            {lines}
    
        </main>
      </div>
    )
  }
}

export default Spiders;