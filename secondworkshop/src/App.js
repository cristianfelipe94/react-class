import React, {Component} from 'react';

// As Service is not Exported as Default should be wrapped in with {}.
import {FetchData} from '../src/services';

import Card from '../src/components/Card';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isData: false,
      title: "",
      summary: "",
      image: "",
      isFav: false,

      cards: [],
      counter: 0,
      maxCards: this.props.dataAmount,

      displayFav: false
    }
    // this.getData = this.getData.bind(this);
    this.handleFav = this.handleFav.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.setData = this.setData.bind(this);
  }

  async componentDidMount() {
    const isPrevCards = JSON.parse(localStorage.getItem("DataCards"));
    if (isPrevCards) {
      // console.log("Response from LocalStorage: ", isPrevCards);

      this.setState({
        cards: isPrevCards
      });

      this.setState({
        isData: true
      });
      
    } else {

      for (let i = 0; i < this.state.maxCards; i++) {
        const data = await FetchData(i);
        // console.log("Data from Fetch: ", i);
        const cardObject = {
          episodeTitle: data.name,
          episodeSummary: data.summary,
          episodeImage: data.image.original,
          episodeId: i,
          episodeFav: this.state.isFav,
          globalSetter: this.setData
        };

        this.state.cards.push(cardObject);
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
  };

  handleClear() {
    localStorage.clear();
    window.location.reload();
  };

  setData(addToFav) {
    // console.log("What to add into Favs: ", addToFav)

    const cardObject = {
      episodeTitle: addToFav.title,
      episodeSummary: addToFav.summary,
      episodeId: addToFav.cardId,
      episodeImage: addToFav.image,
      episodeFav: addToFav.isFavorite
    };

    this.state.cards.splice(addToFav.cardId, 1);
    // console.log("After splice", this.state.cards);
    
    this.state.cards.push(cardObject);
    // console.log("After push, not organized: ", this.state.cards)
    
    this.state.cards.sort((a, b) => {return a.episodeId - b.episodeId})
    // console.log("After sort: ",this.state.cards);

    localStorage.setItem("DataCards", JSON.stringify(this.state.cards));

    // console.log("New fav: ", cardObject);
  }

  render() {

    const mainCollection = this.state.cards.map((card) => {
      return <Card  dataTitle= {card.episodeTitle} dataSummary= {card.episodeSummary} dataImage= {card.episodeImage} key= {card.episodeId} dataId= {card.episodeId} dataFav= {card.episodeFav} globalprops= {this.setData}/>;
    });

    const favoriteCollection = this.state.cards.map((card) => {
      return card.episodeFav ? <Card  dataTitle= {card.episodeTitle} dataSummary= {card.episodeSummary} dataImage= {card.episodeImage} key= {card.episodeId} dataId= {card.episodeId} dataFav= {card.episodeFav} globalprops= {this.setData}/> : "";
    });


    if (this.state.isData) {
      if (this.state.displayFav) {
        return (
          <div>
            <button className= "favorites-btn" onClick= {this.handleFav}>Go to Collection</button>
            <div id= "cards-wrapper">
              {favoriteCollection}
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <button className= "favorites-btn" onClick= {this.handleFav}>Go to Favorites</button>
            <button className= "clear-btn" onClick= {this.handleClear}>Clear Storage</button>
            <div id= "cards-wrapper">
              {mainCollection}
            </div>
          </div>
        )
      }
    } else {
      return (
        <div id= "cards-wrapper">
          <h2>Loading data...</h2>
        </div>
      )
    }
  };
}

export default App;
