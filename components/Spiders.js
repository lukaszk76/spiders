import React, {Component} from 'react';
import Spider from "./Spider";
import styles from "../styles/styles.module.css";

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
        <svg height={window.innerHeight} width={window.innerWidth} >
        {Object
          .keys(this.state.lines)
          .map( lineId =>
            {
              const spider1 = this.state.lines[lineId].from;
              const spider2 = this.state.lines[lineId].to;
              
              return (
               
                  <line 
                    className={styles.redLines}
                    key={lineId}
                    x1={this.state.spiders[spider1].x+77} 
                    y1={this.state.spiders[spider1].y+77} 
                    x2={this.state.spiders[spider2].x+77} 
                    y2={this.state.spiders[spider2].y+77}  
                  />
            
              )
            }
        )}

        </svg>
      </div>
    )
  }
}

export default Spiders;