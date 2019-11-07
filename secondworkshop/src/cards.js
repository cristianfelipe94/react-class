import React, { Component } from "react"

import Card from '../src/components/Card';

class CardsView extends Component {
  constructor() {
    super()
    this.state= {
      render: [],
      firstRender: false,
    }
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
        this.state.firstRender = true
        this.state.render.push(rendering);
      }
    }

    const renderCollection = () => {
      const renderGroup = this.state.render.map(array => {
        const renderElement = array.map(card => {
          return <Card dataTitle= {card.title} dataSummary= {card.summary} dataImage= {card.image} key= {card.id} dataId= {card.id}/>;
        })
        return renderElement;
      })
      return renderGroup;
    }

    return (
      <div>
        <div>
          {this.props.data.length && !this.state.firstRender ? dataLoader() : ""}
          {this.state.firstRender ? renderCollection() : ""}
        </div>
      </div>
    )
  }
}

export default CardsView