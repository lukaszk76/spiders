import React, {Component} from 'react';
import Spider from "./Spider";

class Spiders extends Component {
  state = {
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
    }
  }

  deltaX = 0;
  deltaY = 0;

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

  render() {
    let spiderId = 1;
    return (
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
}


export default Spiders;