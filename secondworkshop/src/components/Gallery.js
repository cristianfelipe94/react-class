import React, { Component } from "react";

import Title from "./Title";
import Image from "./CardImage";

import '../index.css';

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: "",
			cardId: "",
			isData: false,
		};
	}

	componentDidMount() {
		const episodeTitle = this.props.dataTitle;
		const episodeImage = this.props.dataImage;
		const episodeId = this.props.dataId;
		this.setState({
			title: episodeTitle,
			image: episodeImage,
			cardId: episodeId,
			isData: true
		});
	}

	render() {

		return (
			<div className= "card__gallery">
				{this.state.isData ? <Title dataTitle={this.state.title} /> : ""}
				{this.state.isData ? <Image dataImage={this.state.image} /> : ""}
			</div>
		);
	}
}

export default Gallery;
