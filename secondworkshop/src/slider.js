import React, { Component } from "react"
import Gallery from './components/Gallery';

import './index.css';

class SliderView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      galleryPosition: 0,
      galleryTop: ""
    }
  }

  render() {
    const cardsCollection = () => {
      const rendering = this.props.data.map((card) => {
        return <Gallery dataTitle= {card.episodeTitle} dataImage= {card.episodeImage} key= {card.episodeId} dataId= {card.episodeId}/>;
      });
      return rendering;
    }

    const gallery = {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      left: this.state.galleryPosition,
      transition: "2s"
    }
    
    return (
      <div>
        <div className="gallery__layout">
          <button className="gallery__btn" onClick={() => {this.setState({galleryPosition: this.state.galleryPosition + 400})}}>Previous</button>
          <div className="home__gallery">
            <div style={gallery}>
              { this.props.data.length ? cardsCollection() : "" }
            </div>
          </div>
          <button className="gallery__btn" onClick={() => {this.setState({galleryPosition: this.state.galleryPosition - 400})}}>Next</button>
        </div>
      </div>
    )
  }
}

export default SliderView