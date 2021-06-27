import React from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
import styles from "../styles/styles.module.css";


const Lines = (props) => {
    
    const windowSize = useWindowDimensions(); // svg requires proper window size. It cannot be  detecte on SSR. It may be delivered from useEffect which is triggered when rendering on client's side
    
    return (
 
        <svg height={windowSize.height} width={windowSize.width} >
        
        {Object
          .keys(props.state.lines)
          .map( lineId =>
            {
                const spider1 = props.state.lines[lineId].from;     // get spider's ids on both ends of a line
                const spider2 = props.state.lines[lineId].to;
                const positionCorrection = props.size / 2;          // half of a spider's size is to be added to coordinates so that a line starts at spider's center
                
                return (
                    // draw a line between 2 spiders and set its style depending on if it's crossed
                    <line 
                        className={props.state.linesCrossed[lineId] ? styles.crossedLine : styles.solvedLine}
                        key={lineId}
                        x1={props.state.spiders[spider1].x + positionCorrection} 
                        y1={props.state.spiders[spider1].y + positionCorrection} 
                        x2={props.state.spiders[spider2].x + positionCorrection} 
                        y2={props.state.spiders[spider2].y + positionCorrection}  
                    />
            
                )
            }
        )}

        </svg>
    )
}

export default Lines;