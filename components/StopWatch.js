import React, { useState, useEffect } from "react";
import styles from "../styles/styles.module.css";
import Timer from "./Timer";

function StopWatch(props) {
    
    const [time, setTime] = useState(0);                    // current time displayed by the stopwatch
    const [previousTime, setPreviousTime] = useState(0);    // time at completion of the previous level

    useEffect(() => {
        let interval = null;

        if (props.isActive === true) {          // if the stopwatch is activated update time with interval 10ms
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {                                // if the stopwatch is not active stop updating time, reset watch and remember the time at completion of the level
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

            <div className={styles.info}>
                <strong>poziom: <span className={styles.milisec}>{props.level}</span></strong>
            </div>
            
            {/* this timer displays current time */}
            <Timer time={time} />           
            
            <div className={styles.info}>ukończyłeś poziom w</div>
            
            {/* this timer displays time at compeltion of the previous level */}
            <Timer time={previousTime} />   
       
        </div>
    );
}

export default StopWatch;
