import React, { Component } from 'react';
import Backdrop from './Backdrop';
import styles from '../styles/styles.module.css';

class Modal extends Component {
 
    shouldComponentUpdate(nextProps, nextState) {
        
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }
    
    render() {

        let randomInt = Math.floor(Math.random() * 4);

        let message = (                 // congratulation message displayed at model when a level is completed
            <div>
                <h3>Gratulacje!</h3>
                <p>Jesteś niezły w rozplątywaniu pajęczyny!</p>
                <p>Poziom <span className={styles.milisec}><b>{this.props.level + 1}</b></span> będzie trudniejszy...</p>
            </div>
        );

        switch(randomInt) {             //there are 4 congratulation messages - select one randomly
            case 0: {
                message = (
                    <div>
                        <h3>Gratulacje!</h3>
                        <p>Jesteś niezły w rozplątywaniu pajęczyny!</p>
                        <p>Poziom <span className={styles.milisec}><b>{this.props.level + 1}</b></span> będzie trudniejszy...</p>
                    </div>
                );
                break;    
            }
            case 1: {
                message = (
                    <div>
                        <h3>Mistrzu pajęczyny!</h3>
                        <p>Jestem pod wrażeniem!</p>
                        <p>Czy poziom <span className={styles.milisec}><b>{this.props.level + 1}</b></span> pokonasz równie szybko?</p>
                    </div>
                );
                break;    
            }
            case 2: {
                message = (
                    <div>
                        <h3>Brawo!</h3>
                        <p>To było szybkie!</p>
                        <p>Na pewno poziom <span className={styles.milisec}><b>{this.props.level + 1}</b></span> pokonasz jeszcze szybciej.</p>
                    </div>
                );
                break;    
            }
            case 3: {
                message = (
                    <div>
                        <h3>Super!</h3>
                        <p>Poradziłeś sobie z tym zadaniem całkiem sprawnie!</p>
                        <p>Spróbuj swoich sił na poziomie <span className={styles.milisec}><b>{this.props.level + 1}</b></span>.</p>
                    </div>
                );
                break;    
            }
        }
        
        // if all levels are completed than there is a special message about it
        if (this.props.level === this.props.maxLevel) {
            message = (
                <div>
                    <h3>Gratulacje!</h3>
                    <p><strong>Pokonałeś najtrudniejszą pajęczynę !</strong></p>
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