import React from 'react'

import { connect } from 'react-redux'
import { changeBoardSize } from '../../actions/actions'
import { changeWinnerLineSize } from '../../actions/actions'

class GameSettingComponent extends React.Component {
    handleChangeBoardSize(boardSize) {

        if (boardSize > 30 || boardSize < 3)
            alert("The board size must be between 2 to 30");
        else {
            this.props.changeBoardSize(boardSize);


        }
    }

    handleChangeWinnerLineSize(lineSize) {

        if (lineSize > this.props.boardSize || lineSize <2 )
            alert("The winner line size must be betwwen 2 and the board size.");
        else {
            this.props.changeWinnerLineSize(lineSize);
        }
    }

about(){
    alert("This game was developed by Safoh Sassa using React & Redux in OCT/2017.");
}
    render() {

        if (this.props.stepNumber === 0) {
            return (
                <div>
                    <label id="BoardSizeLabel"><b>Input Board Size </b></label>
                    <input id={"board-size"}
                        value={this.props.boardSize}
                        type="number"
                        name="board-size"
                        onChange={
                            (event) =>
                                this.handleChangeBoardSize(parseInt(event.target.value, 10))}
                    />
                    <label id="winnerLineSizeLabel"><b>Input winner Line Size</b></label>
                    <input id={"winnerLineSize"}
                        value={this.props.winnerLineSize}
                        type="number"
                        name="winnerLineSize"
                        onChange={
                            (event) =>
                                this.handleChangeWinnerLineSize(parseInt(event.target.value, 10))}
                    />
                <button className="about" onClick={(event) =>
                               this.about()}>About</button>

                </div>
            );
        } else {
            return (
                <div>
                    <h2>The Game Started.</h2>
                </div>
            );
        }
    }
}



const mapStateToProps = (state) => {
    return {

        boardSize: state.boardSize,
        history: state.history,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeBoardSize: boardSize => {
            dispatch(changeBoardSize(boardSize))
        },
        changeWinnerLineSize: winnerLineSize => {
            dispatch(changeWinnerLineSize(winnerLineSize))
        }
    }
}



const GameSetting = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameSettingComponent)

export default GameSetting;