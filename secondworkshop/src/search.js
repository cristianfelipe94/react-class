import React, { Component } from "react"
import Search from "./components/Search";

class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: [],
      stock: [],
      searchInput: "",
      firstRender: false,
      forceRender: true
    }
    this.searchFor = this.searchFor.bind(this);
  }

  searchFor(event) {
    const statename = event.target.id;
		this.setState({
      [statename]: event.target.value,
      render: this.state.stock,
      firstRender: true
		}, () => {
      const searchedArray = [];
      const nameArray = this.state.render.map(cards => {
        const nameElement = cards.map(card => {
          return card.title;
        })
        return nameElement;
      });
      nameArray.forEach(cards => {
        cards.forEach(cardName => {
          if (cardName.indexOf(this.state.searchInput) > -1) {
            const matchCard = cards.indexOf(cardName);
            searchedArray.push(this.state.render[0][matchCard]);
          }
        })
      });
      this.state.render = []
      this.state.render.push(searchedArray);
      this.setState({
        forceRender: true
      })
    });
  }

  render() {

    const dataLoader = () => {
      if(!this.state.firstRender) {
        const rendering = this.props.data.map((card) => {
          const data = {
            title: card.episodeTitle,
            summary: card.episodeSummary,
            image: card.episodeImage,
            id: card.episodeId,
            fav: card.episodeFav,
          }
          return data;
        });
        this.state.stock.push(rendering);
      }
    }

    const renderCollection = () => {
      const renderGroup = this.state.render.map(array => {
        const renderElement = array.map(card => {
          return <Search dataTitle= {card.title} dataSummary= {card.summary} dataImage= {card.image} key= {card.id} dataId= {card.id} dataFav= {card.fav}/>;
        })
        return renderElement;
      })
      return renderGroup;
    }

    const stockCollection = () => {
      const renderGroup = this.state.stock.map(array => {
        const renderElement = array.map(card => {
          return <Search dataTitle= {card.title} dataSummary= {card.summary} dataImage= {card.image} key= {card.id} dataId= {card.id} dataFav= {card.fav}/>;
        })
        return renderElement;
      })
      return renderGroup;
    }

    return (
      <div className="search__layout">
        <div className="search__bar">
          <label htmlFor="rickMortySearch" className="search__label">
            Search for:
          </label>
          <input
            id="searchInput"
            className="search__input"
            placeholder="Episode name"
            onChange={this.searchFor}
          ></input>
        </div>
        <div>
          {this.props.data.length && !this.state.firstRender ? dataLoader() : ""}
          {this.state.searchInput === "" ? stockCollection() : renderCollection()}
        </div>
      </div>
    )
  }
}

export default SearchView