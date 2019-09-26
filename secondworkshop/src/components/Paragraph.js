import React, {Component} from 'react';

class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            summary: ""
        }
    }

    componentDidMount () {
        const episodeSummary = this.props.dataSummary.replace(/<[^>]+>/g, '');
        // console.log(episodeSummary);
        this.setState({
            summary: episodeSummary
        });
    }

    render() {
        // const clearedSummary = document.createElement('p').innerHTML = this.props.dataSummary;
        return (
            <div>
                <p>
                    {/* {clearedSummary} */}
                    {this.state.summary}
                </p>
            </div>
        );
    }
}

export default Summary;