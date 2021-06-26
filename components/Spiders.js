import React, {Component} from 'react';

import Spider from "./Spider";
import Lines from "./Lines"
import checkIfSolved from '../utils/checkIfSolved';

import level1DataJSON from '../levels/level1.json';

class Spiders extends Component {
 
  constructor(props) {
    super(props);
  
    this.deltaX = undefined;  //delta between current position of cursor and center of a spider when dragging starts (X coordinate)
    this.deltaY = undefined;  //delta between current position of cursor and center of a spider when dragging starts (Y coordinate)
    this.state = {  
      spiders:null,       //collection of spiders. Initially null - these are loaded from JSON in componentDidMount()
      lines:null,         //collection of lines between spiders. Initially null - these are loaded from JSON in componentDidMount()
      linesCrossed: {}  //collection of lines crossed with other lines
    };
  }

  componentDidMount() {
    // load spiders data from external JSON file
    const loadData = () => JSON.parse(JSON.stringify(level1DataJSON));
    const level1Data = loadData();
    
    // and update state with the imported data
    const newState = {
      ...this.state,
      spiders: level1Data.spiders,
      lines: level1Data.lines,
    }
    
    this.setState(newState);

    this.identifyCrossedLines();

  }

  identifyCrossedLines() {
  
    if( this.state.spiders !== null & this.state.lines !== null ) {
      const linesCrossed = checkIfSolved(this.state.spiders, this.state.lines);
      const newState = {
        ...this.state,
        linesCrossed: linesCrossed
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
      lines =  <Lines state={this.state}/>
    }

    return (
      <div>
        
        {/* draw spiders based on their collection in the state */}
        { spiders }
            
        {/* draw lines between spiders */}
        {lines}
  
      </div>
    )
  }
}

export default Spiders;