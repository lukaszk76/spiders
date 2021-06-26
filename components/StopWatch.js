import React, { useState, useEffect } from "react";
import styles from "../styles/styles.module.css";
import Timer from "./Timer";

function StopWatch(props) {
    
    const [time, setTime] = useState(0);
    const [previousTime, setPreviousTime] = useState(0);
    useEffect(() => {
        let interval = null;

        if (props.isActive === true) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
            setPreviousTime(time);
            setTime(0);
        }
        
        return () => {
            clearInterval(interval);
        };

    }, [props.isActive]);


return (
	<div className={styles.StopWatch}>
	    <div className={styles.info}><strong>poziom: <span className={styles.milisec}>{props.level}</span></strong></div>
        <Timer time={time} />
        <div className={styles.info}>ukończyłeś poziom w</div>
        <Timer time={previousTime} />
	</div>
);
}

export default StopWatch;
