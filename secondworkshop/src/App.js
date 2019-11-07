import React, {Component} from 'react';

import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom"

import {FetchData} from '../src/services';

import SliderView from "./slider"
import SearchView from "./search"
import CardsView from "./cards"

import NotFound from "./404"

import './index.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isData: false,
      cards: [],
      maxCards: 20
    }
  }

  async componentDidMount() {
    const isPrevCards = JSON.parse(localStorage.getItem("DataCards"));
    if (isPrevCards) {
    // console.log("Response from LocalStorage: ", isPrevCards);
      this.setState({
        cards: isPrevCards,
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
  render() {
    return(
      <div>
        <Router>
          <nav>
            <NavLink to="/" activeClassName="link--active" style={{color: "white", padding: "20px"}}>Slider</NavLink>
            <NavLink to="/search" activeClassName="link--active" style={{color: "white", padding: "20px"}}>Searcher</NavLink>
            <NavLink to="/cards" activeClassName="link--active" style={{color: "white", padding: "20px"}}>Check all episodes</NavLink>
          </nav>
          <Switch>
            <Route exact path="/" render={(props) => <SliderView {...props} data={this.state.isData ? this.state.cards : ""}/>}/>
            <Route path="/search" render={(props) => <SearchView {...props} data={this.state.isData ? this.state.cards : ""}/>}/>
            <Route path="/cards" render={(props) => <CardsView {...props} data={this.state.isData ? this.state.cards : ""}/>}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App
