import React from 'react';
import './app.css';

export default ({pokeName, pokeImage, hp, subtype, type, text}) => {
  return(
    <div className={'pokedex__info'}>
      <img src={pokeImage} className='card'/>
      <div className="info__block">
        <h2>{pokeName}</h2>
        {hp !== "None" ? <p>HP:{hp}</p> : ""}
        <p>This is a {subtype} card.</p>
        {type !== "None" ? <p>This is a {subtype} type {type}</p> : ""}
        {text !== "None" ? <p>{text}</p> : ""}
      </div>
    </div>
  )
};

// export default PokeCard;