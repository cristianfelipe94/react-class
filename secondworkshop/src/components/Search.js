import React, { Component } from "react";

import Title from "./Title";
import Image from "./CardImage";
import Summary from "./Paragraph";

import '../index.css';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: "",
			cardId: "",
			summary: "",
			isData: false,
		};
	}

	componentDidMount() {
		const episodeTitle = this.props.dataTitle;
		const episodeImage = this.props.dataImage;
		const episodeSummary = this.props.dataSummary;
		const episodeId = this.props.dataId;
		this.setState({
			title: episodeTitle,
			image: episodeImage,
			summary: episodeSummary,
			cardId: episodeId,
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

export default Search;
