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
      isFav: false,

      cards: [],
      favCards: [],
      counter: 0,
      maxCards: 10,

      displayFav: false
    }
    // this.getData = this.getData.bind(this);
    this.handleFav = this.handleFav.bind(this);
    this.setData = this.setData.bind(this);
  }

  async componentDidMount() {
    const isPrevCards = JSON.parse(localStorage.getItem("DataCards"));
    if (isPrevCards) {

      // const persistenceData = {
      //   globalData: this.state.cards,
      //   globalSetter: this.setData
      // };

      // console.log(isPrevCards);

      // isPrevCards.forEach(element => {
      //   this.state.cards.push(<Card dataTitle= {element.props.dataTitle} dataSummary= {element.props.dataSummary} dataImage= {element.props.dataImage} key= {element.key}  dataId= {element.key} dataFav = {element.props.dataFav} persistProp= {persistenceData}/>);
      // });

      // this.setState({
      //   isData: true
      // });
      
    } else {
      const persistenceData = {
        globalData: this.state.cards,
        globalSetter: this.setData
      };

      for (let i = 0; i < this.state.maxCards + 1; i++) {
        const data = await FetchData(i);
        // console.log(data);
        const cardObject = {
          episodeTitle: data.name,
          episodeSummary: data.summary,
          episodeImage: data.image.original,
          episodeId: i,
          episodeFav: this.state.isFav
        };

        this.state.cards.push(cardObject);

        console.log(this.state.cards);
        // const episodeTitle = data.name;
        // const episodeSummary = data.summary;
        // const episodeImage = data.image.original;
        // this.setState({
        //   title: episodeTitle,
        //   summary: episodeSummary,
        //   image: episodeImage,
        //   counter: i
        // }, () => {
        //   this.state.cards.push(<Card dataTitle= {this.state.title} dataSummary= {this.state.summary} dataImage= {this.state.image} key= {this.state.counter} id= {this.state.counter} dataFav = {this.state.isFav} persistProp= {persistenceData}/>);
        // });
      };
      this.setState({
        isData: true
      });
      // this.setState({
      //   isData: true
      // }, () => {
      //   if (this.state.isData) {
      //     localStorage.setItem("DataCards", JSON.stringify(this.state.cards));
      //   } else {
      //     console.log("Error trying to set new data.")
      //   }
      // });
    }
  }

  handleFav() {
    // localStorage.clear();
    // localStorage.setItem("DataCards", JSON.stringify(this.state.cards));
    this.setState({
      displayFav: !this.state.displayFav
    });
  }

  setData(cardToBeFav) {
    console.log(cardToBeFav);
    const persistenceData = {
      globalData: this.state.cards,
      globalSetter: this.setData
    };
    this.state.favCards.push(<Card dataTitle= {cardToBeFav.title} dataSummary= {cardToBeFav.summary} dataImage= {cardToBeFav.image} key= {cardToBeFav.cardId} id= {cardToBeFav.cardId} dataFav= {cardToBeFav.isFavorite} persistProp= {persistenceData}/>);
    // console.log(cardId, cardFavStatus);
    // console.log("Card to be changed: ", cardToBeEdited);
    // this.setState({
    //   cards: setNewData
    // }, () => {
    //   console.log("Setting new data: ", this.state.cards)
    // });
  }

  render() {
    const favoriteBtn = {
      position: 'fixed'
    }

    const favoriteCollection = this.state.cards.map((card) => {
      console.log(card);
      // return card.filter(favProps => {
      //   console.log(favProps)
      //   Boolean(favProps);
      // })
      // return Boolean(card.episodeFav);
      // return <Card  dataTitle= {card.episodeTitle} dataSummary= {card.episodeSummary} dataImage= {card.episodeImage} key= {card.episodeId} id= {card.episodeId} dataFav= {card.episodeFav}/> 
      // return card.isFav ? <Card  dataTitle= {card.episodeTitle} dataSummary= {card.episodeSummary} dataImage= {card.episodeImage} key= {card.episodeId} id= {card.episodeId} dataFav= {card.episodeFav}/> : <Card  dataTitle= {card.episodeTitle} dataSummary= {card.episodeSummary} dataImage= {card.episodeImage} key= {card.episodeId} id= {card.episodeId} dataFav= {card.episodeFav}/>;
    });

    // const favoriteCollection = this.state.cards.map((card) => {
    //   if(card.episodeFav) {
    //     return <Card  dataTitle= {card.episodeTitle} dataSummary= {card.episodeSummary} dataImage= {card.episodeImage} key= {card.episodeId} id= {card.episodeId} dataFav= {card.episodeFav}/>;
    //   } else {
    //     return <Card  dataTitle= {card.episodeTitle} dataSummary= {card.episodeSummary} dataImage= {card.episodeImage} key= {card.episodeId} id= {card.episodeId} dataFav= {card.episodeFav}/>;
    //   }
    // });


    if (this.state.isData) {
      if (this.state.displayFav) {
        return (
          <div>
            <button style= {favoriteBtn} onClick= {this.handleFav}>Ver todos</button>
            <div id= "cards-wrapper">
              {favoriteCollection}
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <button style= {favoriteBtn} onClick= {this.handleFav}>Ver favoritos</button>
            <div id= "cards-wrapper">
              {favoriteCollection}
            </div>
          </div>
        )
      }
    } else {
      return (
        <div id= "cards-wrapper">
          <h2>Sorry cards data is not ready.</h2>
        </div>
      )
    }
  };
}

export default App;
