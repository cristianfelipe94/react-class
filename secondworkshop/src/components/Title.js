import React, {Component} from 'react';

class Title extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ""
        }
    }

    componentDidMount () {
        const episodeTitle = this.props.dataTitle;
        this.setState({
            title: episodeTitle
        });
    }

    render() {
        return (
            <div>
                <h2 className= "card__title">
                    {this.state.title}
                </h2>
            </div>
        );
    }
}

export default Title;