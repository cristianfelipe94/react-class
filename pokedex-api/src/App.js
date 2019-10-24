import React, { Component } from "react";
import PokeCard from "./PokeCard.js";
import PokeData from "./service.js";
import "./app.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: {
				render: [],
				stock: []
			},
			searchInput: ""
		};
		this.searchFor = this.searchFor.bind(this);
	}

	async componentDidMount() {
		try {
			let dataPokeProcessed = await PokeData();
			this.setState({
				cards: {
					...this.state.cards,
					stock: dataPokeProcessed,
					render: dataPokeProcessed
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	searchFor(event) {
		const statename = event.target.id;
		this.setState(
			{
				[statename]: event.target.value,
				cards: {
					...this.state.cards,
					render: this.state.cards.stock
				}
			},
			() => {
				const searchedArray = [];
				const nameArray = this.state.cards.render.map(card => {
					return card.name;
				});
				nameArray.forEach(cardName => {
					if (cardName.indexOf(this.state.searchInput) > -1) {
						const matchCard = nameArray.indexOf(cardName);
						searchedArray.push(this.state.cards.render[matchCard]);
					}
				});
				this.setState({
					cards: {
						...this.state.cards,
						render: searchedArray
					}
				});
			}
		);
	}

	render() {
		const pokeCard = this.state.cards.render.map((card, id) => {
			const pokeHp = card.hp ? card.hp : "None";
			const poketype = card.types ? card.types[0] : "None";
			const specialCard = card.text ? card.text[0] : "None";
			return (
				<PokeCard
					pokeName={card.name}
					pokeImage={card.imageUrlHiRes}
					hp={pokeHp}
					subtype={card.supertype}
					type={poketype}
					text={specialCard}
					key={id}
				/>
			);
		});
		return (
			<div className="pokeapp">
				<div className="pokeapp__head">
					<h1>Pokedex</h1>
					<label htmlFor="pokeSearch">
						Search for:
						<input
							id="searchInput"
							className="search--bar"
							placeholder="Pokemon's name"
							onChange={this.searchFor}
						></input>
					</label>
				</div>
				<div className="pokedex">
					<div className="pokedex--layout"></div>
          <div className="clear--pokedex"></div>
          {pokeCard}
				</div>
			</div>
		);
	}
}

export default App;
