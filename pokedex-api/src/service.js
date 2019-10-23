// Using Fecth:
// ////////////
const Pokedata = (counter) => fetch('https://api.pokemontcg.io/v1/cards')
  .then((response) => {
    const pokeParsed = response.json();
    return pokeParsed;
  }).then((pokeParsed) => {
    console.log("Poke response: ", pokeParsed);
    return pokeParsed.cards;
  }).catch((error) => {
    console.log("Fetch error: ", error);
  });

export default Pokedata;
