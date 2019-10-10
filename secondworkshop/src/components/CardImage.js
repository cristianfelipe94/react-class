import React from 'react';

import '../index.css';

export default (props) => {
    return (
        <div className="image__container">
            <img src={props.dataImage} className="image__cover" alt="Main caption from Rick and Morty's episode." />
        </div>
    )
}