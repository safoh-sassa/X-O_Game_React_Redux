import React from 'react'
import Square from '../Square'
import { connect } from 'react-redux'

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',

        };
    }

    renderRows(no) {
        let rows = [];
        let id = 0;
        for (let i = 0; i < no; i++) {
            rows.push(
                <div key={"board-row" + i} className="board-row" >
                </div>);
            for (let i = 0; i < no; i++) {
                rows.push(
                    this.renderSquare(id)
                );
                id++;
            }
        }
        return rows;
    }

    renderSquare(i) {
        if (this.props.winnerLine.includes(i) && this.props.winner === true) {
            ;
            return (
                <Square key={i}
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    idValue={i}
                    class="winnerSquare"
                />
            );
        } else {
            return (
                <Square key={i}
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    idValue={i}
                    class="square"
                />
            );
        }
    }

    render() {

        return (
            <div  >
                {
                    this.renderRows(this.props.boardSize)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        boardSize: state.boardSize,
        history: state.history
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }

}

const Board = connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardComponent)



export default Board;

