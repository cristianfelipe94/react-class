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
      maxCards: 10
    }

    // this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
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
        isData: true,
        counter: i
      }, () => {
        this.state.cards.push(<Card dataTitle= {this.state.title} dataSummary= {this.state.summary} dataImage= {this.state.image} key= {i}/>)
      });
    }
  }

  render() {
    return(
      <div id= "cards-wrapper">
        {this.state.cards}
      </div>
    );
  };
}

export default App;
