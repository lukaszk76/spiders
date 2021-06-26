import React, { Component } from 'react';
import Backdrop from './Backdrop';
import styles from '../styles/styles.module.css';

class Modal extends Component {
 
    shouldComponentUpdate(nextProps, nextState) {
        
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }
    
    render() {

        let message = (
            <div>
                <h3>Gratulacje!</h3>
                <p>Jesteś niezły w rozplątywaniu pajęczyny!</p>
                <p>Poziom <span className={styles.milisec}><b>{this.props.level + 1}</b></span> będzie trudniejszy...</p>
            </div>
        )

        if (this.props.level === this.props.maxLevel) {
            message = (
                <div>
                    <h3>Gratulacje!</h3>
                    <p>Pokonałeś najtrudniejszą pajęczynę !</p>
                    <p>Zagrasz jeszcze raz od poziomu <span className={styles.milisec}><b>1</b></span> ?</p>
                </div>
            )
        }

        return(
            <>
                <Backdrop 
                    show={this.props.show}
                    clicked={this.props.modalClosed}/>
                
                <div className={styles.Modal}
                    style = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    
                {message}   
                    
                </div>
            </>
        );
    }
};


export default Modal;