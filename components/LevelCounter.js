import React from "react";
import styles from "../styles/styles.module.css"

const LevelCounter = (props) => {
    return (
        <div className={styles.LevelCounter}>
            <strong>poziom: {props.level}</strong>
        </div>
    )
}

export default LevelCounter;