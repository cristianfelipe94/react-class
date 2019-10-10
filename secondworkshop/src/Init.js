import React, { Component } from 'react';
import App from './App';

import './index.css';

class Init extends Component {
    constructor(props) {
        super(props);
        this.state = {
            episode: 0,
            isEpisode: false,
            error: null,
            numberOfEpisodes: 0
        }
        this.validate = this.validate.bind(this);
    }

    // validate() {
    //     // *** Esto tampoco hace falta falta tampoco
    //     this.setState({
    //         error: ""
    //     });

    //     /*
    //         *** esto no es necesario con react, porque podemos asignarle al value del input un valor dinámico con el state 
    //             y entonces solo hacemos una funció que este cambio ese valor con setSate y llamamos en el onChange del input
    //     */

    //     const inputValue = document.getElementById('episodes');
    //     if (inputValue.value !== "") {

    //         *** Para este tipo de validación como le había en clase no use un valor estático, es mejor con .length medir el array 
    //              y para eso es mejor tener el request en el padre de los elementos que van a utiliza info, nos permite que si vamos a utilizar ese objeto
    //              que devuelve el api en varios componentes, no tengamos que llamarlo en cada uno ... que sería lo que podría pasar acá en un caso como ese
    // 
    //         if (inputValue.value > 0 && inputValue.value <= 30) {
    //             this.setState({
    //                 episode: inputValue.value,
    //                 isEpisode: true
    //             });
    //         } else {
    //             this.setState({
    //                 error: "The input value should be higher than '0' and lower or equal to '30'"
    //             });
    //         }
    //     } else {
    //         this.setState({
    //             error: "Please make sure that you have provide a number inside the Field."
    //         });
    //     }
    // }


    // EN LUGAR DE LO QUE TIENE DENTRO DE VALIDATE SE PUEDE TENER ALGO COMO ESTO QUE VA A ASIGNAR EL VALOR Y ADEMAS VALIDA
    validate() {
        this.setState({
            episode: this.state.numberOfEpisodes,
            isEpisode: true
        })
    }

    handleInput = (e) => {
        const { value } = e.target;
        this.setState({
            // numberOfEpisodes es el valor dinámico para el input
            numberOfEpisodes: Number(value)
        }, () => {
            if (this.state.numberOfEpisodes <= 0 || this.state.numberOfEpisodes > 30) {
                this.setState({
                    error: "The input value should be higher than '0' and lower or equal to '30'"
                });
            } else {
                this.setState({
                    error: null
                })
            }
        })
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

        if (localStorage.length) {
            return (
                <App />
            );
        } else {
            if (this.state.isEpisode) {
                return (
                    <App dataAmount={this.state.episode} />
                );
            } else {
                return (
                    <div style={formDisplay}>
                        <label htmlFor="episodes" className="form-label">Select the amount of episodes:</label>

                        {/* el input utitliza el onChange para actualizar el valor dinámico del input cada vez que escribimos */}
                        <input type="number" id="episodes" placeholder="Minimum of 1 episode and Maximum 30." className="form-input" onChange={this.handleInput} />

                        {/* Este botón va a estar disable a menos que el exista un valor > 0 y menor al length de los episodios */}
                        <button onClick={this.validate} className="form-btn" disabled={!this.state.numberOfEpisodes || this.state.error}>Generate cards</button>

                        <p style={errorMessage}>{this.state.error}</p>
                    </div >
                );
            }
        }
    };
};

export default Init;