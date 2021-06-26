import React, { Component } from "react";
import Image from "next/image";
import styles from "../styles/styles.module.css";

class Spider extends Component {
    
    render() {

        return (
           <div 
                className={styles.spiders} 
                // this is to position the spider in given coordinates (result of mouse dragging)
                style={{ 
                    left: this.props.x+"px", 
                    top: this.props.y+"px"
                }}>
                
                <Image
                    onDrag={this.props.onDrag}
                    onMouseDown={this.props.onMouseDown}
                    priority
                    src="/images/spider.png"
                    className={styles.borderCircle}
                    height={144}
                    width={144}
                    alt={"spider"+this.props.id}
                />
            </div>
        )
    }
}

export default Spider;