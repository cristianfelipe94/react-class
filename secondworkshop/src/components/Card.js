import React, { Component } from "react";

import Title from "./Title";
import Summary from "./Paragraph";
import Image from "./CardImage";

import '../index.css';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			summary: "",
			image: "",
			cardId: "",
			isData: false,
			isFavorite: false
		};
		this.setFavorite = this.setFavorite.bind(this);
	}

	componentDidMount() {
		const episodeTitle = this.props.dataTitle;
		const episodeSummary = this.props.dataSummary;
		const episodeImage = this.props.dataImage;
		const episodeFav = this.props.dataFav;
		const episodeId = this.props.dataId;
		this.setState({
            title: episodeTitle,
            summary: episodeSummary,
			image: episodeImage,
			isFavorite: episodeFav,
			cardId: episodeId,
            isData: true
        });
	}

	setFavorite() {
		// console.log("Clicked card props: ", this.props.dataId);
		this.setState({
			isFavorite: !this.state.isFavorite
		}, () => {
			this.props.globalprops(this.state);
		});
	}

	render() {

		return (
			<div className= "card__container">
				{this.state.isData ? <Title dataTitle={this.state.title} /> : ""}
				{this.state.isData ? <Summary dataSummary={this.state.summary} /> : ""}
				{this.state.isData ? <Image dataImage={this.state.image} /> : ""}
				<div>
					<input className= {this.state.isFavorite ? "favorite__star" : "unfavorite__star"} type="checkbox" onChange={this.setFavorite}></input>
				</div>
			</div>
		);
	}
}

export default Card;
