import React from 'react'

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
        return (
                <button key={this.props.idValue} id={this.props.idValue} className={this.props.class} onClick={this.props.onClick}>
                    {this.props.value}
                </button>
                );
    }
}

export default Square;