import React, { Component } from "react";

import Title from "./Title";
import Summary from "./Paragraph";
import Image from "./CardImage";

import '../index.css';

export default (props) => {
	return (
		<div className="card__container">
				<div>
					<Title dataTitle={props.dataTitle} />
					<Summary dataSummary={props.dataSummary} />
					<Image dataImage={props.dataImage} />

					{props.isFavourite && <p>Favourite</p>}
				</div>
				<div>
					<button onClick={() => props.add(props.indexValue)}>Favourite</button>
					{/* <input className={state.isFavorite ? "favorite__star" : "unfavorite__star"} type="checkbox" onChange={this.setFavorite}></input> */}
				</div>
			</div>
	)
}
