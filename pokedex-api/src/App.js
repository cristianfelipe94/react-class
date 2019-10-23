import React, {Component} from 'react';
import PokeCard from './PokeCard.js';
import PokeData from './service.js';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    }
  }

  async componentDidMount() {
    try {
      let dataPokeProcessed = await PokeData();
      const pokeCard = dataPokeProcessed.map((card, id) => {
        return(
          <PokeCard pokeName={card.name} pokeImage={card.imageUrlHiRes} key={id}/>
        );
      });
      this.setState({
        cards: pokeCard
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return(
      <div>
        <h1>Pokedex</h1>
        <div className="pokedex">
          <div className="pokedex--layout"></div>
          {this.state.cards}
        </div>
      </div>
    )
  }
}

export default App;
