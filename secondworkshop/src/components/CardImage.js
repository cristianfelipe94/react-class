import React, {Component} from 'react';

import '../index.css';

class Image extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageSRC: ""
        }
    }

    componentDidMount () {
        const episodeImage = this.props.dataImage;
        this.setState({
            imageSRC: episodeImage
        });
    }

    render() {
        return (
            <div className= "image__container">
                <img src= {this.state.imageSRC} className= "image__cover" alt= "Main caption from Rick and Morty's episode."></img>
            </div>
        );
    }
}

export default Image;