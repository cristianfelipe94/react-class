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
			isData: false
		};
	}

	componentDidMount() {
		const episodeTitle = this.props.dataTitle;
		const episodeSummary = this.props.dataSummary;
		const episodeImage = this.props.dataImage;
		this.setState({
            title: episodeTitle,
            summary: episodeSummary,
            image: episodeImage,
            isData: true
        });
	}

	render() {
		return (
			<div className= "card__container">
				{this.state.isData ? <Title dataTitle={this.state.title} /> : ""}
				{this.state.isData ? <Summary dataSummary={this.state.summary} /> : ""}
				{this.state.isData ? <Image dataImage={this.state.image} /> : ""}
			</div>
		);
	}
}

export default Card;
