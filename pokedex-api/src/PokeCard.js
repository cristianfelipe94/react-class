import React from 'react';
import './app.css';

export default ({pokeName, pokeImage}) => {
  return(
    <div className={'pokedex__info'}>
      <img src={pokeImage} className='card'/>
      <div className="info__block">
        <h2>{pokeName}</h2>
      </div>
    </div>
  )
};

// export default PokeCard;