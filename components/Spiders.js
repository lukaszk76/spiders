import React, {Component} from 'react';

import Spider from "./Spider";
import Lines from "./Lines"

class Spiders extends Component {
 
  constructor(props) {
    super(props);
  
    this.deltaX = 0;  //delta between current position of cursor and center of a spider when dragging starts (X coordinate)
    this.deltaY = 0;  //delta between current position of cursor and center of a spider when dragging starts (Y coordinate)
    this.state = {  //collection of spiders #TODO: this should be loaded from an external file
      spiders:{
        1:{
          x:100,
          y:300
        },
        2:{
          x:300,
          y:400
        },
        3:{
          x:500,
          y:100
        }
      },
      lines:{
        1:{
          from:1,
          to:2
        },
        2:{
          from:1,
          to:3
        }
      }
    };
  }

  spiderDragged(e, spiderId) {
    if (e.clientY !== 0 & e.clientX !== 0) {
      const newState = {
        ...this.state     
      }
      newState.spiders[spiderId] = {
        x:e.clientX+this.deltaX, 
        y:e.clientY+this.deltaY
      }
      this.setState( newState );
    }
  }

  setDeltas(e, spiderId) {    
    this.deltaX = this.state.spiders[spiderId].x - e.clientX;
    this.deltaY = this.state.spiders[spiderId].y - e.clientY;
  }

  // setWindowSize( width, height) {
  //   const newState = {
  //     ...this.state,
  //     windowHeight: height,
  //     windowWidth: width
  //   }
  //   this.setState( newState );
  // }

  render() {
    
    return (
      <div>
        
        {/* draw spiders based on their collection in the state*/}
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

        {/* draw lines between spiders */}
        <Lines state={this.state}/>
  
      </div>
    )
  }
}

export default Spiders;