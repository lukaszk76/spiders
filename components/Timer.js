import React from "react";
import styles from "../styles/styles.module.css";

export default function Timer(props) {
	
	return (
		<div className={styles.timer}>

			{/* displays minutes */}
			<span className={styles.digits}>
				{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:		
			</span>
			
			{/* displays seconds */}
			<span className={styles.digits}>
				{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.					
			</span>
			
			{/* displays miliseconds */}
			<span className={styles.digits, styles.milisec}>
				{("0" + ((props.time / 10) % 100)).slice(-2)}					
			</span>

		</div>
	);
}
