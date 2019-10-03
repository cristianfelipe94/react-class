import React, {Component} from 'react';
import App from './App';

import './index.css';

class Init extends Component {
    constructor(props) {
        super(props);
        this.state = {
            episode: 0,
            isEpisode: false,
            error: ""
        }
        this.validate = this.validate.bind(this);
    }

    validate() {
        this.setState ({
            error: ""
        });
        const inputValue = document.getElementById('episodes');
        if (inputValue.value !== "") {
            if(inputValue.value > 0 && inputValue.value <= 30) {
                this.setState({
                    episode: inputValue.value,
                    isEpisode: true
                });
            } else {
                this.setState({
                    error: "The input value should be higher than '0' and lower or equal to '30'"
                });
            }
        } else {
            this.setState({
                error: "Please make sure that you have provide a number inside the Field."
            });
        }
    }

    render() {

        const errorMessage = {
            color: 'red'
        }

        const formDisplay = {
            textAlign: 'center',
            padding: '70px',
            height: '100vh',
        }

        if(localStorage.length) {
            return(
                <App/>
            );
        } else {
            if(this.state.isEpisode) {
                return (
                    <App dataAmount= {this.state.episode} />
                );
            } else {
                return (
                    <div style= {formDisplay}>
                        <label htmlFor= "episodes" className= "form-label">Select the amount of episodes:</label>
                        <input type= "number" id= "episodes" placeholder= "Minimum of 1 episode and Maximum 30." className= "form-input"/>
                        <button onClick= {this.validate} className= "form-btn">Generate cards</button>
                        <p style= {errorMessage}>{this.state.error}</p>
                    </div>
                );
            }
        }
    };
};

export default Init;