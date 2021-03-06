import React, { Component } from "react";
import Image from "next/image";
import styles from "../styles/styles.module.css";

class Spider extends Component {
    
    render() {

        return (
           <div 
                className={styles.spiders} 
                //  this is to position the spider in given coordinates (result of mouse dragging)
                style={{ 
                    left: this.props.x+"px", 
                    top: this.props.y+"px"
                }}>
                
                <Image
                    onDrag={this.props.onDrag}
                    onDragStart={this.props.onDragStart}
                    priority
                    src="/images/spider.png"
                    className={styles.borderCircle}
                    height={this.props.size}
                    width={this.props.size}
                    alt={"spider"+this.props.id}
                />
            </div>
        )
    }
}

export default Spider;