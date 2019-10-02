import React, {Component} from 'react';

// As Service is not Exported as Default should be wrapped in with {}.
import {FetchData} from '../src/services';

import Card from '../src/components/Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isData: false,
      title: "",
      summary: "",
      image: "",

      cards: [],
      counter: 0,
      maxCards: 10,

      displayFav: false
    }
    // this.getData = this.getData.bind(this);
    this.handleFav = this.handleFav.bind(this);
  }

  async componentDidMount() {
    const isPrevCards = JSON.parse(localStorage.getItem("DataCards"));
    if (isPrevCards) {
      isPrevCards.forEach(element => {
        this.state.cards.push(<Card dataTitle= {element.props.dataTitle} dataSummary= {element.props.dataSummary} dataImage= {element.props.dataImage} key= {element.key} dataFav = {element.props.dataFav}/>);
      });
      
    } else {
      for (let i = 0; i < this.state.maxCards + 1; i++) {
        const data = await FetchData(i);
        // console.log(data);
        const episodeTitle = data.name;
        const episodeSummary = data.summary;
        const episodeImage = data.image.original;
        this.setState({
          title: episodeTitle,
          summary: episodeSummary,
          image: episodeImage,
          counter: i
        }, () => {
          this.state.cards.push(<Card dataTitle= {this.state.title} dataSummary= {this.state.summary} dataImage= {this.state.image} key= {this.state.counter} dataFav = {false}/>);
        });
      };
      this.setState({
        isData: true
      }, () => {
        if (this.state.isData) {
          localStorage.setItem("DataCards", JSON.stringify(this.state.cards));
        } else {
          console.log("Error trying to set new data.")
        }
      });
    }
  }

  handleFav() {
    this.setState({
      displayFav: !this.state.displayFav
    });
  }

  render() {
    const favoriteBtn = {
      position: 'fixed'
    }

    return(
      <div>
        <button style= {favoriteBtn} onClick= {this.handleFav}>{this.state.displayFav? 'Ver todos' : 'Ver favoritos'}</button>
        <div id= "cards-wrapper">
          {/* {this.state.cards} */}
          {this.state.displayFav? <h1>'Favs'</h1> : this.state.cards}
        </div>
      </div>
    );
  };
}

export default App;
