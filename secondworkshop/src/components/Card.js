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

	setFavorite(event) {
		// console.log(this.props.dataId);
		// console.log(this.props.persistProp.globalData[this.props.dataId]);
		
		// console.log("Clicked: ", event.target);
		this.setState({
			isFavorite: !this.state.isFavorite
		}, () => {
			// console.log(this.state);
			console.log(this.state);
			this.props.globalprops(this.state);
			// this.props.persistProp.globalSetter(this.state);

			// this.props.persistProp.globalSetter(this.state);
			// console.log(this.props.persistProp.globalData[this.props.dataId]);
			// const clonedData = Object.assign(a, {dataFav: true});
			// console.log(clonedData);
			// // const a = clonedData.props
			// a.dataFav = true;
			// console.log(a.dataFav)
			// const newData = Object.assign(clonedData, )
			// this.props.persistProp.globalData[this.props.dataId].props.dataFav = this.state.isFavorite;
			// console.log(a);
			// console.log(this.props.persistProp.globalData[this.props.dataId]);
			// this.props.setFav(this.state.isFavorite);
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
