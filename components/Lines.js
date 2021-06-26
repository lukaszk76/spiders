import React from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
import styles from "../styles/styles.module.css";

const Lines = (props) => {
    const windowSize = useWindowDimensions(); // svg requires proper window size. It cannot be properly detecte on SSR. It may be delivered from useEffect which is triggered when rendering on client's side
    return (
        <svg height={windowSize.height} width={windowSize.width} >
        {Object
          .keys(props.state.lines)
          .map( lineId =>
            {
                // get spider's ids on both ends of a line
                const spider1 = props.state.lines[lineId].from;
                const spider2 = props.state.lines[lineId].to;
              
                return (
               
                    <line 
                        className={props.state.linesCrossed[lineId] ? styles.crossedLine : styles.solvedLine}
                        key={lineId}
                        x1={props.state.spiders[spider1].x+77} // +77 is to make a line starts from center of a spider #TODO: replace static 77 with a dynamic value depending on size of a spider
                        y1={props.state.spiders[spider1].y+77} 
                        x2={props.state.spiders[spider2].x+77} 
                        y2={props.state.spiders[spider2].y+77}  
                    />
            
                )
            }
        )}

        </svg>
    )
}

export default Lines;